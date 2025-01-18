import i18next from "i18next";

import en from "./locales/en.json";
import zh from "./locales/zh.json";

i18next.init({
  debug: import.meta.env.DEV,
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
});

export default i18next;
