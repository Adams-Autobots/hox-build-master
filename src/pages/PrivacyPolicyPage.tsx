import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <PageMeta
        title="Privacy Policy | HOX"
        description="HOX privacy policy — how we collect, use, and protect your personal data."
        canonicalPath="/privacy"
      />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p>When you interact with our website or services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong className="text-foreground">Contact information</strong> — name, email address, phone number, and company name when you submit a contact form or request a quote.</li>
                <li><strong className="text-foreground">Usage data</strong> — pages visited, time spent on site, browser type, and device information collected via analytics tools.</li>
                <li><strong className="text-foreground">Cookies</strong> — small data files stored on your device to improve your browsing experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Respond to enquiries and provide quotes for our exhibition, event, retail, and interior services.</li>
                <li>Improve our website and user experience.</li>
                <li>Send relevant communications about our services (only with your consent).</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist in operating our website and conducting business, subject to confidentiality agreements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookies</h2>
              <p>Our website uses cookies to enhance functionality and analyse traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect certain site features.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:info@hox.ae" className="text-primary hover:underline">info@hox.ae</a>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact</h2>
              <p>For questions regarding this privacy policy, please contact:</p>
              <p className="mt-3">
                <strong className="text-foreground">HOX Creative Productions</strong><br />
                Galadari Group of Warehouses #2<br />
                Ras Al Khor Industrial Area 2, Dubai, UAE<br />
                Email: <a href="mailto:info@hox.ae" className="text-primary hover:underline">info@hox.ae</a><br />
                Phone: <a href="tel:+97143477519" className="text-primary hover:underline">+971 4 3477519</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
