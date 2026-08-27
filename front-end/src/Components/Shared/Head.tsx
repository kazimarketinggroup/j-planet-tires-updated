import { useEffect } from "react";

interface HeadProps {
  title: string;
  description: string;
  keywords?: string;
}

const Head: React.FC<HeadProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    if (keywords) {
      let metaKeywords = document.querySelector("meta[name='keywords']");
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }
  }, [title, description, keywords]);

  return null;
};

export default Head;