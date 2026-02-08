// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================

function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💘', '💞', '🌸', '🌻', '💐'];

    // Detect if mobile for performance optimization
    const isMobile = window.innerWidth <= 768;
    const heartCount = isMobile ? 10 : 20; // Reduce hearts on mobile

    // Create floating hearts
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';

        // Random animation delay
        heart.style.animationDelay = Math.random() * 3 + 's';

        // Random animation duration
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';

        heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        heartsContainer.appendChild(heart);
    }
}

// ============================================
// BUTTON INTERACTIONS
// ============================================

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const shareBtn = document.getElementById('shareBtn');

// Counter for "No" button clicks
let noClickCount = 0;
const noMessages = [
    "Maybe... 🥺",
    "Are you sure? 🥹",
    "Think again? 💭",
    "Pretty please? 🙏",
    "I'll be sad... 😢",
    "One more chance? 💔",
    "Final chance! 😭",
    "Okay fine... 😔"
];

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Create confetti explosion
    createConfetti();

    // Show success message with delay for confetti
    setTimeout(() => {
        successMessage.classList.add('show');
        // Hide original card content
        document.querySelector('.card').classList.add('success-active');

        // Play video with audio
        const video = document.getElementById('celebrationVideo');
        if (video) {
            // Try to play with audio
            video.play().catch(err => {
                // If autoplay with audio fails, mute and play
                console.log('Autoplay with audio blocked, playing muted');
                video.muted = true;
                video.play();
            });
        }
    }, 300);
});

// No button click handler with playful shrinking
noBtn.addEventListener('click', () => {
    noClickCount++;

    // Change button text
    if (noClickCount < noMessages.length) {
        noBtn.querySelector('.btn-text').textContent = noMessages[noClickCount];
    } else {
        // After running through all messages, keep the last one
        noBtn.querySelector('.btn-text').textContent = noMessages[noMessages.length - 1];
    }

    // Make Yes button bigger and No button smaller
    const yesScale = 1 + (noClickCount * 0.1);
    const noScale = Math.max(1 - (noClickCount * 0.08), 0.3); // Minimum 30% size

    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.transform = `scale(${noScale})`;

    // Add wiggle animation to Yes button
    yesBtn.style.animation = 'wiggle 0.5s ease-in-out';
    setTimeout(() => {
        yesBtn.style.animation = '';
    }, 500);

    // Make the No button harder to click as it shrinks
    if (noClickCount > 10) {
        noBtn.style.opacity = '0.7';
    }
    if (noClickCount > 15) {
        noBtn.style.opacity = '0.5';
    }
});

// ============================================
// CONFETTI EXPLOSION
// ============================================

function createConfetti() {
    const confettiElements = ['✨', '💖', '💕', '⭐', '🌟', '💫', '🎊', '🎉'];
    // Reduce confetti on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const confettiCount = isMobile ? 30 : 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = confettiElements[Math.floor(Math.random() * confettiElements.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.fontSize = Math.random() * 2 + 1 + 'rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.userSelect = 'none';

        document.body.appendChild(confetti);

        // Random animation
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const rotation = Math.random() * 720 - 360;

        confetti.animate([
            {
                transform: 'translate(-50%, -50%) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 1000 + 1500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 2500);
    }
}

// ============================================
// NOTIFICATION HELPER
// ============================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'linear-gradient(135deg, #FF85C0, #FFB3D9)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '2rem';
    notification.style.fontSize = '1.1rem';
    notification.style.fontFamily = "'Fredoka', sans-serif";
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 8px 32px rgba(255, 133, 192, 0.4)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideDown 0.5s ease-out';

    document.body.appendChild(notification);

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.5s ease-out reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 500);
    }, 3000);
}

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create rainbow effect on card
    const card = document.querySelector('.card');
    card.style.animation = 'rainbow 2s infinite';

    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Show notification
    showNotification('🌈 Rainbow mode activated! 🌈');

    // Remove after 5 seconds
    setTimeout(() => {
        card.style.animation = '';
        style.remove();
    }, 5000);
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Fix viewport height on mobile (addresses browser chrome)
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Preload fonts for better performance
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('1em Fredoka'),
            document.fonts.load('1em Pacifico')
        ]).then(() => {
            document.body.style.opacity = '1';
        });
    }

    // Enhanced touch feedback for mobile
    // Exclude yes/no buttons from generic feedback as they have custom logic
    const interactables = document.querySelectorAll('.btn:not(#yesBtn):not(#noBtn), a, .floating-heart');
    interactables.forEach(el => {
        // Touch start - immediate feedback
        el.addEventListener('touchstart', (e) => {
            el.style.transform = 'scale(0.95)';
        }, { passive: true });

        // Touch end - reset
        el.addEventListener('touchend', (e) => {
            setTimeout(() => {
                el.style.transform = '';
            }, 100);
        }, { passive: true });

        // Touch cancel - reset
        el.addEventListener('touchcancel', () => {
            el.style.transform = '';
        }, { passive: true });
    });

    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Optimize scroll performance on mobile
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Scroll logic here if needed
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    document.documentElement.style.setProperty('--reduce-motion', '1');
}

// Lazy load images if added later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
