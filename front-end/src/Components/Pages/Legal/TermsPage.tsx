import Head from '@/Components/Shared/Head';
import LegalPageLayout, { LegalSection, LegalList } from './LegalPageLayout';

const TermsPage = () => {
  return (
    <>
      <Head
        title="Terms and Conditions | J.Planet Tire"
        description="Review the terms and conditions for ordering, pricing, delivery, and warranty support from J.Planet Tire."
      />
      <LegalPageLayout
      eyebrow="Legal"
      title="Terms and Conditions"
      updated="Last updated: July 2026"
      intro="These Terms and Conditions govern the sale and supply of tires and related products by J. Planet Tire to fleet operators, distributors, and trade customers (“you”, “the Customer”). By placing an order with us, you agree to these terms."
    >
      <LegalSection n={1} title="Company Information">
        <p>
          J. Planet Tire manufactures and distributes Truck &amp; Bus Radial, SUV/Light Truck,
          Commercial Van, and OTR/Construction tires, manufactured in Vietnam and Thailand. We
          operate across the United Kingdom and the United Arab Emirates.
        </p>
        <p>
          <strong>UK:</strong> <a href="mailto:info@jplanettire.co.uk">info@jplanettire.co.uk</a> /{' '}
          <a href="tel:+441902200269">+44 1902 200269</a>.
          <br />
          <strong>UAE:</strong> <a href="mailto:info@jplanettire.net">info@jplanettire.net</a> /{' '}
          <a href="tel:+442070888353">+44 20 7088 8353</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Orders and Acceptance">
        <p>
          All orders are subject to written acceptance by J. Planet Tire. We reserve the right to
          decline any order without obligation. A binding contract is formed only upon our written
          confirmation of your order. Quotations are valid for 14 days unless otherwise stated and
          are subject to stock availability.
        </p>
        <p>
          Product specifications, including ply ratings, load indices, and speed symbols, are as
          published in the current J. Planet Tire Product Guide and are subject to change without
          notice prior to order confirmation.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Pricing">
        <p>
          All prices are quoted exclusive of VAT (UK) or applicable tax (UAE) unless stated
          otherwise. Prices are subject to change without notice prior to order confirmation.
          Minimum order quantities may apply per SKU and will be communicated at quotation stage.
        </p>
        <p>
          We supply 27 SKUs across five categories: SUV/Light Truck, Commercial Van, Truck &amp; Bus
          Radial, and OTR/Construction.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Payment">
        <p>
          Payment terms are agreed in writing at account opening. Invoices are payable within the
          period specified on your account. We reserve the right to charge interest on overdue
          amounts at 8% above the Bank of England base rate (UK) or 2% per month (UAE). Title to
          goods does not pass until payment is received in full.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Delivery">
        <p>
          Delivery timescales are estimates only and time is not of the essence. Risk in goods
          passes to you upon delivery. You are responsible for inspecting goods on arrival and must
          notify us in writing of any visible damage or shortage within 48 hours of delivery.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Fitment Responsibility">
        <p>
          Tires must be fitted to the correct axle position as specified in the J. Planet Tire
          Product Guide and in accordance with the load index, speed symbol, and ply rating
          appropriate for the vehicle and duty cycle. J. Planet Tire accepts no liability for damage,
          failure, or premature wear resulting from incorrect fitment, improper inflation,
          overloading, or use outside the tire&apos;s rated specifications.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Returns and Cancellations">
        <p>
          Orders may not be cancelled or returned without our prior written consent. Authorised
          returns must be in original, unfitted, undamaged condition and are subject to a restocking
          charge. Custom or non-stock orders cannot be returned.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, our total liability to you for any claim shall not
          exceed the invoice value of the goods in dispute. We are not liable for indirect,
          consequential, or economic loss, loss of profit, vehicle downtime, or loss of business
          opportunity.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Governing Law">
        <LegalList
          items={[
            <>
              <strong>UK customers:</strong> governed by the laws of England and Wales, exclusive
              jurisdiction of the English courts.
            </>,
            <>
              <strong>UAE customers:</strong> governed by the laws of the UAE, subject to the
              jurisdiction of the Dubai courts.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n={10} title="Changes to These Terms">
        <p>
          We may update these Terms and Conditions from time to time. The version published on our
          website at the time of your order shall apply.
        </p>
      </LegalSection>
    </LegalPageLayout>
    </>
  );
};

export default TermsPage;
