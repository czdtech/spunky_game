import { describe, it, expect, beforeEach, vi } from "vitest";
import i18next from "i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

describe("i18n", () => {
  beforeEach(async () => {
    // 重置 i18next 实例
    await i18next.init({
      debug: false,
      lng: "en",
      fallbackLng: ["en"],
      resources: {
        en: {
          translation: en,
        },
        zh: {
          translation: zh,
        },
      },
    });
  });

  // 测试初始化配置
  it("should initialize with correct configuration", async () => {
    expect(i18next.language).toBe("en");
    expect(i18next.options.fallbackLng).toEqual(["en"]);

    // 测试资源是否正确加载
    const resources = i18next.options.resources || {};
    expect(Object.keys(resources)).toContain("en");
    expect(Object.keys(resources)).toContain("zh");
    expect(resources.en.translation).toBeDefined();
    expect(resources.zh.translation).toBeDefined();
  });

  // 测试语言切换
  it("should change language correctly", async () => {
    await i18next.changeLanguage("zh");
    expect(i18next.language).toBe("zh");

    await i18next.changeLanguage("en");
    expect(i18next.language).toBe("en");
  });

  // 测试翻译文本
  it("should translate text correctly", async () => {
    // 英文翻译
    expect(i18next.t("title")).toBe("FiddleBops");
    expect(i18next.t("welcomeMessage")).toBe("Welcome to FiddleBops!");
    expect(i18next.t("nav.howToPlay")).toBe("How to Play");

    // 切换到中文
    await i18next.changeLanguage("zh");
    expect(i18next.t("title")).toBe("FiddleBops");
    expect(i18next.t("welcomeMessage")).toBe("欢迎来玩 FiddleBops!");
    expect(i18next.t("nav.howToPlay")).toBe("玩法说明");
  });

  // 测试嵌套翻译
  it("should handle nested translations", async () => {
    expect(i18next.t("features.music.title")).toBe("Fun Music Learning");
    expect(i18next.t("features.feedback.title")).toBe("Instant Feedback");

    await i18next.changeLanguage("zh");
    expect(i18next.t("features.music.title")).toBe("趣味音乐学习");
    expect(i18next.t("features.feedback.title")).toBe("即时反馈机制");
  });

  // 测试默认语言回退
  it("should fallback to default language for missing translations", async () => {
    const nonExistentKey = "nonexistent.key";
    expect(i18next.t(nonExistentKey)).toBe(nonExistentKey);
  });

  // 测试带参数的翻译
  it("should handle translations with parameters", async () => {
    const key = "welcomeMessage";
    const params = { name: "User" };

    // 测试带参数的翻译(如果翻译文件中有使用参数的情况)
    expect(i18next.t(key, params)).toBe("Welcome to FiddleBops!");
  });
});
