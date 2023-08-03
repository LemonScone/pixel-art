import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";

const languageMap = {
  css,
};

type Language = typeof languageMap;

export const useHighlight = (language: keyof Language) => {
  useEffect(() => {
    hljs.registerLanguage(language, languageMap[language]);
  }, [language]);

  const renderHighlight = (content = "") => {
    const result = language
      ? hljs.highlight(language, content)
      : hljs.highlightAuto(content);

    return result.value;
  };

  return { renderHighlight };
};
