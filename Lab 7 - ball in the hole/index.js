const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 15;
const ballColor = 'red';

const holeRadius = 20;
const holeColor = 'black';
let holeX = Math.random() * (canvas.width - holeRadius * 2) + holeRadius;
let holeY = Math.random() * (canvas.height - holeRadius * 2) + holeRadius;

let score = 0;
let timeLeft = 60; 

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer() {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}

window.addEventListener('deviceorientation', onDeviceMove);

function onDeviceMove(event) {
    const x = event.gamma || 0; 
    const y = event.beta || 0;  
    const sensitivity = 0.1; 
    ballX -= x * sensitivity;
    ballY += y * sensitivity; 

    ballX = Math.max(ballRadius, Math.min(canvas.width - ballRadius, ballX));
    ballY = Math.max(ballRadius, Math.min(canvas.height - ballRadius, ballY));
}

function checkCollision() {
    const dx = ballX - holeX;
    const dy = ballY - holeY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ballRadius + holeRadius) {
        score++;
        updateScore();

        holeX = Math.random() * (canvas.width - holeRadius * 2) + holeRadius;
        holeY = Math.random() * (canvas.height - holeRadius * 2) + holeRadius;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(holeX, holeY, holeRadius, 0, Math.PI * 2);
    ctx.fillStyle = holeColor;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function animate() {
    draw();
    checkCollision();
    requestAnimationFrame(animate);
}

    function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your score is ${score}`);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    timeLeft = 60;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    holeX = Math.random() * (canvas.width - holeRadius * 2) + holeRadius;
    holeY = Math.random() * (canvas.height - holeRadius * 2) + holeRadius;
    updateScore();
    updateTimer();
    startTimer();
}

function init() {
    updateScore();
    updateTimer();
    startTimer();
    animate();
}

init();