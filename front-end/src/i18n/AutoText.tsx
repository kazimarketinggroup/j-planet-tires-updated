import { useAutoTranslate } from './useAutoTranslate';

// Renders a CMS string, auto-translated to Arabic when the site language is
// Arabic (English passes through unchanged). Lets us translate items inside
// .map() loops, where calling the hook directly would violate hook rules.
const AutoText = ({ children }: { children: string | null | undefined }) => {
  const translated = useAutoTranslate(children);
  return <>{translated}</>;
};

export default AutoText;
