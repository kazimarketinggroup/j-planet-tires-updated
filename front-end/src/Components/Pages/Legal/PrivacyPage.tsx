import Head from '@/Components/Shared/Head';
import LegalPageLayout, { LegalSection, LegalList } from './LegalPageLayout';

const PrivacyPage = () => {
  return (
    <>
      <Head
        title="Privacy Policy | J.Planet Tire"
        description="Learn how J.Planet Tire collects, uses, and protects your personal data for trade and business enquiries."
      />
      <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated: July 2026"
      intro="J. Planet Tire is committed to protecting the personal data of its business contacts, customers, and partners in connection with our B2B operations in the UK and UAE."
    >
      <LegalSection n={1} title="Who We Are">
        <p>
          J. Planet Tire supplies commercial tires to fleet operators and distributors across the
          UK, Europe, UAE, and MENA. We are the data controller for personal data collected through
          our website and business operations.
        </p>
      </LegalSection>

      <LegalSection n={2} title="What Data We Collect">
        <p>We collect:</p>
        <LegalList
          items={[
            'Name, job title, and company name',
            'Business email and business phone number',
            'Fleet or vehicle details provided during enquiries',
            'Correspondence content',
            'Basic website usage data via cookies and analytics tools',
          ]}
        />
      </LegalSection>

      <LegalSection n={3} title="How We Use Your Data">
        <LegalList
          items={[
            'To respond to trade and fitment enquiries and process orders',
            'To manage your account and ongoing business relationship',
            'To send relevant product updates, pricing, or event information such as trade show participation (for example, Road Transport Expo)',
            'To comply with legal and regulatory obligations',
          ]}
        />
        <p>
          We do not sell, rent, or share your personal data with third parties for marketing
          purposes.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Legal Basis for Processing (UK/GDPR)">
        <LegalList
          items={[
            <>
              <strong>Contract performance</strong> — to fulfil orders and enquiries.
            </>,
            <>
              <strong>Legitimate interests</strong> — to maintain our business relationship and
              communicate relevant trade information.
            </>,
            <>
              <strong>Legal obligation</strong> — where required by UK or UAE law.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n={5} title="Data Retention">
        <p>
          We retain personal data for as long as your business relationship with us is active, and
          for 6 years thereafter in line with standard commercial record-keeping requirements.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Your Rights">
        <p>
          UK contacts have rights under UK GDPR including the right to access, correct, or erase your
          data, and to object to processing. Contact:{' '}
          <a href="mailto:info@jplanettire.co.uk">info@jplanettire.co.uk</a>.
        </p>
        <p>
          UAE contacts may request access to or deletion of their data by contacting{' '}
          <a href="mailto:info@jplanettire.net">info@jplanettire.net</a>. We will respond within 30
          days.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Cookies">
        <p>
          Our website uses essential cookies to function and, where consent is given, analytics
          cookies to understand site usage. You can manage preferences via your browser settings.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Security">
        <p>
          We take reasonable technical and organisational measures to protect your personal data
          against unauthorised access, loss, or misuse.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Changes">
        <p>
          We may update this policy periodically. The current version will always be available on
          our website.
        </p>
      </LegalSection>
    </LegalPageLayout>
    </>
  );
};

export default PrivacyPage;
