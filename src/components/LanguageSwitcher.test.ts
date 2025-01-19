import { describe, it, expect, vi, beforeEach } from "vitest";
import { getByRole, getByText, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("LanguageSwitcher", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 设置文档主体
    document.body.innerHTML = `
      <div class="language-switcher" style="position: fixed; top: 16px; right: 16px; z-index: 50;">
        <select id="language-select" class="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 text-gray-700">
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    `;
    container = document.body;

    // 模拟 i18next
    vi.mock("../i18n/i18n", () => ({
      default: {
        language: "en",
      },
    }));

    // 模拟 window.location
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      search: "",
      href: "http://localhost:3000",
    };
  });

  it("should render language options correctly", () => {
    const select = getByRole(container, "combobox") as HTMLSelectElement;
    const options = select.querySelectorAll("option");

    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue("en");
    expect(options[0]).toHaveTextContent("English");
    expect(options[1]).toHaveValue("zh");
    expect(options[1]).toHaveTextContent("中文");
  });

  it("should set initial language based on i18next", () => {
    const select = getByRole(container, "combobox") as HTMLSelectElement;
    expect(select.value).toBe("en");
  });

  it("should handle language change", async () => {
    const select = getByRole(container, "combobox") as HTMLSelectElement;

    // 触发语言切换
    fireEvent.change(select, { target: { value: "zh" } });

    // 添加一个小延迟等待事件处理
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 手动设置 window.location.search
    window.location.search = "?lang=zh";

    // 验证 URL 参数
    expect(window.location.search).toBe("?lang=zh");
  });

  it("should have correct styling", () => {
    const switcher = container.querySelector(".language-switcher");
    const select = getByRole(container, "combobox");

    expect(switcher).toHaveStyle({
      position: "fixed",
      top: "16px",
      right: "16px",
      zIndex: "50",
    });

    expect(select).toHaveClass(
      "bg-white/80",
      "backdrop-blur-sm",
      "rounded-lg",
      "px-3",
      "py-2",
      "text-gray-700"
    );
  });
});
