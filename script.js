const initScripts = () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Stats Counter Animation with Random Numbers
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.counter-val');
    let hasCounted = false;

    if (statsSection && counters.length > 0) {
        // Generate random final numbers for the stats to make them look more authentic
        counters.forEach(counter => {
            if(counter.getAttribute('data-random') === 'true') {
                const base = +counter.getAttribute('data-base') || 10;
                const multiplier = +counter.getAttribute('data-mult') || 1;
                // random number between base and base + multiplier
                const randTarget = Math.floor(base + Math.random() * multiplier);
                counter.setAttribute('data-target', randTarget);
            }
        });

        const checkScroll = () => {
            if (hasCounted) return;
            const elementTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    let startTimestamp = null;

                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        
                        // Display easing or random numbers while progressing
                        if (progress < 1) {
                            // Flash random numbers while counting up
                            const current = Math.floor(progress * target) + Math.floor(Math.random() * 10);
                            counter.innerText = current > target ? target : current;
                            requestAnimationFrame(step);
                        } else {
                            // Final value
                            counter.innerText = target;
                        }
                    };
                    requestAnimationFrame(step);
                });
            }
        };

        window.addEventListener('scroll', checkScroll);
        // Initial check in case it's in view
        checkScroll();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScripts);
} else {
    initScripts();
}
