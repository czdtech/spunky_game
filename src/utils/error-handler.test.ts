import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent } from "@testing-library/dom";

describe("Error Handler", () => {
  // 在每个测试前设置 DOM 环境
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="game-container" data-game-src="https://example.com/game">
        <iframe 
          id="game-frame"
          class="w-full h-full"
          title="Game Frame"
        ></iframe>
        <div id="error-container" class="hidden">
          <p class="text-red-500" role="alert">Loading Error</p>
          <button id="retry-button">Retry</button>
        </div>
      </div>
    `;

    // 添加错误处理函数
    const gameFrame = document.getElementById("game-frame");
    const errorContainer = document.getElementById("error-container");
    const retryButton = document.getElementById("retry-button");

    function showError() {
      errorContainer?.classList.remove("hidden");
      retryButton?.focus();
    }

    function retryLoading() {
      errorContainer?.classList.add("hidden");
      if (gameFrame instanceof HTMLIFrameElement && gameFrame.src) {
        const currentSrc = gameFrame.src;
        gameFrame.src = "";
        gameFrame.src = currentSrc;
      }
    }

    // 添加事件监听器
    gameFrame?.addEventListener("error", showError);
    retryButton?.addEventListener("click", retryLoading);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !errorContainer?.classList.contains("hidden")) {
        retryLoading();
      }
    });
  });

  // 在每个测试后清理 DOM 环境
  afterEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  // 测试游戏加载错误处理
  describe("Game Loading Error Handling", () => {
    it("should show error container when game fails to load", () => {
      const gameFrame = document.getElementById("game-frame");
      const errorContainer = document.getElementById("error-container");

      // 触发 iframe 的 error 事件
      if (gameFrame) {
        const errorEvent = new Event("error");
        gameFrame.dispatchEvent(errorEvent);
      }

      expect(errorContainer).not.toHaveClass("hidden");
    });

    it("should hide error container and retry loading when retry button is clicked", () => {
      const gameFrame = document.getElementById("game-frame") as HTMLIFrameElement;
      const errorContainer = document.getElementById("error-container");
      const retryButton = document.getElementById("retry-button");

      // 先显示错误容器
      errorContainer?.classList.remove("hidden");
      gameFrame.src = "https://example.com/game";

      // 点击重试按钮
      if (retryButton) {
        const clickEvent = new MouseEvent("click");
        retryButton.dispatchEvent(clickEvent);
      }

      expect(errorContainer).toHaveClass("hidden");
      expect(gameFrame.src).toBe("https://example.com/game");
    });

    it("should retry loading when pressing Escape key while error is shown", () => {
      const gameFrame = document.getElementById("game-frame") as HTMLIFrameElement;
      const errorContainer = document.getElementById("error-container");

      // 先显示错误容器
      errorContainer?.classList.remove("hidden");
      gameFrame.src = "https://example.com/game";

      // 触发 Escape 键事件
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escapeEvent);

      expect(errorContainer).toHaveClass("hidden");
      expect(gameFrame.src).toBe("https://example.com/game");
    });

    it("should not retry loading when pressing non-Escape key while error is shown", () => {
      const errorContainer = document.getElementById("error-container");

      // 先显示错误容器
      errorContainer?.classList.remove("hidden");

      // 触发非 Escape 键事件
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      document.dispatchEvent(enterEvent);

      expect(errorContainer).not.toHaveClass("hidden");
    });
  });

  // 测试错误状态的可访问性
  describe("Error State Accessibility", () => {
    it("should have proper ARIA attributes for error message", () => {
      const errorMessage = document.querySelector("[role='alert']");
      expect(errorMessage).toBeDefined();
      expect(errorMessage?.textContent).toBe("Loading Error");
    });

    it("should focus retry button when error is shown", () => {
      const gameFrame = document.getElementById("game-frame");
      const retryButton = document.getElementById("retry-button");

      // 触发错误
      if (gameFrame) {
        const errorEvent = new Event("error");
        gameFrame.dispatchEvent(errorEvent);
      }

      expect(document.activeElement).toBe(retryButton);
    });
  });
});
