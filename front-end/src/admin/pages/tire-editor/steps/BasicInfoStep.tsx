import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../../../lib/slugify';
import { inputClass, labelClass } from '../../../components/formClasses';
import ImageUpload from '../../../components/ImageUpload';
import FileUpload from '../../../components/FileUpload';
import TagInput from '../../../components/TagInput';
import RichTextEditor from '../../../components/RichTextEditor';
import Switch from '../../../components/Switch';
import type { TireCategory } from '../../../types/database';
import type { BasicInfo } from '../editorTypes';

interface Props {
  basic: BasicInfo;
  categories: TireCategory[];
  onChange: (patch: Partial<BasicInfo>) => void;
  onCategoryChange: (categoryId: string) => void;
}

// Groups fields by the part of the public page they control, so the admin can
// see at a glance where each input ends up without having to preview the site.
const Section = ({
  title,
  appearsOn,
  children,
}: {
  title: string;
  appearsOn: string;
  children: ReactNode;
}) => (
  <div className="rounded-xl border border-gray-200 p-5">
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-1.5 border-b border-gray-100 pb-3">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <span className="text-xs text-gray-400">Appears on: {appearsOn}</span>
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

const BasicInfoStep = ({ basic, categories, onChange, onCategoryChange }: Props) => {
  const [slugTouched, setSlugTouched] = useState(Boolean(basic.slug));

  const handleNameChange = (name: string) => {
    onChange({ name, ...(slugTouched ? {} : { slug: slugify(name) }) });
  };

  return (
    <div className="space-y-6">
      <Section title="Hero Section" appearsOn="dark banner at the top of the detail page">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              className={inputClass}
              value={basic.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="ROADIAN HT"
            />
            <p className="mt-1 text-xs text-gray-400">
              Big heading text. Include any model suffix here (e.g. &quot;Roadian HT/HTX RHS&quot;).
            </p>
          </div>
          <div>
            <label className={labelClass} htmlFor="subtitle">
              Subtitle
            </label>
            <input
              id="subtitle"
              className={inputClass}
              value={basic.subtitle}
              onChange={(e) => onChange({ subtitle: e.target.value })}
            />
            <p className="mt-1 text-xs text-gray-400">Small line shown right under the name.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="category">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              className={inputClass}
              value={basic.category_id}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">Select a category…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="mt-1.5 text-xs text-amber-600">
                No categories found.{' '}
                <Link to="/admin/categories" className="font-medium underline">
                  Create one
                </Link>{' '}
                first (or run the seed in SUPABASE_SETUP.sql).
              </p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="slug"
              className={inputClass}
              value={basic.slug}
              onChange={(e) => {
                setSlugTouched(true);
                onChange({ slug: slugify(e.target.value) });
              }}
              placeholder="roadian-ht"
            />
            <p className="mt-1 text-xs text-gray-400">Used in the page URL, not shown visually.</p>
          </div>
        </div>

        <div>
          <span className={labelClass}>Badges</span>
          <TagInput value={basic.badges} onChange={(badges) => onChange({ badges })} placeholder="Add a badge…" />
          <p className="mt-1 text-xs text-gray-400">
            Small pills shown above the name (e.g. &quot;Sport Utility Vehicle/Light Truck&quot;, &quot;M+S&quot;).
            Leave empty to fall back to the category name.
          </p>
        </div>
      </Section>

      <Section title="Spec Card" appearsOn="white card below the hero, and the catalogue grid">
        <div className="flex flex-wrap gap-8">
          <ImageUpload
            label="Card Image"
            folder="card"
            value={basic.card_image_url}
            onChange={(url) => onChange({ card_image_url: url })}
          />
          <ImageUpload
            label="Hero Image"
            folder="hero"
            value={basic.hero_image_url}
            onChange={(url) => onChange({ hero_image_url: url })}
          />
        </div>
        <p className="-mt-2 text-xs text-gray-400">
          Card Image shows on the catalogue grid and detail page card. Hero Image is only used as a fallback if
          Card Image is left empty.
        </p>

        <div>
          <label className={labelClass} htmlFor="short_description">
            Short Description
          </label>
          <textarea
            id="short_description"
            rows={2}
            className={inputClass}
            value={basic.short_description}
            onChange={(e) => onChange({ short_description: e.target.value })}
          />
          <p className="mt-1 text-xs text-gray-400">Used only if Description (below) is empty.</p>
        </div>

        <div>
          <span className={labelClass}>Description</span>
          <RichTextEditor
            value={basic.description}
            onChange={(html) => onChange({ description: html })}
            placeholder="Full product description…"
          />
        </div>

        <div>
          <span className={labelClass}>Benefits</span>
          <TagInput
            value={basic.benefits}
            onChange={(benefits) => onChange({ benefits })}
            placeholder="Add a benefit…"
          />
          <p className="mt-1 text-xs text-gray-400">Shown as pills under the description.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="cta_label">
              CTA Label
            </label>
            <input
              id="cta_label"
              className={inputClass}
              value={basic.cta_label}
              onChange={(e) => onChange({ cta_label: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="cta_link">
              CTA Link
            </label>
            <input
              id="cta_link"
              className={inputClass}
              value={basic.cta_link}
              onChange={(e) => onChange({ cta_link: e.target.value })}
              placeholder="/contact"
            />
          </div>
        </div>

        <div>
          <FileUpload
            label="Spec Sheet (PDF)"
            folder="spec-sheets"
            value={basic.spec_sheet_url}
            onChange={(url) => onChange({ spec_sheet_url: url })}
          />
          <p className="mt-1.5 text-xs text-gray-400">
            Adds a &quot;Download Spec Sheet&quot; button next to the CTA button. Leave empty to hide it.
          </p>
        </div>
      </Section>

      <Section title="Product Features Diagram" appearsOn="Product Features tab">
        <ImageUpload
          label="Features Diagram"
          folder="diagram"
          value={basic.features_diagram_image_url}
          onChange={(url) => onChange({ features_diagram_image_url: url })}
        />
      </Section>

      <Section title="Publish" appearsOn="controls whether this tire is visible to site visitors">
        <div className="flex items-center gap-3">
          <Switch checked={basic.is_published} onChange={(v) => onChange({ is_published: v })} label="Published" />
          <span className="text-sm font-medium text-gray-700">
            {basic.is_published ? 'Published' : 'Draft'}
          </span>
        </div>
      </Section>
    </div>
  );
};

export default BasicInfoStep;
