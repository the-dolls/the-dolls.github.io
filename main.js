// Rock Band World Tour - Main JavaScript
// Professional interactive functionality with smooth animations

class RockBandWebsite {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.audioPlayer = null;
        this.shoppingCart = [];
        this.tourDates = this.generateTourDates();
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        this.init();
    }

    init() {
        this.initializeAnimations();
        this.setupNavigation();
        this.initializePageSpecificFeatures();
        this.setupScrollAnimations();
        this.initializeParticleSystem();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('tour-dates')) return 'tour-dates';
        if (path.includes('band')) return 'band';
        if (path.includes('merchandise')) return 'merchandise';
        return 'home';
    }

    // Navigation and Page Transitions
    setupNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href.includes('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(link.getAttribute('href'));
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Initialize Animations
    initializeAnimations() {
        // Hero text animations
        if (document.querySelector('.hero-title')) {
            this.animateHeroText();
        }

        // Stagger animations for cards
        this.staggerCardAnimations();
        
        // Button hover effects
        this.setupButtonEffects();
    }

    animateHeroText() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            // Split text into characters for animation
            Splitting({ target: heroTitle, by: 'chars' });
            
            anime({
                targets: '.hero-title .char',
                translateY: [100, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1200,
                delay: (el, i) => 100 + 30 * i
            });
        }

        if (heroSubtitle) {
            anime({
                targets: heroSubtitle,
                translateY: [50, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1000,
                delay: 800
            });
        }
    }

    staggerCardAnimations() {
        const cards = document.querySelectorAll('.card, .venue-card, .member-card, .product-card');
        
        if (cards.length > 0) {
            anime({
                targets: cards,
                translateY: [60, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 800,
                delay: (el, i) => 200 + 100 * i
            });
        }
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .cta-button, .play-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    anime({
                        targets: element,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 600
                    });
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements for scroll animation
        const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
        animateOnScroll.forEach(el => observer.observe(el));
    }

    // Particle System for Background Effects
    initializeParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const app = new PIXI.Application({
            view: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            antialias: true
        });

        this.createParticles(app);
        
        // Resize handler
        window.addEventListener('resize', () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
        });
    }

    createParticles(app) {
        const particleContainer = new PIXI.Container();
        app.stage.addChild(particleContainer);

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = new PIXI.Graphics();
            particle.beginFill(0xdc2626, 0.3);
            particle.drawCircle(0, 0, Math.random() * 3 + 1);
            particle.endFill();

            particle.x = Math.random() * app.screen.width;
            particle.y = Math.random() * app.screen.height;
            particle.vx = (Math.random() - 0.5) * 2;
            particle.vy = (Math.random() - 0.5) * 2;

            particles.push(particle);
            particleContainer.addChild(particle);
        }

        // Animate particles
        app.ticker.add(() => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > app.screen.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > app.screen.height) particle.vy *= -1;
            });
        });
    }

    // Page-specific Features
    initializePageSpecificFeatures() {
        switch (this.currentPage) {
            case 'home':
                this.initializeHomePage();
                break;
            case 'tour-dates':
                this.initializeTourDatesPage();
                break;
            case 'band':
                this.initializeBandPage();
                break;
            case 'merchandise':
                this.initializeMerchandisePage();
                break;
        }
    }

    // Homepage Features
    initializeHomePage() {
        this.setupAudioPlayer();
        this.initializeImageCarousel();
        this.setupTypedText();
    }

    setupAudioPlayer() {
        const playButton = document.querySelector('.play-button');
        const audioProgress = document.querySelector('.audio-progress');
        const audioTime = document.querySelector('.audio-time');

        if (playButton) {
            playButton.addEventListener('click', () => {
                this.toggleAudioPlayback();
            });
        }

        // Simulate audio progress
        if (audioProgress) {
            this.simulateAudioProgress();
        }
    }

    toggleAudioPlayback() {
        const playButton = document.querySelector('.play-button');
        const isPlaying = playButton.classList.contains('playing');

        if (isPlaying) {
            playButton.classList.remove('playing');
            playButton.innerHTML = '▶';
        } else {
            playButton.classList.add('playing');
            playButton.innerHTML = '⏸';
        }
    }

    simulateAudioProgress() {
        const progressBar = document.querySelector('.audio-progress-fill');
        let progress = 0;

        setInterval(() => {
            if (document.querySelector('.play-button.playing')) {
                progress += 0.5;
                if (progress > 100) progress = 0;
                
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
            }
        }, 100);
    }

    initializeImageCarousel() {
        const carousel = document.querySelector('.image-carousel');
        if (carousel && typeof Splide !== 'undefined') {
            new Splide(carousel, {
                type: 'loop',
                autoplay: true,
                interval: 3000,
                arrows: false,
                pagination: false
            }).mount();
        }
    }

    setupTypedText() {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement && typeof Typed !== 'undefined') {
            new Typed(typedElement, {
                strings: [
                    'World Tour 2025',
                    'Live in Concert',
                    'New Album Out Now',
                    'Tickets Available'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }

    // Tour Dates Page Features
    initializeTourDatesPage() {
        this.setupCalendar();
        this.setupVenueCards();
        this.setupTicketBooking();
    }

    setupCalendar() {
        const calendar = document.querySelector('.calendar');
        if (!calendar) return;

        this.renderCalendar();
        this.setupCalendarNavigation();
    }

    renderCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        calendarGrid.innerHTML = '';

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();

            if (date.getMonth() !== this.currentMonth) {
                dayElement.classList.add('other-month');
            }

            if (this.isTourDate(date)) {
                dayElement.classList.add('tour-date');
                dayElement.addEventListener('click', () => this.showTourDateInfo(date));
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    isTourDate(date) {
        const tourDates = [
            new Date(2025, 9, 15), // October 15, 2025
            new Date(2025, 9, 18), // October 18, 2025
            new Date(2025, 9, 22), // October 22, 2025
            new Date(2025, 9, 25), // October 25, 2025
            new Date(2025, 9, 28), // October 28, 2025
        ];

        return tourDates.some(tourDate => 
            tourDate.toDateString() === date.toDateString()
        );
    }

    setupCalendarNavigation() {
        const prevBtn = document.querySelector('.calendar-prev');
        const nextBtn = document.querySelector('.calendar-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentMonth--;
                if (this.currentMonth < 0) {
                    this.currentMonth = 11;
                    this.currentYear--;
                }
                this.renderCalendar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentMonth++;
                if (this.currentMonth > 11) {
                    this.currentMonth = 0;
                    this.currentYear++;
                }
                this.renderCalendar();
            });
        }
    }

    showTourDateInfo(date) {
        const modal = document.querySelector('.tour-date-modal');
        if (modal) {
            modal.style.display = 'flex';
            modal.querySelector('.modal-date').textContent = date.toLocaleDateString();
        }
    }

    setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showVenueDetails(card);
            });
        });
    }

    showVenueDetails(card) {
        const venueName = card.querySelector('.venue-name').textContent;
        const venueLocation = card.querySelector('.venue-location').textContent;
        
        // Animate card selection
        anime({
            targets: card,
            scale: [1, 1.05, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Show venue details modal or expand card
        console.log(`Selected venue: ${venueName}, ${venueLocation}`);
    }

    setupTicketBooking() {
        const bookButtons = document.querySelectorAll('.book-tickets');
        bookButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBookingModal();
            });
        });
    }

    showBookingModal() {
        const modal = document.querySelector('.booking-modal');
        if (modal) {
            modal.style.display = 'flex';
            this.setupBookingForm();
        }
    }

    setupBookingForm() {
        const form = document.querySelector('.booking-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processBooking();
            });
        }
    }

    processBooking() {
        // Simulate booking process
        const button = document.querySelector('.booking-submit');
        button.textContent = 'Processing...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Booked Successfully!';
            setTimeout(() => {
                document.querySelector('.booking-modal').style.display = 'none';
                button.textContent = 'Book Tickets';
                button.disabled = false;
            }, 2000);
        }, 2000);
    }

    // Band Page Features
    initializeBandPage() {
        this.setupMemberCards();
        this.setupDiscography();
        this.setupAudioPlayer();
    }

    setupMemberCards() {
        const memberCards = document.querySelectorAll('.member-card');
        memberCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    setupDiscography() {
        const albumCards = document.querySelectorAll('.album-card');
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showAlbumDetails(card);
            });
        });
    }

    showAlbumDetails(card) {
        const albumTitle = card.querySelector('.album-title').textContent;
        const albumYear = card.querySelector('.album-year').textContent;
        
        console.log(`Selected album: ${albumTitle} (${albumYear})`);
        
        // Animate card selection
        anime({
            targets: card,
            scale: [1, 0.95, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    // Merchandise Page Features
    initializeMerchandisePage() {
        this.setupProductCards();
        this.setupShoppingCart();
        this.setupProductFilters();
    }

    setupProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const addToCartBtn = card.querySelector('.add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    this.addToCart(card);
                });
            }

            // Product image zoom
            const productImage = card.querySelector('.product-image');
            if (productImage) {
                productImage.addEventListener('click', () => {
                    this.showProductModal(card);
                });
            }
        });
    }

    addToCart(card) {
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        const productImage = card.querySelector('.product-image').src;

        const item = {
            id: Date.now(),
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        this.shoppingCart.push(item);
        this.updateCartDisplay();
        this.showCartNotification(item);
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.querySelector('.cart-items');
        
        if (cartCount) {
            cartCount.textContent = this.shoppingCart.length;
        }

        if (cartItems) {
            cartItems.innerHTML = this.shoppingCart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-item" onclick="rockBand.removeFromCart(${item.id})">×</button>
                </div>
            `).join('');
        }
    }

    removeFromCart(itemId) {
        this.shoppingCart = this.shoppingCart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
    }

    showCartNotification(item) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <img src="${item.image}" alt="${item.name}">
                <span>Added ${item.name} to cart</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: notification,
                        translateX: [0, 300],
                        opacity: [1, 0],
                        duration: 300,
                        easing: 'easeOutQuad',
                        complete: () => notification.remove()
                    });
                }, 3000);
            }
        });
    }

    setupShoppingCart() {
        const cartToggle = document.querySelector('.cart-toggle');
        const cartSidebar = document.querySelector('.cart-sidebar');
        
        if (cartToggle && cartSidebar) {
            cartToggle.addEventListener('click', () => {
                cartSidebar.classList.toggle('active');
            });
        }
    }

    setupProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter products
                productCards.forEach(card => {
                    const category = card.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 300,
                            easing: 'easeOutQuad'
                        });
                    } else {
                        anime({
                            targets: card,
                            opacity: [1, 0],
                            scale: [1, 0.8],
                            duration: 300,
                            easing: 'easeOutQuad',
                            complete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }

    // Utility Functions
    generateTourDates() {
        return [
            { date: '2025-10-15', venue: 'Madison Square Garden', city: 'New York, NY' },
            { date: '2025-10-18', venue: 'The Forum', city: 'Los Angeles, CA' },
            { date: '2025-10-22', venue: 'United Center', city: 'Chicago, IL' },
            { date: '2025-10-25', venue: 'TD Garden', city: 'Boston, MA' },
            { date: '2025-10-28', venue: 'Climate Pledge Arena', city: 'Seattle, WA' }
        ];
    }

    // Modal Management
    setupModalHandlers() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rockBand = new RockBandWebsite();
});

// Handle page visibility changes for audio
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.rockBand && window.rockBand.audioPlayer) {
        window.rockBand.audioPlayer.pause();
    }
});