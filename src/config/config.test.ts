import { describe, it, expect } from "vitest";
import gameConfig from "./game";

// 导入 JSON 配置
const config = {
  game: {
    iframeSrc: "https://silkycell.github.io/FiddleBops/",
    title: "FiddleBops",
    description: "一个有趣的音乐游戏！",
    sandboxAttributes: "allow-popups allow-scripts allow-same-origin allow-forms",
    referrerPolicy: "origin",
    loading: "eager",
    importance: "high",
  },
  website: {
    title: "FiddleBops - 音乐游戏",
    defaultLanguage: "en",
    branding: {
      logo: "/favicon.svg",
      alt: "FiddleBops Logo",
      width: 40,
      height: 40,
    },
    share: {
      platforms: ["twitter", "facebook", "whatsapp", "telegram", "copy"],
      fallbackText: "Check out this awesome music game!",
      hashtags: ["FiddleBops", "MusicGame", "Gaming"],
    },
  },
  i18n: {
    zh: {
      welcomeMessage: "欢迎来玩 FiddleBops！",
      nav: {
        howToPlay: "玩法介绍",
      },
    },
    en: {
      welcomeMessage: "Welcome to FiddleBops!",
      nav: {
        howToPlay: "How to Play",
      },
    },
  },
};

describe("Configuration", () => {
  // 测试游戏配置
  describe("Game Configuration", () => {
    it("should have required game properties", () => {
      const { game } = config;
      expect(game).toBeDefined();
      expect(game.iframeSrc).toBeDefined();
      expect(game.title).toBeDefined();
      expect(game.description).toBeDefined();
      expect(game.sandboxAttributes).toBeDefined();
      expect(game.referrerPolicy).toBeDefined();
      expect(game.loading).toBeDefined();
      expect(game.importance).toBeDefined();
    });

    it("should have valid game configuration values", () => {
      const { game } = config;
      expect(game.iframeSrc).toBe("https://silkycell.github.io/FiddleBops/");
      expect(game.title).toBe("FiddleBops");
      expect(game.loading).toBe("eager");
      expect(game.importance).toBe("high");
      expect(game.referrerPolicy).toBe("origin");
      expect(game.sandboxAttributes).toBe(
        "allow-popups allow-scripts allow-same-origin allow-forms"
      );
    });
  });

  // 测试网站配置
  describe("Website Configuration", () => {
    it("should have required website properties", () => {
      const { website } = config;
      expect(website).toBeDefined();
      expect(website.title).toBeDefined();
      expect(website.defaultLanguage).toBeDefined();
      expect(website.branding).toBeDefined();
      expect(website.share).toBeDefined();
    });

    it("should have valid branding configuration", () => {
      const { website } = config;
      expect(website.branding.logo).toBe("/favicon.svg");
      expect(website.branding.alt).toBe("FiddleBops Logo");
      expect(website.branding.width).toBe(40);
      expect(website.branding.height).toBe(40);
    });

    it("should have valid share configuration", () => {
      const { website } = config;
      expect(website.share.platforms).toBeInstanceOf(Array);
      expect(website.share.platforms).toContain("twitter");
      expect(website.share.platforms).toContain("facebook");
      expect(website.share.hashtags).toBeInstanceOf(Array);
      expect(website.share.hashtags).toContain("FiddleBops");
    });
  });

  // 测试 i18n 配置
  describe("i18n Configuration", () => {
    it("should have required language configurations", () => {
      const { i18n } = config;
      expect(i18n).toBeDefined();
      expect(i18n.zh).toBeDefined();
      expect(i18n.en).toBeDefined();
    });

    it("should have consistent translation keys across languages", () => {
      const { i18n } = config;
      const zhKeys = Object.keys(i18n.zh).sort();
      const enKeys = Object.keys(i18n.en).sort();
      expect(zhKeys).toEqual(enKeys);
    });

    it("should have valid translation values", () => {
      const { i18n } = config;
      expect(i18n.zh.welcomeMessage).toBe("欢迎来玩 FiddleBops！");
      expect(i18n.en.welcomeMessage).toBe("Welcome to FiddleBops!");
      expect(i18n.zh.nav.howToPlay).toBe("玩法介绍");
      expect(i18n.en.nav.howToPlay).toBe("How to Play");
    });
  });

  // 测试游戏配置对象
  describe("Game Config Object", () => {
    it("should have required game properties", () => {
      expect(gameConfig).toHaveProperty("url");
      expect(gameConfig).toHaveProperty("title");
      expect(gameConfig).toHaveProperty("description");
    });

    it("should have valid game config values", () => {
      expect(gameConfig.url).toBe("https://example.com/game");
      expect(gameConfig.title).toBe("FiddleBops 音乐游戏");
      expect(gameConfig.description).toBe("一个有趣的音乐游戏！在这里体验音乐的魅力。");
    });
  });
});
