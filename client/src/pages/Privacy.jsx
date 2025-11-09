import React from 'react';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="Privacy Policy - WebHaze"
        description="WebHaze Privacy Policy - How we collect, use, and protect your personal information."
      />
      
      <div className="container-site py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-8">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Effective Date: January 1, 2024</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                WebHaze ("we", "us", "our", "WebHaze") operates the site webhaze.in and provides website as a service, landing pages, portfolio sites, mobile/app development and growth tools.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, disclose and protect your personal information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. What Information We Collect</h2>
              <p className="mb-4">
                <strong>Personal information you provide:</strong> e.g., name, email address, phone number, business name, billing information, when you fill out contact forms, subscribe, purchase services, or interact with our support.
              </p>
              <p className="mb-4">
                <strong>Automatically collected information:</strong> When you visit our website, we may collect technical data such as your IP address, browser type, device identifiers, pages visited, referral URLs, time spent, etc.
              </p>
              <p>
                <strong>Cookies and tracking technologies:</strong> We use cookies and similar technologies to remember your preferences, analyse usage, support marketing and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We may use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, operate, maintain and improve our services.</li>
                <li>Process and fulfil your orders or service requests (billing, invoicing, support).</li>
                <li>Communicate with you about your account, service updates, changes, offers.</li>
                <li>Analyse usage, monitor metrics, conduct internal research, detect and prevent fraud.</li>
                <li>Personalise and deliver marketing, promotional materials (if you have opted in).</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Disclosure of Your Information</h2>
              <p className="mb-4">We may disclose your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To service providers and third-party vendors who assist us (hosting, payment processing, analytics, support).</li>
                <li>To comply with law: if required by law, regulation, legal process, or to protect our rights, safety of others.</li>
                <li>In connection with a business transaction: merger, acquisition, sale of assets, reorganisation or similar event.</li>
                <li>With your consent (you authorise it).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Security</h2>
              <p>
                We take reasonable administrative, technical and physical measures to safeguard your information. However, no method of transmission or storage is absolutely secure; we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Retention</h2>
              <p>
                We retain your personal data as long as required to provide you services, for legitimate business purposes, or to comply with law. After this, we may anonymise or delete information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="mb-4">Depending on your jurisdiction you may have rights such as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access to the personal data we hold about you.</li>
                <li>Correction of inaccurate data.</li>
                <li>Deletion of your personal data (subject to legal obligations).</li>
                <li>Restrict or object to certain processing.</li>
                <li>Withdraw consent to marketing communications.</li>
              </ul>
              <p className="mt-4">
                If you wish to exercise any rights, please contact us at support@webhaze.in.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies & Tracking</h2>
              <p>
                We use cookies and similar technologies. You can manage or disable cookies through your browser settings; note that disabling may affect service functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Transfers</h2>
              <p>
                If you or our service providers are located in jurisdictions outside India, transferring your data may involve cross-border transfers. We ensure appropriate safeguards are in place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 18. We do not knowingly collect personal data from children; if you believe we have, please contact us and we will delete the data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for their privacy practices; you should review their policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will post the revised version on our website with an updated "Effective Date". Your continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
              <p className="mb-2">If you have questions or concerns about this policy, please contact:</p>
              <div className="ml-4">
                <p><strong>WebHaze</strong></p>
                <p>Email: support@webhaze.in</p>
                <p>Address: Hyderabad, Telangana, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;