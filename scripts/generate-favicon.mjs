import { createCanvas } from "canvas";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 生成指定尺寸的图标
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 清除背景
  ctx.clearRect(0, 0, size, size);

  // 绘制浅色背景圆圈
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.475, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(139, 92, 246, 0.2)"; // #8B5CF6 with 0.2 opacity
  ctx.lineWidth = size * 0.05;
  ctx.stroke();

  // 绘制音符主体
  ctx.beginPath();
  const noteScale = size * 0.025;
  ctx.moveTo(28 * noteScale, 8 * noteScale);
  ctx.lineTo(28 * noteScale, 26.5 * noteScale);
  ctx.bezierCurveTo(
    28 * noteScale,
    29.5376 * noteScale,
    25.5376 * noteScale,
    32 * noteScale,
    22.5 * noteScale,
    32 * noteScale
  );
  ctx.bezierCurveTo(
    19.4624 * noteScale,
    32 * noteScale,
    17 * noteScale,
    29.5376 * noteScale,
    17 * noteScale,
    26.5 * noteScale
  );
  ctx.bezierCurveTo(
    17 * noteScale,
    23.4624 * noteScale,
    19.4624 * noteScale,
    21 * noteScale,
    22.5 * noteScale,
    21 * noteScale
  );
  ctx.bezierCurveTo(
    23.5 * noteScale,
    21 * noteScale,
    24.5 * noteScale,
    21.3 * noteScale,
    25.3 * noteScale,
    21.7 * noteScale
  );
  ctx.lineTo(25.3 * noteScale, 8 * noteScale);
  ctx.lineTo(28 * noteScale, 8 * noteScale);
  ctx.fillStyle = "#8B5CF6";
  ctx.fill();

  // 绘制音符装饰圆点
  ctx.beginPath();
  ctx.arc(15 * noteScale, 12 * noteScale, 3 * noteScale, 0, Math.PI * 2);
  ctx.fillStyle = "#8B5CF6";
  ctx.fill();

  return canvas;
}

// 确保 public 目录存在
const publicDir = join(__dirname, "..", "public");
if (!existsSync(publicDir)) {
  mkdirSync(publicDir);
}

// 生成不同尺寸的图标
const sizes = [16, 32, 48, 64, 128, 256];
sizes.forEach((size) => {
  const canvas = generateIcon(size);
  const buffer = canvas.toBuffer("image/png");
  writeFileSync(join(publicDir, `favicon-${size}x${size}.png`), buffer);
  console.log(`Generated favicon-${size}x${size}.png`);
});

// 生成标准 favicon.ico (32x32)
const faviconBuffer = generateIcon(32).toBuffer("image/png");
writeFileSync(join(publicDir, "favicon.ico"), faviconBuffer);

console.log("Favicons generated successfully!");
