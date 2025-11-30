// USDT Payment Functions
function copyAddress() {
    const address = "TGvyTtKBiSY5RHsfWipRdTjpWroeQSGLTC";
    navigator.clipboard.writeText(address).then(() => {
        alert('USDT address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('USDT address copied to clipboard!');
    });
}

function showConfirmationForm() {
    const email = prompt('Please enter your email to receive the full report:');
    if (email && validateEmail(email)) {
        alert('Thank you! We will verify your payment and send the full report within 24 hours.');
        // Here you can add server data sending logic
        trackPaymentConfirmation(email);
    } else if (email) {
        alert('Please enter a valid email address.');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function trackPaymentConfirmation(email) {
    // Analytics or backend integration
    console.log('Payment confirmed for:', email);
}

// Website Health Score Calculator
function calculateWebsiteHealthScore() {
    const urlInput = document.getElementById('website-url');
    const scoreResult = document.getElementById('score-result');
    
    if (!urlInput.value) {
        alert('Please enter a website URL');
        return;
    }
    
    if (!isValidUrl(urlInput.value)) {
        alert('Please enter a valid website URL (e.g., https://example.com)');
        return;
    }
    
    // Show loading state
    const button = document.querySelector('.score-input button');
    const originalText = button.textContent;
    button.textContent = 'Analyzing...';
    button.disabled = true;
    
    // Simulate analysis (in real scenario - API call)
    setTimeout(() => {
        const mockScore = Math.floor(Math.random() * 40) + 60; // 60-100
        const metrics = {
            performance: Math.floor(Math.random() * 30) + 70,
            seo: Math.floor(Math.random() * 30) + 70,
            security: Math.floor(Math.random() * 30) + 70,
            conversion: Math.floor(Math.random() * 30) + 70
        };
        
        displayWebsiteHealthScore(mockScore, metrics);
        
        // Restore button
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function displayWebsiteHealthScore(score, metrics) {
    const scoreDisplay = document.querySelector('.score');
    const metricFills = document.querySelectorAll('.metric-fill');
    
    // Update main score
    scoreDisplay.textContent = `${score}/100`;
    
    // Animate metrics with delay
    Object.values(metrics).forEach((value, index) => {
        setTimeout(() => {
            if (metricFills[index]) {
                metricFills[index].style.width = `${value}%`;
                metricFills[index].setAttribute('data-value', value);
            }
        }, index * 300);
    });
    
    // Show results with animation
    const scoreResult = document.getElementById('score-result');
    scoreResult.style.display = 'block';
    scoreResult.style.opacity = '0';
    scoreResult.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        scoreResult.style.transition = 'all 0.6s ease';
        scoreResult.style.opacity = '1';
        scoreResult.style.transform = 'translateY(0)';
    }, 100);
}

// Navigation and CTA Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function requestWebsiteHealthScore() {
    const email = prompt('Enter your email for free Website Health Score analysis:');
    if (email && validateEmail(email)) {
        alert('Website Health Score analysis requested! We will contact you within 24 hours.');
        trackLeadGeneration(email, 'website_health_score');
    } else if (email) {
        alert('Please enter a valid email address.');
    }
}

function trackLeadGeneration(email, source) {
    // Analytics or CRM integration
    console.log('Lead generated:', { email, source, timestamp: new Date().toISOString() });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                scrollToSection(targetId.substring(1));
            }
        });
    });
    
    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const healthScoreForm = document.querySelector('.score-input');
    if (healthScoreForm) {
        healthScoreForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateWebsiteHealthScore();
        });
    }
    
    // Enter key support for URL input
    const urlInput = document.getElementById('website-url');
    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateWebsiteHealthScore();
            }
        });
    }
    
    console.log('Matrix Intelligence Website Health Check initialized');
});

// Performance optimization
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Add any scroll-based animations here
        }, 100);
    }
});

// Utility function for analytics
function trackEvent(category, action, label) {
    // Integrate with Google Analytics or other analytics platform
    console.log('Event tracked:', { category, action, label, timestamp: new Date().toISOString() });
}