// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Contact form handling with Formspree
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let Formspree handle the submission
        // We'll show a loading state and success message after submission
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Formspree will handle the actual submission
        // We'll show success message after a brief delay to simulate processing
        setTimeout(() => {
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#dcfce7' : type === 'error' ? '#fee2e2' : '#dbeafe'};
        color: ${type === 'success' ? '#166534' : type === 'error' ? '#dc2626' : '#1e3a8a'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .property-card, .contact-item, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Handle both old (.stat with h3) and new (.stat-item with .stat-number) structures
            let statNumber = entry.target.querySelector('.stat-number');
            let target = 0;
            
            if (statNumber) {
                // New structure (properties.html)
                target = parseInt(statNumber.getAttribute('data-target'));
            } else {
                // Old structure (index.html)
                const h3Element = entry.target.querySelector('h3');
                if (h3Element) {
                    const text = h3Element.textContent;
                    target = parseInt(text.replace(/\D/g, ''));
                }
            }
            
            if (target && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                if (statNumber) {
                    animateCounter(statNumber, target);
                } else {
                    // For old structure, animate the h3 element
                    const h3Element = entry.target.querySelector('h3');
                    if (h3Element) {
                        animateCounter(h3Element, target);
                    }
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    // Observe both old and new stat structures
    const oldStats = document.querySelectorAll('.stat');
    const newStats = document.querySelectorAll('.stat-item');
    
    oldStats.forEach(stat => statsObserver.observe(stat));
    newStats.forEach(stat => statsObserver.observe(stat));
});

// Property card hover effects
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Lazy loading for images (if added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Add section-visible class styles
const style = document.createElement('style');
style.textContent = `
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: inherit;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key to submit form when focused on submit button
    if (e.key === 'Enter' && e.target.type === 'submit') {
        e.target.click();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Property Carousel Functions
function changeSlide(button, direction) {
    const carousel = button.closest('.property-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = 0;
    
    // Find current active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    // Update slides
    slides[currentIndex].classList.remove('active');
    slides[newIndex].classList.add('active');
    
    // Update dots
    dots[currentIndex].classList.remove('active');
    dots[newIndex].classList.add('active');
}

function currentSlide(dot, index) {
    const carousel = dot.closest('.property-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active class to selected slide and dot
    slides[index].classList.add('active');
    dot.classList.add('active');
}

// Auto-advance carousel every 5 seconds
function autoAdvanceCarousels() {
    const carousels = document.querySelectorAll('.property-carousel');
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        let currentIndex = 0;
        
        // Find current active slide
        slides.forEach((slide, index) => {
            if (slide.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        // Calculate next index
        let nextIndex = (currentIndex + 1) % slides.length;
        
        // Update slides
        slides[currentIndex].classList.remove('active');
        slides[nextIndex].classList.add('active');
        
        // Update dots
        dots[currentIndex].classList.remove('active');
        dots[nextIndex].classList.add('active');
    });
}

// Start auto-advance if user hasn't interacted with carousel
let autoAdvanceInterval;
function startAutoAdvance() {
    autoAdvanceInterval = setInterval(autoAdvanceCarousels, 5000);
}

function stopAutoAdvance() {
    clearInterval(autoAdvanceInterval);
}

// Stop auto-advance when user interacts with carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.property-carousel');
    carousels.forEach(carousel => {
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);
        carousel.addEventListener('click', stopAutoAdvance);
    });
    
    // Start auto-advance
    startAutoAdvance();
});

// Image Modal Functionality
let currentImageIndex = 0;
let currentCarouselImages = [];

function openImageModal(imageSrc, carouselElement) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Get all images from the current carousel
    const carousel = carouselElement.closest('.property-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    const placeholders = carousel.querySelectorAll('.property-placeholder');
    
    // Find the clicked image index
    let clickedIndex = 0;
    if (imageSrc) {
        // Real image was clicked
        images.forEach((img, index) => {
            if (img.src === imageSrc) {
                clickedIndex = index;
            }
        });
    } else {
        // Placeholder was clicked
        placeholders.forEach((placeholder, index) => {
            if (placeholder === carouselElement) {
                clickedIndex = index;
            }
        });
    }
    
    currentImageIndex = clickedIndex;
    
    // Store current carousel images for navigation
    currentCarouselImages = [];
    images.forEach(img => currentCarouselImages.push(img));
    placeholders.forEach(placeholder => currentCarouselImages.push(placeholder));
    
    // Show the modal with the clicked image
    if (imageSrc) {
        modalImage.src = imageSrc;
        modalImage.style.display = 'block';
    } else {
        // For placeholders, show a default image or icon
        modalImage.style.display = 'none';
        // You could add a placeholder modal here if needed
        return;
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

function navigateImage(direction) {
    if (currentCarouselImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Handle wrapping around
    if (currentImageIndex < 0) {
        currentImageIndex = currentCarouselImages.length - 1;
    } else if (currentImageIndex >= currentCarouselImages.length) {
        currentImageIndex = 0;
    }
    
    const modalImage = document.getElementById('modalImage');
    const currentImage = currentCarouselImages[currentImageIndex];
    
    // Check if it's a real image or placeholder
    if (currentImage.src) {
        modalImage.src = currentImage.src;
        modalImage.style.display = 'block';
    } else {
        // Handle placeholder navigation - show a default image or close modal
        modalImage.src = '';
        modalImage.style.display = 'none';
        // Optionally close modal if we're on a placeholder
        // closeImageModal();
        // return;
    }
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
    
    // Add click event listeners to all carousel images and placeholders
    const carouselImages = document.querySelectorAll('.carousel-image');
    const placeholders = document.querySelectorAll('.property-placeholder');
    
    carouselImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent carousel navigation
            openImageModal(this.src, this);
        });
    });
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent carousel navigation
            openImageModal(null, this);
        });
    });
    
    // Prevent carousel navigation buttons from triggering image modal
    const carouselButtons = document.querySelectorAll('.carousel-btn');
    carouselButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}); 

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherAnswer.style.display = 'none';
                    otherIcon.className = 'fas fa-plus';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.display = 'none';
                icon.className = 'fas fa-plus';
                item.classList.remove('active');
            } else {
                answer.style.display = 'block';
                icon.className = 'fas fa-minus';
                item.classList.add('active');
            }
        });
    });
}); 