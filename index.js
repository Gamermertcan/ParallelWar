document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("game-area");
  const logs = document.getElementById("logs");
  const socket = io();

  for (let i = 0; i < 50 * 50; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    gameArea.appendChild(cell);
  }

  gameArea.addEventListener("click", (event) => {
    const cell = event.target;
    if (cell.tagName === "DIV") {
      const index = cell.dataset.index;
      socket.emit("start-war", { cell: index });
      logMessage(`Savaş başlatıldı: Hücre ${index}`);
    }
  });

  socket.on("war-result", (data) => {
    const { cell, result } = data;
    const targetCell = document.querySelector(`[data-index='${cell}']`);
    targetCell.style.backgroundColor = result === "win" ? "green" : "red";
    logMessage(`Savaş sonucu: Hücre ${cell} - ${result}`);
  });

  function logMessage(message) {
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    logs.appendChild(logEntry);
    logs.scrollTop = logs.scrollHeight;
  }
});
