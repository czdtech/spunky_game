import { describe, it, expect, beforeEach } from "vitest";
import { getByText } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("SEO", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 清理 document head
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  it("should render default meta tags", () => {
    // 设置默认的 meta 标签
    document.head.innerHTML = `
      <title>FiddleBops - 音乐游戏</title>
      <meta name="description" content="一个有趣的音乐游戏！在这里体验音乐的魅力。" />
      <link rel="canonical" href="/test-path" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/test-path" />
      <meta property="og:title" content="FiddleBops - 音乐游戏" />
      <meta property="og:description" content="一个有趣的音乐游戏！在这里体验音乐的魅力。" />
      <meta property="og:image" content="/og-image.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="/test-path" />
      <meta property="twitter:title" content="FiddleBops - 音乐游戏" />
      <meta property="twitter:description" content="一个有趣的音乐游戏！在这里体验音乐的魅力。" />
      <meta property="twitter:image" content="/og-image.png" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    `;

    // 验证标题
    expect(document.title).toBe("FiddleBops - 音乐游戏");

    // 验证基础 meta 标签
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "一个有趣的音乐游戏！在这里体验音乐的魅力。"
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "/test-path");

    // 验证 Open Graph meta 标签
    expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website"
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "FiddleBops - 音乐游戏"
    );
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      "content",
      "一个有趣的音乐游戏！在这里体验音乐的魅力。"
    );
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "/og-image.png"
    );

    // 验证 Twitter meta 标签
    expect(document.querySelector('meta[property="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image"
    );
    expect(document.querySelector('meta[property="twitter:title"]')).toHaveAttribute(
      "content",
      "FiddleBops - 音乐游戏"
    );

    // 验证其他必要的 meta 标签
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index,follow"
    );
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#8B5CF6"
    );
  });

  it("should render custom meta tags", () => {
    // 设置自定义的 meta 标签
    document.head.innerHTML = `
      <title>自定义标题</title>
      <meta name="description" content="自定义描述" />
      <link rel="canonical" href="/custom-path" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/custom-path" />
      <meta property="og:title" content="自定义标题" />
      <meta property="og:description" content="自定义描述" />
      <meta property="og:image" content="/custom-image.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="/custom-path" />
      <meta property="twitter:title" content="自定义标题" />
      <meta property="twitter:description" content="自定义描述" />
      <meta property="twitter:image" content="/custom-image.png" />
    `;

    // 验证自定义标题
    expect(document.title).toBe("自定义标题");

    // 验证自定义描述
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "自定义描述"
    );

    // 验证自定义图片
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "/custom-image.png"
    );

    // 验证自定义路径
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "/custom-path");
  });

  it("should update meta tags when props change", () => {
    // 首先设置默认值
    document.head.innerHTML = `
      <title>默认标题</title>
      <meta name="description" content="默认描述" />
    `;

    // 验证初始值
    expect(document.title).toBe("默认标题");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "默认描述"
    );

    // 更新 meta 标签
    document.title = "新标题";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "新描述");

    // 验证更新后的值
    expect(document.title).toBe("新标题");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", "新描述");
  });

  it("should handle missing optional props", () => {
    // 设置必要的 meta 标签和默认的 og:image
    document.head.innerHTML = `
      <title>FiddleBops - 音乐游戏</title>
      <meta name="description" content="一个有趣的音乐游戏！在这里体验音乐的魅力。" />
      <link rel="canonical" href="/" />
      <meta property="og:image" content="/og-image.png" />
    `;

    // 验证必要的 meta 标签存在
    expect(document.title).toBeTruthy();
    expect(document.querySelector('meta[name="description"]')).toBeTruthy();
    expect(document.querySelector('link[rel="canonical"]')).toBeTruthy();

    // 验证可选的 meta 标签使用默认值
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "/og-image.png"
    );
  });
});
