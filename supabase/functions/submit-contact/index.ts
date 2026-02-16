import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://hox.ae',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().default(""),
  division: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  // Honeypot field — should always be empty
  website_url: z.string().trim().max(0, "Invalid submission").optional().default(""),
});

// Simple in-memory rate limiting per IP (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('cf-connecting-ip') 
      || 'unknown';
    
    if (isRateLimited(clientIp)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' },
      });
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Honeypot triggered — silently accept (don't reveal to bot)
    if (parsed.data.website_url && parsed.data.website_url.length > 0) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error } = await supabase.from('contact_submissions').insert({
      name: parsed.data.name,
      company: parsed.data.company || null,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      division: parsed.data.division || null,
      message: parsed.data.message,
    });

    if (error) {
      console.error('DB insert error:', error);
      return new Response(JSON.stringify({ error: 'Failed to submit' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Forward email via Resend
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (resendKey) {
      try {
        const d = parsed.data;
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'HOX Website <noreply@hox.ae>',
            to: ['info@hox.ae'],
            subject: `New enquiry from ${d.name}${d.division ? ` – ${d.division}` : ''}`,
            html: `<h2>New Contact Form Submission</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
<tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${d.name}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Company</td><td style="padding:8px;">${d.company || '—'}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${d.email}">${d.email}</a></td></tr>
<tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${d.phone || '—'}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Division</td><td style="padding:8px;">${d.division || '—'}</td></tr>
<tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${d.message}</td></tr>
</table>`,
            reply_to: d.email,
          }),
        });
        if (!emailRes.ok) {
          console.error('Resend error:', await emailRes.text());
        }
      } catch (emailErr) {
        console.error('Email forwarding failed:', emailErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
