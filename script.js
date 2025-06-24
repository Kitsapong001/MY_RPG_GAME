let posX = 50;
let posY = 0;
const character = document.getElementById("character");
const gameArea = document.getElementById("game-area");
const keysPressed = {};

window.addEventListener("load", () => {
  let playerName = localStorage.getItem("playerName");
  if (!playerName) {
    playerName = prompt("ใส่ชื่อผู้เล่น:");
    localStorage.setItem("playerName", playerName);
  }
});

document.addEventListener("keydown", (e) => keysPressed[e.key.toLowerCase()] = true);
document.addEventListener("keyup", (e) => delete keysPressed[e.key.toLowerCase()]);

function gameLoop() {
  const step = 5;
  const maxX = gameArea.clientWidth - character.clientWidth;
  const maxY = gameArea.clientHeight - character.clientHeight;

  if (keysPressed["arrowright"] || keysPressed["d"]) posX += step;
  if (keysPressed["arrowleft"] || keysPressed["a"]) posX -= step;
  if (keysPressed["arrowup"] || keysPressed["w"]) posY += step;
  if (keysPressed["arrowdown"] || keysPressed["s"]) posY -= step;

  posX = Math.max(0, Math.min(posX, maxX));
  posY = Math.max(0, Math.min(posY, maxY));

  character.style.left = posX + "px";
  character.style.bottom = posY + "px";

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

function saveDataToGoogleSheet() {
  const data = {
    name: localStorage.getItem("playerName") || "Unknown",
    posX,
    posY,
    timestamp: new Date().toLocaleString()
  };

  fetch("https://script.google.com/macros/s/AKfycbxNsNxo_HbdnRfUWN7-0fyiPTG0X5nI6-gbKOBh2PrtukbwTtQpj83R6CBg4dxkbhsPLA/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });
}

// ส่งทุก 10 วินาที
setInterval(saveDataToGoogleSheet, 10000);
