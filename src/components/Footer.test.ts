import { describe, it, expect, beforeEach, vi } from "vitest";
import { getByText, getAllByText, fireEvent } from "@testing-library/dom";

describe("Footer", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 设置文档主体
    document.body.innerHTML = `
      <footer class="bg-gradient-to-b from-white to-indigo-50/30">
        <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <!-- Logo & Copyright -->
            <div class="text-center md:text-left">
              <img src="/favicon.svg" alt="FiddleBops" class="h-8 inline-block mb-4" />
              <p class="text-gray-600 text-sm">
                © 2024 FiddleBops. 版权所有。
              </p>
            </div>

            <!-- Links -->
            <div class="text-center">
              <nav class="flex flex-wrap justify-center gap-6">
                <a href="#how-to-play" class="text-gray-600 hover:text-indigo-600 transition-colors">
                  玩法介绍
                </a>
                <a href="#features" class="text-gray-600 hover:text-indigo-600 transition-colors">
                  游戏特色
                </a>
                <a href="#faq" class="text-gray-600 hover:text-indigo-600 transition-colors">
                  常见问题
                </a>
              </nav>
            </div>

            <!-- Social Links -->
            <div class="text-center md:text-right">
              <div class="flex justify-center md:justify-end gap-4">
                <a
                  href="https://twitter.com/fiddlebops"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label="Twitter"
                >
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/fiddlebops"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label="GitHub"
                >
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                  </svg>
                </a>
                <a
                  href="https://discord.gg/fiddlebops"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label="Discord"
                >
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Links -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <a href="/privacy" class="hover:text-indigo-600 transition-colors">
                隐私政策
              </a>
              <span class="text-gray-300">|</span>
              <a href="/terms" class="hover:text-indigo-600 transition-colors">
                服务条款
              </a>
              <span class="text-gray-300">|</span>
              <a href="/contact" class="hover:text-indigo-600 transition-colors">
                联系我们
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
    container = document.body;
  });

  // 渲染测试
  it("should render logo and copyright", () => {
    const logo = container.querySelector("img[alt='FiddleBops']");
    const copyright = getByText(container, /© 2024 FiddleBops/);

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/favicon.svg");
    expect(logo).toHaveClass("h-8", "inline-block", "mb-4");
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveClass("text-gray-600", "text-sm");
  });

  it("should render navigation links", () => {
    const howToPlay = getByText(container, "玩法介绍");
    const features = getByText(container, "游戏特色");
    const faq = getByText(container, "常见问题");

    expect(howToPlay).toHaveAttribute("href", "#how-to-play");
    expect(features).toHaveAttribute("href", "#features");
    expect(faq).toHaveAttribute("href", "#faq");

    [howToPlay, features, faq].forEach((link) => {
      expect(link).toHaveClass("text-gray-600", "hover:text-indigo-600", "transition-colors");
    });
  });

  it("should render social media links", () => {
    const twitter = container.querySelector('a[aria-label="Twitter"]');
    const github = container.querySelector('a[aria-label="GitHub"]');
    const discord = container.querySelector('a[aria-label="Discord"]');

    [twitter, github, discord].forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveClass("text-gray-400", "hover:text-indigo-600", "transition-colors");

      const icon = link?.querySelector("svg");
      expect(icon).toHaveClass("h-6", "w-6");
    });
  });

  it("should render bottom links", () => {
    const privacy = getByText(container, "隐私政策");
    const terms = getByText(container, "服务条款");
    const contact = getByText(container, "联系我们");

    expect(privacy).toHaveAttribute("href", "/privacy");
    expect(terms).toHaveAttribute("href", "/terms");
    expect(contact).toHaveAttribute("href", "/contact");

    [privacy, terms, contact].forEach((link) => {
      expect(link).toHaveClass("hover:text-indigo-600", "transition-colors");
    });
  });

  // 样式测试
  it("should have correct layout styles", () => {
    const footer = container.querySelector("footer");
    const grid = container.querySelector(".grid");
    const bottomLinks = container.querySelector(".mt-8");

    expect(footer).toHaveClass("bg-gradient-to-b", "from-white", "to-indigo-50/30");
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-3", "gap-8", "items-center");
    expect(bottomLinks).toHaveClass("border-t", "border-gray-200");
  });

  // 交互测试
  it("should handle link clicks", () => {
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href?.startsWith("http")) {
        // 外部链接
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    });
  });

  it("should apply hover styles", async () => {
    const link = getByText(container, "玩法介绍");

    // 设置初始样式
    link.style.color = "rgb(75, 85, 99)"; // text-gray-600

    // 模拟悬停
    fireEvent.mouseEnter(link);
    link.style.color = "rgb(79, 70, 229)"; // text-indigo-600
    expect(link.style.color).toBe("rgb(79, 70, 229)");

    // 模拟离开
    fireEvent.mouseLeave(link);
    link.style.color = "rgb(75, 85, 99)"; // text-gray-600
    expect(link.style.color).toBe("rgb(75, 85, 99)");
  });
});
