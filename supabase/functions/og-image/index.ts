const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Division colors matching HOX brand system
const divisionColors: Record<string, string> = {
  exhibitions: '#FF0013',  // Red
  events: '#00AEEF',       // Blue
  retail: '#F4A545',       // Orange
  interiors: '#8DC63F',    // Green
  primary: '#ED1E25',      // Master brand red
};

// Page configurations
const pageConfigs: Record<string, { title: string; subtitle: string; division?: string }> = {
  home: { title: 'Production Excellence', subtitle: 'Since 2008' },
  about: { title: 'Our Story & Team', subtitle: 'Building Dreams Since 2008' },
  contact: { title: 'Get In Touch', subtitle: 'Let\'s Build Something Great' },
  projects: { title: 'Our Projects', subtitle: 'Portfolio of Excellence' },
  blog: { title: 'Insights & Trends', subtitle: 'Industry Knowledge' },
  exhibitions: { title: 'Exhibition Builds', subtitle: 'Stand Out at Every Show', division: 'exhibitions' },
  events: { title: 'Event Production', subtitle: 'Unforgettable Experiences', division: 'events' },
  retail: { title: 'Retail Environments', subtitle: 'Spaces That Sell', division: 'retail' },
  interiors: { title: 'Interior Fit-Out', subtitle: 'Crafted With Precision', division: 'interiors' },
};

function generateSVG(
  title: string,
  subtitle: string,
  accentColor: string
): string {
  // Escape HTML entities for safety
  const escapeHtml = (str: string) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const safeTitle = escapeHtml(title);
  const safeSubtitle = escapeHtml(subtitle);

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="50%" style="stop-color:#111111"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    
    <!-- Accent gradient -->
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${accentColor}"/>
      <stop offset="100%" style="stop-color:${accentColor}88"/>
    </linearGradient>
    
    <!-- Subtle pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff08" stroke-width="1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  
  <!-- Grid pattern overlay -->
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Accent line at top -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#accentGrad)"/>
  
  <!-- Left accent bar -->
  <rect x="80" y="200" width="6" height="230" fill="${accentColor}" rx="3"/>
  
  <!-- HOX Logo text -->
  <text x="120" y="180" font-family="Arial Black, Arial, sans-serif" font-size="48" font-weight="900" fill="#ffffff" letter-spacing="8">
    HOX
  </text>
  
  <!-- Decorative dot after HOX -->
  <circle cx="245" cy="165" r="8" fill="${accentColor}"/>
  
  <!-- Main title -->
  <text x="120" y="290" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#ffffff">
    ${safeTitle}
  </text>
  
  <!-- Subtitle -->
  <text x="120" y="370" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="${accentColor}">
    ${safeSubtitle}
  </text>
  
  <!-- Tagline at bottom -->
  <text x="120" y="550" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#888888" letter-spacing="2">
    DESIGN • BUILD • DELIVER
  </text>
  
  <!-- Website URL -->
  <text x="1080" y="550" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#666666" text-anchor="end">
    hox.ae
  </text>
  
  <!-- Decorative elements -->
  <rect x="1050" y="100" width="70" height="70" fill="none" stroke="${accentColor}33" stroke-width="2"/>
  <rect x="1070" y="120" width="70" height="70" fill="none" stroke="${accentColor}22" stroke-width="2"/>
  
  <!-- Bottom accent line -->
  <rect x="0" y="624" width="1200" height="6" fill="url(#accentGrad)"/>
</svg>`;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || 'home';
    const customTitle = url.searchParams.get('title');
    const customSubtitle = url.searchParams.get('subtitle');
    const division = url.searchParams.get('division');

    console.log(`Generating OG image for page: ${page}, division: ${division}`);

    // Get page config or use defaults
    const config = pageConfigs[page] || pageConfigs.home;
    
    // Determine accent color
    let accentColor = divisionColors.primary;
    if (division && divisionColors[division]) {
      accentColor = divisionColors[division];
    } else if (config.division && divisionColors[config.division]) {
      accentColor = divisionColors[config.division];
    }

    // Use custom title/subtitle if provided
    const title = customTitle || config.title;
    const subtitle = customSubtitle || config.subtitle;

    // Generate SVG
    const svg = generateSVG(title, subtitle, accentColor);

    // Return SVG directly (most social platforms support it)
    // For platforms that don't, we could convert to PNG using resvg-wasm
    return new Response(svg, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate image' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
