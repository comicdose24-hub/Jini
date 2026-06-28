// Loader disappearance
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 1000);
    }, 1500);
});

// Particle System
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initCanvas();
createParticles();
animateParticles();
window.addEventListener('resize', initCanvas);

// Navigation Logic
function navigateTo(sectionNum) {
    const current = document.querySelector('.section.active');
    const next = document.getElementById(`sec-${sectionNum}`);
    
    current.classList.remove('active');
    setTimeout(() => {
        next.classList.add('active');
        handleTypewriter(sectionNum);
    }, 800);
}

// Password Validation
function validatePassword() {
    const input = document.getElementById('passwordField').value.toLowerCase();
    const error = document.getElementById('error');
    if (input === 'jini') {
        navigateTo(2);
    } else {
        error.innerText = "Access Denied. Incorrect Code.";
        setTimeout(() => { error.innerText = ""; }, 2000);
    }
}

// Typewriter Effect
const texts = {
    2: "Hello, Jini.",
    3: "Just an observation...",
    4: "Final Thoughts"
};

function handleTypewriter(sectionNum) {
    const target = document.getElementById(`type-${sectionNum}`);
    if (!target) return;
    
    const text = texts[sectionNum];
    target.innerText = "";
    let i = 0;
    
    function type() {
        if (i < text.length) {
            target.innerText += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 500);
}

// Ripple Effect
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const btn = e.target;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        
        const x = e.clientX - btn.offsetLeft;
        const y = e.clientY - btn.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 600);
    }
});

function restartApp() {
    location.reload();
}