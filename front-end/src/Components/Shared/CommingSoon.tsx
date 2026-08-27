import { useLanguage } from '../../i18n/LanguageContext';

const CommingSoon = () => {
    const { t } = useLanguage();
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#111132] text-white">
            <h1>{t('common.comingSoon')}</h1>
        </div>
    );
};

export default CommingSoon;