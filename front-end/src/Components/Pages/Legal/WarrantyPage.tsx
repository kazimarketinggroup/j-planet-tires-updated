import Head from '@/Components/Shared/Head';
import LegalPageLayout, { LegalSection, LegalList } from './LegalPageLayout';

const WarrantyPage = () => {
  return (
    <>
      <Head
        title="Warranty Policy | J.Planet Tire"
        description="Read J.Planet Tire's warranty policy covering manufacturing defects, coverage terms, and claim procedures for commercial tires."
      />
      <LegalPageLayout
      eyebrow="Legal"
      title="Warranty Policy"
      updated="Last updated: July 2026"
      intro="J. Planet Tire warrants the quality and integrity of all tires in its product range. This policy applies to all tires supplied by J. Planet Tire to trade customers and fleet operators in the UK and UAE."
    >
      <LegalSection n={1} title="Standards and Certifications">
        <p>All J. Planet Tire tires are manufactured to the following standards:</p>
        <LegalList
          items={['ECE R54', 'UKCA / E-Mark Approved', 'DOT', 'ISO 9001:2015', 'ISO 14001']}
        />
        <p>
          These certifications apply across the full 27-SKU range spanning Truck &amp; Bus Radial,
          SUV/Light Truck, Commercial Van, and OTR/Construction categories.
        </p>
      </LegalSection>

      <LegalSection n={2} title="What Is Covered">
        <p>
          J. Planet Tire warrants that all tires are free from defects in materials and workmanship
          under normal commercial use conditions appropriate to the tire&apos;s rated specification.
          Coverage includes:
        </p>
        <LegalList
          items={[
            'Structural failure due to manufacturing defects',
            'Sidewall or bead defects attributable to production',
            'Premature or irregular tread wear caused by a proven manufacturing fault',
          ]}
        />
        <p>
          For products where <strong>retreadability</strong> is specified as a product feature —
          including JP500D, JP505D, JP512, JP530A, JPT01A, and JPT02 — the warranty applies to the
          original casing&apos;s suitability for retreading under normal service conditions, subject
          to inspection by a qualified retreader.
        </p>
        <p>
          For products carrying <strong>M+S and 3PMSF</strong> markings — including JP510, JP512,
          JP513A, JP530A, and the full JPT series — the warranty applies to winter-rated performance
          claims only when tires are operated within the temperature and load conditions for which
          they are rated.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Category-Specific Notes">
        <LegalList
          items={[
            <>
              <strong>Truck &amp; Bus Radial (23 SKUs):</strong> Warranty applies under highway,
              regional, and on/off-road duty cycles as specified per product in the J. Planet Tire
              Product Guide. Load index and speed symbol combinations must match the vehicle&apos;s
              axle requirements.
            </>,
            <>
              <strong>SUV / Light Truck (Roadian HT, Roadian HTX RH5):</strong> Warranty applies to
              passenger and light commercial use only. These products are not rated for full
              commercial TBR applications.
            </>,
            <>
              <strong>Commercial Van (CP521):</strong> Warranty applies to light commercial van
              applications within the rated load range.
            </>,
            <>
              <strong>OTR / Construction (JPA09):</strong> Warranty applies to construction and
              off-road applications as specified. This product is not covered for on-highway use and
              M+S/3PMSF terms do not apply.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection n={4} title="Warranty Period">
        <p>
          The warranty applies from the date of purchase for the usable service life of the tire,
          subject to a maximum of 5 years from the date of manufacture as identified by the DOT
          week/year code on the sidewall.
        </p>
      </LegalSection>

      <LegalSection n={5} title="What Is Not Covered">
        <p>This warranty does not cover:</p>
        <LegalList
          items={[
            'Improper fitment, inflation, or maintenance',
            'Overloading beyond the tire’s rated load index',
            'Road hazard damage including cuts, punctures, impact breaks, or kerb damage',
            'Use on incorrect axle positions contrary to the recommendations in the J. Planet Tire Product Guide',
            'Unauthorised repair or retreading',
            'Storage or use outside rated specifications',
            'Normal tread wear',
            'Damage caused by vehicle mechanical defects such as misalignment or suspension faults',
          ]}
        />
      </LegalSection>

      <LegalSection n={6} title="How to Make a Claim">
        <p>
          Claims must be submitted in writing to your J. Planet Tire account contact or to{' '}
          <a href="mailto:info@jplanettire.co.uk">info@jplanettire.co.uk</a> (UK) /{' '}
          <a href="mailto:info@jplanettire.net">info@jplanettire.net</a> (UAE), and must include:
        </p>
        <LegalList
          items={[
            'Proof of purchase',
            'Tire size, DOT code, and product pattern name',
            'A clear description of the defect with photographs',
            'Fitment history and vehicle type',
          ]}
        />
        <p>
          Tires must not be disposed of prior to inspection — we reserve the right to inspect all
          claimed tires before approving a remedy.
        </p>
      </LegalSection>

      <LegalSection n={7} title="Remedy">
        <p>
          Where a valid claim is accepted, J. Planet Tire will at its discretion replace the
          defective tire with an equivalent product or issue a credit note. We do not cover labour,
          fitting, vehicle downtime, or consequential losses.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Limitation">
        <p>
          This warranty is in addition to, and does not affect, statutory rights available under
          applicable UK or UAE law. It applies to the original purchaser only and is not
          transferable.
        </p>
      </LegalSection>
    </LegalPageLayout>
    </>
  );
};

export default WarrantyPage;
