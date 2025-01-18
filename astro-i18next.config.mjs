/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "zh",
  locales: ["zh", "en"],
  load: ["server", "client"],
  i18nextServer: {
    debug: true,
  },
  i18nextClient: {
    debug: true,
  },
};
