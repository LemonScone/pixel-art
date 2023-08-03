import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/atom-one-dark.css";

const languageMap = {
  css,
};

type Language = typeof languageMap;

Object.keys(languageMap).forEach((lan) => {
  hljs.registerLanguage(lan, languageMap[lan as keyof Language]);
});

export const useHighlight = (language: keyof Language) => {
  const renderHighlight = (content = "") => {
    const result = language
      ? hljs.highlight(language, content)
      : hljs.highlightAuto(content);

    return result.value;
  };

  return { renderHighlight };
};
