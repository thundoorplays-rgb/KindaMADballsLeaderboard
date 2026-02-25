// ===========================
// BALLS DATA
// ===========================
let balls = {
    "RNG Bat": { wins: 6, losses: 0 },
    "Bonker": { wins: 15, losses: 5 },
    "Thumpy": { wins: 5, losses: 2 },
    "Shotgun": { wins: 16, losses: 7 },
    "Laser": { wins: 18, losses: 11 },
    "Hellfire": { wins: 9, losses: 6 },
    "Taser": { wins: 9, losses: 6 },
    "Minigun": { wins: 14, losses: 10 },
    "Weaver": { wins: 6, losses: 5 },
    "AK77": { wins: 12, losses: 11 },
    "Sniper": { wins: 14, losses: 14 },
    "Saber": { wins: 14, losses: 14 },
    "Fireball": { wins: 3, losses: 3 },
    "Ripsaw": { wins: 7, losses: 8 },
    "Bomber": { wins: 5, losses: 6 },
    "Striker": { wins: 5, losses: 6 },
    "Reflecta": { wins: 3, losses: 4 },
    "Frosty": { wins: 5, losses: 7 },
    "Sentry": { wins: 6, losses: 8 },
    "RPG": { wins: 13, losses: 18 },
    "Parasite": { wins: 10, losses: 14 },
    "Beacon": { wins: 5, losses: 8 },
    "Railgun": { wins: 9, losses: 15 },
    "Chainspark": { wins: 8, losses: 14 },
    "Sparky": { wins: 7, losses: 13 },
    "Heatseek": { wins: 9, losses: 17 },
    "Icicle": { wins: 2, losses: 4 },
    "Plasma": { wins: 7, losses: 18 },
    "Pulse": { wins: 4, losses: 20 }
};

// ===========================
// UPDATE LEADERBOARD FUNCTION
// ===========================
function updateLeaderboard() {
    let winrateBoard = document.getElementById("winrateBoard");
    let totalWinsBoard = document.getElementById("totalWinsBoard");

    let winrateText = "";
    let totalWinsText = "";

    // --- SORT BY WINRATE ---
    let ballArrayByWinrate = Object.entries(balls).sort((a, b) => {
        let aWins = a[1].wins, aLosses = a[1].losses;
        let bWins = b[1].wins, bLosses = b[1].losses;

        let aWinrate = aWins / (aWins + aLosses || 1);
        let bWinrate = bWins / (bWins + bLosses || 1);

        return bWinrate - aWinrate; // descending
    });

    // --- BUILD WINRATE LEADERBOARD ---
    ballArrayByWinrate.forEach((entry, index) => {
        let name = entry[0];
        let wins = entry[1].wins;
        let losses = entry[1].losses;
        let total = wins + losses;
        let winrate = total > 0 ? (wins / total * 100).toFixed(2) : "0.00";

        winrateText += `#${index+1} ${name} - ${wins}/${total} (${winrate}%)\n`;
    });

    // --- SORT BY TOTAL WINS ---
    let ballArrayByTotalWins = Object.entries(balls).sort((a, b) => b[1].wins - a[1].wins);

    // --- BUILD TOTAL WINS LEADERBOARD ---
    ballArrayByTotalWins.forEach((entry, index) => {
        let name = entry[0];
        let wins = entry[1].wins;

        totalWinsText += `#${index+1} ${name} - ${wins} wins\n`;
    });

    // --- UPDATE HTML ---
    winrateBoard.textContent = "Win Rates:\n" + winrateText;
    totalWinsBoard.textContent = "Total Wins:\n" + totalWinsText;
}

// ===========================
// ADD WIN / LOSS FUNCTIONS
// ===========================
function addWin() {
    let name = document.getElementById("ballName").value;
    if (!balls[name]) balls[name] = { wins: 0, losses: 0 };
    balls[name].wins++;
    updateLeaderboard();
}

function addLoss() {
    let name = document.getElementById("ballName").value;
    if (!balls[name]) balls[name] = { wins: 0, losses: 0 };
    balls[name].losses++;
    updateLeaderboard();
}

// ===========================
// CONNECT BUTTONS
// ===========================
document.getElementById("winnerBtn").onclick = addWin;
document.getElementById("loserBtn").onclick = addLoss;

// ===========================
// INITIAL RENDER
// ===========================
updateLeaderboard();