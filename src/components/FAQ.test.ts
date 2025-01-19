import { describe, it, expect, vi, beforeEach } from "vitest";
import { getByRole, getByText, fireEvent, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("FAQ", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 清理文档
    document.body.innerHTML = "";

    // 设置基本的 FAQ 结构
    document.body.innerHTML = `
      <section class="py-16 bg-gradient-to-b from-purple-50/30 to-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">常见问题</h2>
          <div class="max-w-3xl mx-auto space-y-4">
            <!-- FAQ 项目 1 -->
            <div class="faq-item" data-faq>
              <button
                class="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                aria-expanded="false"
              >
                <span class="text-lg font-medium text-gray-800">设备兼容性如何？</span>
                <svg
                  class="w-6 h-6 text-purple-600 transform transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                class="overflow-hidden transition-all duration-300 max-h-0"
                role="region"
                style="max-height: 0px"
              >
                <div class="p-4 bg-purple-50/50">
                  <p class="text-gray-600">本游戏支持所有现代浏览器。</p>
                </div>
              </div>
            </div>

            <!-- FAQ 项目 2 -->
            <div class="faq-item" data-faq>
              <button
                class="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                aria-expanded="false"
              >
                <span class="text-lg font-medium text-gray-800">需要什么前置知识？</span>
                <svg
                  class="w-6 h-6 text-purple-600 transform transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                class="overflow-hidden transition-all duration-300 max-h-0"
                role="region"
                style="max-height: 0px"
              >
                <div class="p-4 bg-purple-50/50">
                  <p class="text-gray-600">不需要任何音乐基础。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    container = document.body;

    // 初始化 FAQ 功能
    const setupScript = document.createElement("script");
    setupScript.textContent = `
      function setupFAQ() {
        const faqItems = document.querySelectorAll("[data-faq]");

        faqItems.forEach((item) => {
          const button = item.querySelector("button");
          const content = item.querySelector('[role="region"]');
          const arrow = item.querySelector("svg");

          if (!button || !content || !arrow) return;

          button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";

            // 关闭其他所有项
            faqItems.forEach((otherItem) => {
              if (otherItem !== item) {
                const otherButton = otherItem.querySelector("button");
                const otherContent = otherItem.querySelector('[role="region"]');
                const otherArrow = otherItem.querySelector("svg");

                if (otherButton && otherContent && otherArrow) {
                  otherButton.setAttribute("aria-expanded", "false");
                  otherContent.style.maxHeight = "0px";
                  otherArrow.style.transform = "rotate(0deg)";
                }
              }
            });

            // 切换当前项
            button.setAttribute("aria-expanded", String(!isExpanded));
            content.style.maxHeight = !isExpanded ? \`\${content.scrollHeight}px\` : "0px";
            arrow.style.transform = !isExpanded ? "rotate(180deg)" : "rotate(0deg)";
          });
        });
      }

      setupFAQ();
    `;
    document.body.appendChild(setupScript);
  });

  it("should render FAQ items correctly", () => {
    const faqItems = container.querySelectorAll(".faq-item");
    expect(faqItems).toHaveLength(2);

    const firstQuestion = getByText(container, "设备兼容性如何？");
    const secondQuestion = getByText(container, "需要什么前置知识？");
    expect(firstQuestion).toBeInTheDocument();
    expect(secondQuestion).toBeInTheDocument();
  });

  it("should expand FAQ item when clicked", async () => {
    const firstFaqItem = container.querySelector(".faq-item");
    const button = firstFaqItem?.querySelector("button");
    const content = firstFaqItem?.querySelector('[role="region"]') as HTMLElement;
    const arrow = firstFaqItem?.querySelector("svg");

    if (button && content && arrow) {
      // 初始状态
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(content.style.maxHeight).toBe("0px");
      expect(arrow.style.transform).toBe("");

      // 点击展开
      fireEvent.click(button);

      // 等待 DOM 更新
      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
        expect(content.style.maxHeight).not.toBe("0px");
        expect(arrow.style.transform).toBe("rotate(180deg)");
      });
    }
  });

  it("should close other FAQ items when one is opened", async () => {
    const faqItems = container.querySelectorAll(".faq-item");
    const firstButton = faqItems[0].querySelector("button");
    const secondButton = faqItems[1].querySelector("button");
    const firstContent = faqItems[0].querySelector('[role="region"]') as HTMLElement;
    const secondContent = faqItems[1].querySelector('[role="region"]') as HTMLElement;

    // 点击第一个项目
    if (firstButton) {
      fireEvent.click(firstButton);
      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
        expect(firstContent.style.maxHeight).not.toBe("0px");
      });
    }

    // 点击第二个项目
    if (secondButton) {
      fireEvent.click(secondButton);
      await waitFor(() => {
        expect(secondButton).toHaveAttribute("aria-expanded", "true");
        expect(secondContent.style.maxHeight).not.toBe("0px");
        expect(firstButton).toHaveAttribute("aria-expanded", "false");
        expect(firstContent.style.maxHeight).toBe("0px");
      });
    }
  });

  it("should have correct styling", () => {
    const faqItem = container.querySelector(".faq-item");
    const button = faqItem?.querySelector("button");
    const content = faqItem?.querySelector('[role="region"]');

    expect(button).toHaveClass(
      "w-full",
      "flex",
      "items-center",
      "justify-between",
      "p-4",
      "bg-white",
      "rounded-xl",
      "shadow-sm",
      "hover:shadow-md",
      "transition-all",
      "duration-300"
    );

    expect(content).toHaveClass("overflow-hidden", "transition-all", "duration-300", "max-h-0");
  });
});
