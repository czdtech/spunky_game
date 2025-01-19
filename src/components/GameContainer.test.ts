import { describe, it, expect, vi, beforeEach } from "vitest";
import { getByRole, getByText, fireEvent, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("GameContainer", () => {
  let container: HTMLElement;

  beforeEach(() => {
    // 清理文档
    document.body.innerHTML = "";

    // 设置基本的游戏容器结构
    document.body.innerHTML = `
      <div class="game-container">
        <div class="game-wrapper">
          <iframe
            id="game-frame"
            src="https://example.com/game"
            class="w-full h-full"
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            title="FiddleBops 音乐游戏"
          ></iframe>
        </div>
        <div id="loading-indicator" class="hidden">
          <p>游戏加载中...</p>
        </div>
        <div id="error-container" class="hidden">
          <p>加载失败</p>
          <button id="retry-button">重试</button>
        </div>
      </div>
    `;
    container = document.body;

    // 模拟配置
    vi.mock("../config/game", () => ({
      default: {
        url: "https://example.com/game",
      },
    }));

    // 初始化游戏容器
    const setupScript = document.createElement("script");
    setupScript.textContent = `
      function setupGameContainer() {
        const iframe = document.getElementById("game-frame");
        const loadingIndicator = document.getElementById("loading-indicator");
        const errorContainer = document.getElementById("error-container");
        const retryButton = document.getElementById("retry-button");

        if (!iframe || !loadingIndicator || !errorContainer || !retryButton) return;

        // 显示加载指示器
        loadingIndicator.classList.remove("hidden");

        // 监听加载完成
        iframe.addEventListener("load", () => {
          loadingIndicator.classList.add("hidden");
        });

        // 监听加载错误
        iframe.addEventListener("error", () => {
          loadingIndicator.classList.add("hidden");
          errorContainer.classList.remove("hidden");
        });

        // 重试按钮点击事件
        retryButton.addEventListener("click", () => {
          errorContainer.classList.add("hidden");
          loadingIndicator.classList.remove("hidden");
          iframe.src = iframe.src;
        });
      }

      setupGameContainer();
    `;
    document.body.appendChild(setupScript);
  });

  it("should render game iframe with correct attributes", () => {
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "https://example.com/game");
    expect(iframe).toHaveAttribute("sandbox", "allow-scripts allow-same-origin");
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("title", "FiddleBops 音乐游戏");
  });

  it("should handle loading state", async () => {
    const iframe = container.querySelector("iframe");
    const loadingIndicator = container.querySelector("#loading-indicator");

    // 初始状态应该显示加载指示器
    expect(loadingIndicator).not.toHaveClass("hidden");

    // 模拟 iframe 加载完成
    iframe?.dispatchEvent(new Event("load"));
    await waitFor(() => {
      expect(loadingIndicator).toHaveClass("hidden");
    });
  });

  it("should handle error state and retry", async () => {
    const iframe = container.querySelector("iframe");
    const loadingIndicator = container.querySelector("#loading-indicator");
    const errorContainer = container.querySelector("#error-container");
    const retryButton = container.querySelector("#retry-button");

    // 模拟加载失败
    iframe?.dispatchEvent(new Event("error"));
    await waitFor(() => {
      expect(loadingIndicator).toHaveClass("hidden");
      expect(errorContainer).not.toHaveClass("hidden");
    });

    // 模拟点击重试按钮
    if (retryButton) {
      fireEvent.click(retryButton);
      expect(loadingIndicator).not.toHaveClass("hidden");
      expect(errorContainer).toHaveClass("hidden");
      expect(iframe).toHaveAttribute("src", "https://example.com/game");
    }
  });

  it("should have correct styling", () => {
    const gameContainer = container.querySelector(".game-container");
    const gameWrapper = container.querySelector(".game-wrapper");
    const iframe = container.querySelector("iframe");

    expect(gameContainer).toHaveClass("game-container");
    expect(gameWrapper).toHaveClass("game-wrapper");
    expect(iframe).toHaveClass("w-full h-full");
  });
});
