import ImageUpload from '../../../components/ImageUpload';

interface Props {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
}

const ProductDescriptionStep = ({ imageUrl, onChange }: Props) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900">Product Description Image</h3>
    <p className="mt-1 text-sm text-gray-500">
      Upload a single image (e.g. a catalogue/infographic page) shown on the Product Description tab
      of the public detail page.
    </p>
    <div className="mt-4">
      <ImageUpload
        folder="product-description"
        value={imageUrl}
        onChange={onChange}
        previewClassName="max-h-[480px] w-auto max-w-full rounded-lg border border-gray-200 object-contain"
      />
    </div>
  </div>
);

export default ProductDescriptionStep;
