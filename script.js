// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeCountdown();
    initializeScrollAnimations();
    initializeTestimonialSlider();
});

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
}

// Countdown Timer
function initializeCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Set countdown to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Pulse Oximeter Simulator
function simulateReading() {
    const spo2Element = document.getElementById('spo2-value');
    const prElement = document.getElementById('pr-value');
    const testButton = document.querySelector('.test-button');
    const pulseWave = document.getElementById('pulse-wave');
    
    if (!spo2Element || !prElement || !testButton) return;
    
    // Disable button during simulation
    testButton.disabled = true;
    testButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mierzę...';
    
    // Add measuring animation
    pulseWave.style.animation = 'wave 0.5s linear infinite';
    
    // Simulate measurement process
    let measurementTime = 0;
    const measurementInterval = setInterval(() => {
        measurementTime += 100;
        
        // Random fluctuations during measurement
        const tempSpo2 = 95 + Math.floor(Math.random() * 6);
        const tempPr = 65 + Math.floor(Math.random() * 20);
        
        spo2Element.textContent = tempSpo2;
        prElement.textContent = tempPr;
        
        if (measurementTime >= 3000) { // 3 seconds measurement
            clearInterval(measurementInterval);
            
            // Final realistic values
            const finalSpo2 = 96 + Math.floor(Math.random() * 4); // 96-99%
            const finalPr = 70 + Math.floor(Math.random() * 15); // 70-84 bpm
            
            spo2Element.textContent = finalSpo2;
            prElement.textContent = finalPr;
            
            // Reset button
            testButton.disabled = false;
            testButton.innerHTML = '<i class="fas fa-play"></i> Symuluj pomiar';
            
            // Reset pulse wave animation
            pulseWave.style.animation = 'wave 2s linear infinite';
            
            // Show interpretation
            showInterpretation(finalSpo2);
        }
    }, 100);
}

function showInterpretation(spo2Value) {
    let message = '';
    let className = '';
    
    if (spo2Value >= 95) {
        message = 'Normalny poziom tlenu we krwi ✅';
        className = 'normal';
    } else if (spo2Value >= 90) {
        message = 'Niski poziom - skonsultuj z lekarzem ⚠️';
        className = 'warning';
    } else {
        message = 'Bardzo niski poziom - natychmiastowa pomoc! 🚨';
        className = 'danger';
    }
    
    // Create and show interpretation popup
    const popup = document.createElement('div');
    popup.className = `interpretation-popup ${className}`;
    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
    }, 5000);
}

// Testimonial Slider
let currentTestimonial = 0;

function initializeTestimonialSlider() {
    // Auto-advance testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % 3;
        showTestimonial(currentTestimonial);
    }, 5000);
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dot');
    
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Activate corresponding dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

// FAQ Toggle
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(faqAnswer => {
        if (faqAnswer !== answer) {
            faqAnswer.classList.remove('active');
            faqAnswer.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

// Smooth Scrolling
function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) {
        orderSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal Functions
function openOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeOrderModal();
            }
        });
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form Submission
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('order-form-modal')) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const orderData = {
            name: e.target.querySelector('input[type="text"]').value,
            phone: e.target.querySelector('input[type="tel"]').value,
            email: e.target.querySelector('input[type="email"]').value,
            address: e.target.querySelector('textarea').value,
            product: '2x Pulsoksymetr Medis',
            price: '59 zł'
        };
        
        // Simulate order processing
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Przetwarzam zamówienie...';
        
        setTimeout(() => {
            alert('Dziękujemy za zamówienie! Skontaktujemy się z Państwem w ciągu 24 godzin.');
            closeOrderModal();
            
            // Reset form
            e.target.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 2000);
    }
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeOrderModal();
    }
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft') {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : 2;
        showTestimonial(currentTestimonial);
    } else if (e.key === 'ArrowRight') {
        currentTestimonial = (currentTestimonial + 1) % 3;
        showTestimonial(currentTestimonial);
    }
});

// Add CSS for interpretation popup
const popupStyles = `
    .interpretation-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1500;
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
        animation: popupSlideIn 0.3s ease;
    }
    
    .interpretation-popup.normal {
        border-left: 5px solid #10B981;
    }
    
    .interpretation-popup.warning {
        border-left: 5px solid #F59E0B;
    }
    
    .interpretation-popup.danger {
        border-left: 5px solid #EF4444;
    }
    
    .popup-content p {
        margin-bottom: 1rem;
        font-weight: 600;
        font-size: 1.1rem;
    }
    
    .popup-content button {
        background: #2563EB;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
    }
    
    .popup-content button:hover {
        background: #1D4ED8;
    }
    
    @keyframes popupSlideIn {
        from {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;

// Inject popup styles
const styleSheet = document.createElement('style');
styleSheet.textContent = popupStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add loading animation for buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        const button = e.target;
        const originalContent = button.innerHTML;
        
        // Add loading state
        button.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
});

// Add hover sound effect (optional)
function addHoverSounds() {
    const buttons = document.querySelectorAll('.cta-button, .test-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Create subtle hover feedback
            button.style.transition = 'all 0.2s ease';
        });
    });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', addHoverSounds);

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563EB, #10B981);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', addScrollProgress);

