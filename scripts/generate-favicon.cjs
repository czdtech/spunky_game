const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

// 生成指定尺寸的图标
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 设置渐变背景
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#4f46e5");
  gradient.addColorStop(1, "#7c3aed");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // 添加音符图标
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${size * 0.625}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("♪", size / 2, size / 2);

  return canvas;
}

// 确保 public 目录存在
const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// 生成不同尺寸的图标
const sizes = [16, 32, 48, 64, 128, 256];
sizes.forEach((size) => {
  const canvas = generateIcon(size);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(publicDir, `favicon-${size}x${size}.png`), buffer);
});

// 生成标准 favicon.ico (32x32)
const faviconBuffer = generateIcon(32).toBuffer("image/png");
fs.writeFileSync(path.join(publicDir, "favicon.ico"), faviconBuffer);

console.log("Favicons generated successfully!");
