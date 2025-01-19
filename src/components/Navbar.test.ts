import { describe, it, expect, vi, beforeEach } from "vitest";
import { getByText, getAllByText, fireEvent, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("Navbar", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 清理文档
    document.body.innerHTML = "";

    // 设置基本的 Navbar 结构
    document.body.innerHTML = `
      <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm" id="navbar">
        <div class="flex justify-between items-center h-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a href="/" class="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
              FiddleBops
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden sm:flex items-center space-x-8">
            <a href="#how-to-play" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              如何游玩
            </a>
            <a href="#features" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              游戏特色
            </a>
            <a href="#faq" class="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">
              常见问题
            </a>

            <!-- Language Switcher -->
            <div class="relative pl-8 border-l border-gray-200">
              <button
                type="button"
                class="language-dropdown-button inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                aria-expanded="false"
              >
                <span>中文</span>
                <svg
                  class="h-4 w-4 transition-transform duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <!-- Dropdown menu -->
              <div
                class="language-dropdown-menu hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                role="menu"
              >
                <a
                  href="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                  role="menuitem"
                >
                  English
                </a>
                <a
                  href="/zh"
                  class="block px-4 py-2 text-sm text-purple-600 font-medium bg-purple-50"
                  role="menuitem"
                >
                  中文
                </a>
              </div>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="sm:hidden">
            <button
              type="button"
              class="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">打开菜单</span>
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="sm:hidden hidden" id="mobile-menu">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white">
            <a
              href="#how-to-play"
              class="text-gray-700 hover:text-purple-600 hover:bg-purple-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              如何游玩
            </a>
            <a
              href="#features"
              class="text-gray-700 hover:text-purple-600 hover:bg-purple-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              游戏特色
            </a>
            <a
              href="#faq"
              class="text-gray-700 hover:text-purple-600 hover:bg-purple-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              常见问题
            </a>

            <!-- Mobile Language Switcher -->
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="px-3">
                <div class="text-sm font-medium text-gray-500 mb-2">
                  选择语言
                </div>
                <div class="space-y-1">
                  <a
                    href="/"
                    class="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-50 transition-colors"
                  >
                    English
                  </a>
                  <a
                    href="/zh"
                    class="block px-3 py-2 rounded-md text-sm font-medium bg-purple-100 text-purple-600"
                  >
                    中文
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
    container = document.body;

    // 初始化导航栏功能
    const setupScript = document.createElement("script");
    setupScript.textContent = `
      // 移动端菜单切换
      const mobileMenuButton = document.querySelector(".mobile-menu-button");
      const mobileMenu = document.getElementById("mobile-menu");

      mobileMenuButton?.addEventListener("click", () => {
        mobileMenu?.classList.toggle("hidden");
        const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true" || false;
        mobileMenuButton.setAttribute("aria-expanded", (!expanded).toString());
      });

      // 语言下拉菜单切换
      const languageButton = document.querySelector(".language-dropdown-button");
      const languageMenu = document.querySelector(".language-dropdown-menu");
      const arrow = languageButton?.querySelector("svg");

      languageButton?.addEventListener("click", () => {
        const expanded = languageButton.getAttribute("aria-expanded") === "true";
        languageButton.setAttribute("aria-expanded", (!expanded).toString());
        languageMenu?.classList.toggle("hidden");
        arrow?.classList.toggle("rotate-180");
      });

      // 点击外部关闭语言下拉菜单
      document.addEventListener("click", (event) => {
        if (event.target instanceof Node) {
          if (!languageButton?.contains(event.target) && !languageMenu?.contains(event.target)) {
            languageMenu?.classList.add("hidden");
            languageButton?.setAttribute("aria-expanded", "false");
            arrow?.classList.remove("rotate-180");
          }
        }
      });

      // 导航栏滚动效果
      let lastScrollY = window.scrollY;
      const navbar = document.getElementById("navbar");

      window.addEventListener(
        "scroll",
        () => {
          if (lastScrollY < window.scrollY) {
            navbar?.classList.add("shadow-md");
          } else {
            navbar?.classList.remove("shadow-md");
          }
          lastScrollY = window.scrollY;
        },
        { passive: true }
      );

      // 点击导航链接关闭移动端菜单
      const mobileMenuLinks = mobileMenu?.querySelectorAll("a");
      mobileMenuLinks?.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu?.classList.add("hidden");
          mobileMenuButton?.setAttribute("aria-expanded", "false");
        });
      });

      // 平滑滚动
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          if (anchor instanceof HTMLAnchorElement) {
            const href = anchor.getAttribute("href");
            if (href) {
              const target = document.querySelector(href);
              target?.scrollIntoView({
                behavior: "smooth",
              });
            }
          }
        });
      });
    `;
    document.body.appendChild(setupScript);
  });

  it("should render navigation items correctly", () => {
    const logo = getByText(container, "FiddleBops");
    const howToPlayLinks = getAllByText(container, "如何游玩");
    const featuresLinks = getAllByText(container, "游戏特色");
    const faqLinks = getAllByText(container, "常见问题");

    // Logo 应该只有一个
    expect(logo).toBeInTheDocument();

    // 每个导航链接应该有两个（桌面端和移动端）
    expect(howToPlayLinks).toHaveLength(2);
    expect(featuresLinks).toHaveLength(2);
    expect(faqLinks).toHaveLength(2);

    // 验证桌面端导航链接
    const desktopNav = container.querySelector(".hidden.sm\\:flex");
    expect(desktopNav).toContainElement(howToPlayLinks[0]);
    expect(desktopNav).toContainElement(featuresLinks[0]);
    expect(desktopNav).toContainElement(faqLinks[0]);

    // 验证移动端导航链接
    const mobileNav = container.querySelector("#mobile-menu");
    expect(mobileNav).toContainElement(howToPlayLinks[1]);
    expect(mobileNav).toContainElement(featuresLinks[1]);
    expect(mobileNav).toContainElement(faqLinks[1]);
  });

  it("should toggle mobile menu when clicking the menu button", async () => {
    const mobileMenuButton = container.querySelector(".mobile-menu-button");
    const mobileMenu = container.querySelector("#mobile-menu");

    expect(mobileMenu).toHaveClass("hidden");
    expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");

    if (mobileMenuButton) {
      fireEvent.click(mobileMenuButton);
      await waitFor(() => {
        expect(mobileMenu).not.toHaveClass("hidden");
        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "true");
      });

      // 再次点击应该关闭菜单
      fireEvent.click(mobileMenuButton);
      await waitFor(() => {
        expect(mobileMenu).toHaveClass("hidden");
        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
      });
    }
  });

  it("should toggle language dropdown when clicking the language button", async () => {
    const languageButton = container.querySelector(".language-dropdown-button");
    const languageMenu = container.querySelector(".language-dropdown-menu");
    const arrow = languageButton?.querySelector("svg");

    expect(languageMenu).toHaveClass("hidden");
    expect(languageButton).toHaveAttribute("aria-expanded", "false");
    expect(arrow).not.toHaveClass("rotate-180");

    if (languageButton) {
      fireEvent.click(languageButton);
      await waitFor(() => {
        expect(languageMenu).not.toHaveClass("hidden");
        expect(languageButton).toHaveAttribute("aria-expanded", "true");
        expect(arrow).toHaveClass("rotate-180");
      });

      // 点击外部应该关闭下拉菜单
      fireEvent.click(document.body);
      await waitFor(() => {
        expect(languageMenu).toHaveClass("hidden");
        expect(languageButton).toHaveAttribute("aria-expanded", "false");
        expect(arrow).not.toHaveClass("rotate-180");
      });
    }
  });

  it("should close mobile menu when clicking a navigation link", async () => {
    const mobileMenuButton = container.querySelector(".mobile-menu-button");
    const mobileMenu = container.querySelector("#mobile-menu");
    const mobileLink = mobileMenu?.querySelector("a");

    if (mobileMenuButton && mobileLink) {
      // 先打开菜单
      fireEvent.click(mobileMenuButton);
      await waitFor(() => {
        expect(mobileMenu).not.toHaveClass("hidden");
      });

      // 点击链接
      fireEvent.click(mobileLink);
      await waitFor(() => {
        expect(mobileMenu).toHaveClass("hidden");
        expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
      });
    }
  });

  it("should have correct styling", () => {
    const navbar = container.querySelector("#navbar");
    const logo = container.querySelector(".flex-shrink-0 a");
    const desktopNav = container.querySelector(".hidden.sm\\:flex");
    const mobileMenuButton = container.querySelector(".mobile-menu-button");

    expect(navbar).toHaveClass(
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "z-50",
      "bg-white/80",
      "backdrop-blur-md",
      "shadow-sm"
    );

    expect(logo).toHaveClass(
      "text-2xl",
      "font-bold",
      "text-purple-600",
      "hover:text-purple-700",
      "transition-colors"
    );

    expect(desktopNav).toHaveClass("hidden", "sm:flex", "items-center", "space-x-8");

    expect(mobileMenuButton).toHaveClass(
      "mobile-menu-button",
      "inline-flex",
      "items-center",
      "justify-center",
      "p-2",
      "rounded-md",
      "text-gray-700",
      "hover:text-purple-600",
      "hover:bg-purple-50",
      "transition-colors",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-purple-500"
    );
  });

  it("should add shadow on scroll", () => {
    const navbar = container.querySelector("#navbar");

    // 模拟向下滚动
    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(navbar).toHaveClass("shadow-md");

    // 模拟向上滚动
    window.scrollY = 50;
    fireEvent.scroll(window);
    expect(navbar).not.toHaveClass("shadow-md");
  });

  it("should handle smooth scrolling", () => {
    const scrollIntoViewMock = vi.fn();
    const anchor = container.querySelector('a[href="#how-to-play"]');
    const target = document.createElement("div");
    target.id = "how-to-play";
    document.body.appendChild(target);

    // 模拟 scrollIntoView
    target.scrollIntoView = scrollIntoViewMock;

    if (anchor) {
      fireEvent.click(anchor);
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: "smooth",
      });
    }
  });
});
