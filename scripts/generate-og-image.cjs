const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

// 创建画布
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// 设置渐变背景
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, "#8B5CF6"); // 紫色开始
gradient.addColorStop(1, "#C4B5FD"); // 浅紫色结束
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// 添加标题
ctx.fillStyle = "#FFFFFF";
ctx.font = "bold 80px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("FiddleBops", width / 2, height / 2 - 40);

// 添加副标题
ctx.font = "40px Arial";
ctx.fillText("音乐游戏", width / 2, height / 2 + 40);

// 添加装饰性音符图案
function drawMusicNote(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(
    x - size / 2,
    y - size / 2,
    x + size / 2,
    y - size,
    x + size,
    y - size / 2
  );
  ctx.lineTo(x + size, y + size * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + size, y + size * 1.5, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

// 设置音符样式
ctx.strokeStyle = "#FFFFFF";
ctx.lineWidth = 3;

// 绘制几个音符
drawMusicNote(300, 200, 40);
drawMusicNote(900, 400, 50);
drawMusicNote(200, 500, 30);
drawMusicNote(1000, 200, 45);

// 保存图片
const publicDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(path.join(publicDir, "og-image.png"), buffer);

console.log("Open Graph image generated successfully!");
