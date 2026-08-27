import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Save, Send, ExternalLink, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../lib/categoriesApi';
import { ALL_TABS, type TabType, type TireCategory } from '../../types/database';
import { editorFromResolved, type BasicInfo, type EditorModel } from './editorTypes';
import { emptyModel, loadEditorModel, saveTire } from './editorApi';
import BasicInfoStep from './steps/BasicInfoStep';
import TabsConfigStep from './steps/TabsConfigStep';
import PerformanceStep from './steps/PerformanceStep';
import FeaturesStep from './steps/FeaturesStep';
import ProductDescriptionStep from './steps/ProductDescriptionStep';
import SizesStep from './steps/SizesStep';
import PositionsStep from './steps/PositionsStep';
import SizeCsvImportModal from './SizeCsvImportModal';

type StepId = 'basic' | 'tabs' | 'performance' | 'features' | 'description' | 'sizes' | 'positions';

const TireEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [categories, setCategories] = useState<TireCategory[]>([]);
  const [model, setModel] = useState<EditorModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeStep, setActiveStep] = useState<StepId>('basic');
  const [csvOpen, setCsvOpen] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const cats = await fetchCategories();
        if (!active) return;
        setCategories(cats);
        if (id) {
          setModel(await loadEditorModel(id));
        } else {
          setModel(emptyModel());
        }
      } catch {
        toast.error('Failed to load editor data');
        navigate('/admin/tires');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, navigate]);

  const isTabActive = (tab: TabType) =>
    model?.tabs.some((t) => t.tab === tab && t.is_active) ?? false;

  const steps = useMemo(() => {
    const defs: { id: StepId; label: string; show: boolean }[] = [
      { id: 'basic', label: 'Basic Info', show: true },
      { id: 'tabs', label: 'Tabs Configuration', show: true },
      { id: 'performance', label: 'Performance Indicators', show: isTabActive('performance_indicator') },
      { id: 'features', label: 'Product Features', show: isTabActive('product_features') },
      { id: 'description', label: 'Product Description', show: isTabActive('product_description') },
      { id: 'sizes', label: 'Size/Technical Data', show: true },
      {
        id: 'positions',
        label: 'Recommended Vehicle Type & Position',
        show: isTabActive('recommended_position'),
      },
    ];
    return defs.filter((d) => d.show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model?.tabs]);

  useEffect(() => {
    if (model && !steps.some((s) => s.id === activeStep)) {
      setActiveStep('basic');
    }
  }, [steps, activeStep, model]);

  if (loading || !model) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const updateBasic = (patch: Partial<BasicInfo>) =>
    setModel((m) => (m ? { ...m, basic: { ...m.basic, ...patch } } : m));

  const handleCategoryChange = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    const defaults = cat?.default_tabs ?? [];
    const ordered: TabType[] = ALL_TABS.filter(
      (t) => defaults.includes(t) || t === 'size_technical_data',
    );
    setModel((m) =>
      m
        ? {
            ...m,
            basic: { ...m.basic, category_id: categoryId },
            tabs: ordered.map((tab) => ({ tab, is_active: true })),
          }
        : m,
    );
  };

  const handleSave = async (publish: boolean) => {
    if (!model) return;
    const toSave: EditorModel = {
      ...model,
      basic: { ...model.basic, is_published: publish },
    };
    setSaving(true);
    try {
      const savedId = await saveTire(toSave, id ?? null);
      setModel(toSave);
      toast.success(publish ? 'Published' : 'Draft saved');
      if (isNew) {
        navigate(`/admin/tires/${savedId}/edit`, { replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!model.basic.slug) {
      toast.error('Add a slug first to preview');
      return;
    }
    window.open(`/tires/${model.basic.slug}`, '_blank');
  };

  return (
    <div className="pb-24">
      <div className="mb-4 flex items-center gap-2">
        <Link to="/admin/tires" className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">
          {isNew ? 'New Tire' : model.basic.name || 'Edit Tire'}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="lg:sticky lg:top-20 lg:self-start">
          <ol className="space-y-1">
            {steps.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActiveStep(s.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    activeStep === s.id
                      ? 'bg-blue-50 font-semibold text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      activeStep === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="rounded-lg border border-gray-200 bg-white p-5 md:p-6">
          {activeStep === 'basic' && (
            <BasicInfoStep
              basic={model.basic}
              categories={categories}
              onChange={updateBasic}
              onCategoryChange={handleCategoryChange}
            />
          )}
          {activeStep === 'tabs' && (
            <TabsConfigStep tabs={model.tabs} onChange={(tabs) => setModel({ ...model, tabs })} />
          )}
          {activeStep === 'performance' && (
            <PerformanceStep
              metrics={model.metrics}
              onChange={(metrics) => setModel({ ...model, metrics })}
            />
          )}
          {activeStep === 'features' && (
            <FeaturesStep
              diagramUrl={model.basic.features_diagram_image_url}
              onDiagramChange={(url) => updateBasic({ features_diagram_image_url: url })}
              features={model.features}
              onChange={(features) => setModel({ ...model, features })}
            />
          )}
          {activeStep === 'description' && (
            <ProductDescriptionStep
              imageUrl={model.basic.product_description_image_url}
              onChange={(url) => updateBasic({ product_description_image_url: url })}
            />
          )}
          {activeStep === 'sizes' && (
            <SizesStep
              columns={model.sizeColumns}
              sizes={model.sizes}
              onColumnsChange={(sizeColumns) => setModel({ ...model, sizeColumns })}
              onChange={(sizes) => setModel({ ...model, sizes })}
              onOpenCsv={() => setCsvOpen(true)}
            />
          )}
          {activeStep === 'positions' && (
            <PositionsStep
              vehiclePositions={model.vehiclePositions}
              positionLegends={model.positionLegends}
              onVehiclePositionsChange={(vehiclePositions) =>
                setModel({ ...model, vehiclePositions })
              }
              onPositionLegendsChange={(positionLegends) =>
                setModel({ ...model, positionLegends })
              }
            />
          )}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white px-4 py-3 md:pl-64 md:pr-6">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ExternalLink className="h-4 w-4" /> Preview
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(false)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Publish
          </button>
        </div>
      </div>

      <SizeCsvImportModal
        open={csvOpen}
        onClose={() => setCsvOpen(false)}
        onConfirm={(rows, columns) =>
          setModel((m) =>
            m
              ? { ...m, sizeColumns: editorFromResolved(columns), sizes: [...m.sizes, ...rows] }
              : m,
          )
        }
      />
    </div>
  );
};

export default TireEditorPage;
