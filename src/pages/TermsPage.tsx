import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';

const TermsPage = () => {
  return (
    <Layout>
      <PageMeta
        title="Terms of Service | HOX"
        description="HOX terms of service — the conditions governing your use of our website and services."
        canonicalPath="/terms"
      />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using the HOX website (hox.ae), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services</h2>
              <p>HOX provides exhibition stand design and build, event production, retail fit-out, and interior design services. All project engagements are subject to separate contractual agreements between HOX and the client.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Intellectual Property</h2>
              <p>All content on this website — including text, images, videos, graphics, logos, and designs — is the property of HOX Creative Productions or its licensors and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or use any content without prior written consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Use of Website</h2>
              <p>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use and enjoyment of, this website by any third party. Prohibited behaviour includes harassment, causing distress, or transmitting obscene or offensive content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimer</h2>
              <p>The information on this website is provided on an "as is" basis. HOX makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of any content. Project images and descriptions are representative and may differ from final deliverables.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p>HOX shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use this website or its content.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Third-Party Links</h2>
              <p>Our website may contain links to external websites. HOX is not responsible for the content, privacy practices, or availability of these third-party sites.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
              <p>These terms are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
              <p>HOX reserves the right to update these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
              <p>For questions about these terms, please contact:</p>
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

export default TermsPage;
