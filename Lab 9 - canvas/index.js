const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const numBallsInput = document.getElementById('numBalls');
const distanceThresholdInput = document.getElementById('distanceThreshold');

let balls = [];
let animationFrameId;
let numBalls = parseInt(numBallsInput.value);
let distanceThreshold = parseInt(distanceThresholdInput.value);

class Ball {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy *= -1;
        }
    }
}

function generateBalls() {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        const radius = 10;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        balls.push(new Ball(x, y, radius, dx, dy, color));
    }
}

function drawLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[i].x - balls[j].x;
            const dy = balls[i].y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < distanceThreshold) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });

    drawLines();
    animationFrameId = requestAnimationFrame(animate);
}

function startAnimation() {
    numBalls = parseInt(numBallsInput.value);
    distanceThreshold = parseInt(distanceThresholdInput.value);
    generateBalls();
    animate();
}

function resetCanvas() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
}

startBtn.addEventListener('click', () => {
    resetCanvas();
    startAnimation();
});

resetBtn.addEventListener('click', resetCanvas);