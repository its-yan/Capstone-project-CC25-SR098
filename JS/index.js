function openNav() {
    document.getElementById("mobileMenuBtn").style.width = "250px";
}

function closeNav() {
    document.getElementById("mobileMenuBtn").style.width = "0";
}

// Search Functionality
const searchArticles = () => {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const literaturCards = document.querySelectorAll('.literatur-card');

    literaturCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// User Authentication
class AuthManager {
    constructor() {
        this.isLoggedIn = false;
        this.user = null;
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            this.user = JSON.parse(userData);
            this.isLoggedIn = true;
            this.updateUI();
        }
    }

    login(email, password) {
        // Simulasi API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const userData = {
                        id: 'user123',
                        name: 'John Doe',
                        email: email,
                        avatar: 'IMG/default-avatar.jpg'
                    };
                    localStorage.setItem('userData', JSON.stringify(userData));
                    this.user = userData;
                    this.isLoggedIn = true;
                    this.updateUI();
                    resolve(userData);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }

    logout() {
        localStorage.removeItem('userData');
        this.user = null;
        this.isLoggedIn = false;
        this.updateUI();
    }

    updateUI() {
        const loginBtn = document.querySelector('.nav-btn');
        const userProfile = document.getElementById('userProfile');
        
        if (this.isLoggedIn && this.user) {
            loginBtn.style.display = 'none';
            if (!userProfile) {
                const profileHTML = `
                    <div id="userProfile" class="user-profile">
                        <img src="${this.user.avatar}" alt="${this.user.name}" class="profile-avatar">
                        <div class="profile-menu">
                            <span>${this.user.name}</span>
                            <button onclick="auth.logout()">Logout</button>
                        </div>
                    </div>
                `;
                document.querySelector('.nav-right').innerHTML = profileHTML;
            }
        } else {
            if (userProfile) {
                userProfile.remove();
            }
            loginBtn.style.display = 'block';
        }
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.setupListeners();
    }

    setupListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const emailInput = this.form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        try {
            await this.sendContactRequest(email);
            alert('Terima kasih telah menghubungi kami! Kami akan segera menghubungi Anda.');
            emailInput.value = '';
        } catch (error) {
            alert('Terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi.');
        }
    }

    sendContactRequest(email) {
        // Simulasi API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }
}

// Testimonials Manager
class TestimonialsManager {
    constructor() {
        this.testimonials = [];
        this.loadTestimonials();
    }

    async loadTestimonials() {
        try {
            // Simulasi API call untuk mendapatkan testimonial
            const response = await this.fetchTestimonials();
            this.testimonials = response;
            this.renderTestimonials();
        } catch (error) {
            console.error('Error loading testimonials:', error);
        }
    }

    fetchTestimonials() {
        // Simulasi API response
        return new Promise((resolve) => {
            const mockTestimonials = [
                {
                    id: 1,
                    name: 'John Doe',
                    handle: '@johnd',
                    avatar: 'IMG/user1.jpg',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                },
                // ... tambahkan testimonial lainnya
            ];
            
            setTimeout(() => {
                resolve(mockTestimonials);
            }, 1000);
        });
    }

    renderTestimonials() {
        const container = document.querySelector('.testimonials-grid');
        if (!container) return;

        container.innerHTML = this.testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="user-info">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="user-avatar">
                    <div class="user-details">
                        <h4>${testimonial.name}</h4>
                        <p class="user-handle">${testimonial.handle}</p>
                    </div>
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
            </div>
        `).join('');
    }
}

// Navbar functionality
class Navbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenu = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-center');
        this.searchToggle = document.querySelector('.search-toggle');
        this.searchBar = document.querySelector('.search-container');
        this.lastScroll = 0;
        
        this.initializeNavbar();
    }

    initializeNavbar() {
        // Mobile menu toggle
        this.mobileMenu?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Search toggle for mobile
        this.searchToggle?.addEventListener('click', () => this.toggleSearch());
        
        // Scroll behavior
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
    }

    toggleSearch() {
        this.searchBar.classList.toggle('active');
        if (this.searchBar.classList.contains('active')) {
            this.searchBar.querySelector('input').focus();
        }
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Show/hide navbar on scroll
        if (currentScroll > this.lastScroll && currentScroll > 100) {
            // Scrolling down & past navbar
            this.navbar.classList.add('hide');
        } else {
            // Scrolling up
            this.navbar.classList.remove('hide');
        }
        
        // Add background when scrolled
        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        this.lastScroll = currentScroll;
    }

    handleOutsideClick(e) {
        if (this.navLinks.classList.contains('active') && 
            !e.target.closest('.nav-center') && 
            !e.target.closest('.mobile-menu-btn')) {
            this.toggleMobileMenu();
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.navLinks.classList.remove('active');
            this.mobileMenu.classList.remove('active');
        }
    }
}

// Back to Top functionality
class BackToTop {
    constructor() {
        this.button = document.querySelector('.button');
        this.initializeBackToTop();
    }

    initializeBackToTop() {
        if (this.button) {
            window.addEventListener('scroll', () => this.toggleVisibility());
            this.button.addEventListener('click', () => this.scrollToTop());
        }
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.button.style.display = 'flex';
        } else {
            this.button.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Literatur Card Interaction
class LiteraturCard {
    constructor() {
        this.cards = document.querySelectorAll('.literatur-card');
        this.readMoreBtns = document.querySelectorAll('.read-more-btn');
        this.langTags = document.querySelectorAll('.lang-tag');
        this.init();
    }

    init() {
        this.setupReadMoreButtons();
        this.setupLangTags();
    }

    filterByLanguage(lang) {
        this.cards.forEach(card => {
            const cardTags = Array.from(card.querySelectorAll('.lang-tag'))
                .map(tag => tag.textContent);
            
            if (cardTags.includes(lang)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Auth
    window.auth = new AuthManager();

    // Initialize Contact Form
    new ContactForm();

    // Initialize Testimonials
    new TestimonialsManager();

    // Setup Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchArticles);
    }

    // Initialize Navbar
    new Navbar();
    
    // Initialize Back to Top
    new BackToTop();

    // Initialize LiteraturCard
    new LiteraturCard();
});