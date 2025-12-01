// Matrix Intelligence - Website Health Check System
// Professional diagnostic service with demo-first approach

// ============= CONFIGURATION =============
const CONFIG = {
    USDT_ADDRESS: 'TGvyTtKBiSY5RHsfWipRdTjpWroeQSGLTC',
    PRICES: {
        basic: 97,
        premium: 247,
        elite: 497
    },
    SUPPORT_EMAIL: 'digitaleng.contact@gmail.com',
    SUPPORT_TELEGRAM: '@DigitalEng_Support',
    DEMO_DELAY: 2000, // 2 seconds for demo generation
    PAYMENT_CHECK_INTERVAL: 30000 // 30 seconds
};

// ============= STATE MANAGEMENT =============
let currentPlan = null;
let currentWebsite = '';
let demoGenerated = false;

// ============= DEMO REPORT SYSTEM =============

function generateDemoReport() {
    const urlInput = document.getElementById('website-url');
    const websiteUrl = urlInput.value.trim();
    
    if (!websiteUrl) {
        alert('Please enter your website URL');
        return;
    }
    
    if (!isValidUrl(websiteUrl)) {
        alert('Please enter a valid website URL (e.g., https://example.com)');
        return;
    }
    
    // Save current website
    currentWebsite = websiteUrl;
    
    // Show loading state
    const button = document.querySelector('.demo-input button');
    const originalText = button.textContent;
    button.textContent = 'Generating Demo...';
    button.disabled = true;
    
    // Create demo report container if it doesn't exist
    let demoResult = document.querySelector('.demo-result');
    if (!demoResult) {
        demoResult = document.createElement('div');
        demoResult.className = 'demo-result';
        document.querySelector('.demo-request').appendChild(demoResult);
    }
    
    // Show loader
    demoResult.innerHTML = `
        <div class="demo-loader show">
            <div class="loader-spinner"></div>
            <p>Analyzing ${extractDomain(websiteUrl)}...</p>
        </div>
    `;
    demoResult.classList.add('show');
    
    // Simulate analysis (in real scenario - API call)
    setTimeout(() => {
        const demoReport = createDemoReport(websiteUrl);
        demoResult.innerHTML = demoReport;
        
        // Restore button
        button.textContent = originalText;
        button.disabled = false;
        
        // Scroll to demo result
        demoResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Mark demo as generated
        demoGenerated = true;
        
        // Track demo generation
        trackEvent('demo_generated', websiteUrl);
    }, CONFIG.DEMO_DELAY);
}

function createDemoReport(websiteUrl) {
    const domain = extractDomain(websiteUrl);
    const mockScore = Math.floor(Math.random() * 30) + 40; // 40-70 for demo
    
    return `
        <div class="demo-report-content">
            <h3>📊 Demo Report for ${domain}</h3>
            <div class="demo-overview">
                <div class="demo-score">
                    <span class="score-value">${mockScore}/100</span>
                    <span class="score-label">Website Health Score</span>
                </div>
                <p>Based on preliminary analysis of ${domain}</p>
            </div>
            
            <div class="demo-issues">
                <h4>🔍 Critical Issues Found (Demo):</h4>
                
                <div class="demo-issue">
                    <h4>Slow Page Load Speed</h4>
                    <p>Current: 4.8s (Should be under 2s)</p>
                    <div class="demo-metric">
                        <span>Impact on conversions:</span>
                        <span class="metric-value">-32%</span>
                    </div>
                </div>
                
                <div class="demo-issue">
                    <h4>Poor Mobile Optimization</h4>
                    <p>Mobile score: 54/100</p>
                    <div class="demo-metric">
                        <span>Mobile traffic loss:</span>
                        <span class="metric-value">-41%</span>
                    </div>
                </div>
                
                <div class="demo-issue">
                    <h4>Missing SEO Meta Structure</h4>
                    <p>45% of pages lack proper meta tags</p>
                    <div class="demo-metric">
                        <span>Organic traffic potential:</span>
                        <span class="metric-value">+68%</span>
                    </div>
                </div>
            </div>
            
            <div class="demo-preview">
                <div class="info-box">
                    <p>💡 <strong>This is a demo preview</strong> showing 3 of ${Math.floor(Math.random() * 8) + 5} critical issues found.</p>
                    <p>The full diagnostic report includes:</p>
                    <ul>
                        <li>Complete technical analysis</li>
                        <li>Detailed competitor comparison</li>
                        <li>Prioritized action plan</li>
                        <li>ROI calculations for each improvement</li>
                        <li>Professional presentation with graphics</li>
                    </ul>
                </div>
            </div>
            
            <div class="demo-cta">
                <p><strong>Ready for the full analysis?</strong></p>
                <div class="cta-buttons">
                    <button class="btn-primary" onclick="scrollToSection('pricing')">View Packages & Pricing</button>
                </div>
            </div>
        </div>
    `;
}

// ============= PLAN SELECTION =============

function selectPlan(plan) {
    if (!demoGenerated) {
        alert('Please generate a demo report first to see what we can find on your website.');
        scrollToSection('demo');
        return;
    }
    
    const plans = {
        basic: { 
            price: CONFIG.PRICES.basic, 
            name: 'BASIC',
            features: 'Complete diagnostic analysis with priority recommendations'
        },
        premium: { 
            price: CONFIG.PRICES.premium, 
            name: 'PREMIUM',
            features: 'Comprehensive analysis with competitive insights'
        },
        elite: { 
            price: CONFIG.PRICES.elite, 
            name: 'ELITE',
            features: 'Exhaustive analysis with ROI calculations and support'
        }
    };
    
    const selected = plans[plan];
    currentPlan = plan;
    
    // Show plan confirmation
    const confirmSelection = confirm(
        `You selected the ${selected.name} package:\n\n` +
        `💰 Price: $${selected.price} USDT\n` +
        `📊 Includes: ${selected.features}\n` +
        `🌐 Website: ${extractDomain(currentWebsite)}\n\n` +
        `Proceed to payment?`
    );
    
    if (confirmSelection) {
        // Scroll to payment section
        scrollToSection('usdt-payment');
        
        // Update payment confirmation message
        updatePaymentConfirmation(selected);
        
        // Track plan selection
        trackEvent('plan_selected', plan, selected.price);
    }
}

function updatePaymentConfirmation(plan) {
    const confirmButton = document.querySelector('.btn-confirm');
    const confirmationNote = document.querySelector('.confirmation-note');
    
    if (confirmButton && confirmationNote) {
        confirmButton.textContent = `✅ Pay $${plan.price} USDT & Get ${plan.name} Report`;
        confirmationNote.textContent = `After ${plan.price} USDT payment, you'll receive the complete ${plan.name.toLowerCase()} diagnostic report`;
        
        // Store in localStorage for persistence
        localStorage.setItem('selectedPlan', JSON.stringify({
            plan: currentPlan,
            price: plan.price,
            website: currentWebsite
        }));
    }
}

// ============= PAYMENT SYSTEM =============

function copyAddress() {
    navigator.clipboard.writeText(CONFIG.USDT_ADDRESS).then(() => {
        showNotification('USDT address copied to clipboard!');
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = CONFIG.USDT_ADDRESS;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('USDT address copied to clipboard!');
    });
}

function showConfirmationForm() {
    if (!currentPlan) {
        alert('Please select a package first.');
        scrollToSection('pricing');
        return;
    }
    
    const planPrice = CONFIG.PRICES[currentPlan];
    const domain = extractDomain(currentWebsite);
    
    const email = prompt(
        `Please enter your email to receive the ${currentPlan.toUpperCase()} report:\n\n` +
        `Website: ${domain}\n` +
        `Package: ${currentPlan.toUpperCase()}\n` +
        `Amount: $${planPrice} USDT\n\n` +
        `Your email:`
    );
    
    if (email && validateEmail(email)) {
        // Show payment status
        showPaymentStatus('checking');
        
        // Simulate payment checking
        setTimeout(() => {
            // In real scenario, this would check blockchain
            const paymentConfirmed = confirmPayment();
            
            if (paymentConfirmed) {
                showPaymentStatus('confirmed');
                sendReportToClient(email, domain);
                trackEvent('payment_completed', currentPlan, planPrice, email);
            } else {
                showPaymentStatus('failed');
            }
        }, 3000);
        
    } else if (email) {
        alert('Please enter a valid email address.');
    }
}

function showPaymentStatus(status) {
    let statusDiv = document.querySelector('.payment-status');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.className = 'payment-status';
        document.querySelector('.payment-confirmation').appendChild(statusDiv);
    }
    
    const messages = {
        checking: `
            <div class="status-checking">
                <div class="loader-spinner" style="margin: 0 auto 1rem;"></div>
                <h4>Checking payment status...</h4>
                <p>Verifying USDT transaction on blockchain</p>
            </div>
        `,
        confirmed: `
            <div class="status-confirmed">
                <h4>✅ Payment Confirmed!</h4>
                <p>Your ${currentPlan.toUpperCase()} report has been sent to your email.</p>
                <p>Check your inbox (and spam folder) for the download link.</p>
            </div>
        `,
        failed: `
            <div class="status-failed">
                <h4>❌ Payment Not Found</h4>
                <p>We couldn't verify your payment. Please ensure:</p>
                <ul>
                    <li>You sent exactly $${CONFIG.PRICES[currentPlan]} USDT</li>
                    <li>You used the TRC20 network</li>
                    <li>You sent to the correct address</li>
                </ul>
                <button class="btn-outline" onclick="showConfirmationForm()">Try Again</button>
            </div>
        `
    };
    
    statusDiv.innerHTML = messages[status];
    statusDiv.classList.add('show');
    
    if (status === 'confirmed') {
        // Clear stored data
        localStorage.removeItem('selectedPlan');
        currentPlan = null;
        demoGenerated = false;
    }
}

function confirmPayment() {
    // In real implementation, this would:
    // 1. Check blockchain for recent transactions to CONFIG.USDT_ADDRESS
    // 2. Verify amount matches selected plan
    // 3. Return true if payment found
    
    // For demo purposes, we'll simulate confirmation
    return Math.random() > 0.2; // 80% success rate for demo
}

function sendReportToClient(email, domain) {
    // In real implementation, this would:
    // 1. Generate personalized PDF report
    // 2. Upload to secure storage
    // 3. Send email with download link
    
    console.log(`Report sent to ${email} for ${domain}`);
    
    // Simulate report download link
    setTimeout(() => {
        const statusDiv = document.querySelector('.payment-status');
        if (statusDiv) {
            statusDiv.innerHTML += `
                <div class="report-download fade-in" style="margin-top: 2rem;">
                    <h4>📥 Download Your Report</h4>
                    <p>Your diagnostic report is ready for immediate download:</p>
                    <a href="#" class="download-btn" onclick="downloadReport()">
                        📄 Download ${currentPlan.toUpperCase()} Report
                    </a>
                    <p style="margin-top: 1rem; font-size: 0.9rem;">
                        Report ID: MI-${Date.now().toString().slice(-6)}<br>
                        Generated: ${new Date().toLocaleDateString()}
                    </p>
                </div>
            `;
        }
    }, 1000);
}

function downloadReport() {
    // In real implementation, this would download the actual PDF
    alert('In production, this would download your personalized PDF report.\n\nFor demo: Report would include complete analysis, recommendations, and action plan.');
    trackEvent('report_downloaded', currentPlan);
}

// ============= UTILITY FUNCTIONS =============

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch (_) {
        return url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

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

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification fade-in';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--matrix-primary);
        color: var(--matrix-darker);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: var(--matrix-shadow);
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function trackEvent(category, action, label, value) {
    // In real implementation, integrate with analytics
    console.log('Event tracked:', { 
        category, 
        action, 
        label, 
        value,
        timestamp: new Date().toISOString(),
        website: currentWebsite,
        plan: currentPlan
    });
}

// ============= INITIALIZATION =============

document.addEventListener('DOMContentLoaded', function() {
    console.log('Matrix Intelligence Website Health Check initialized');
    
    // Load saved state
    const savedState = localStorage.getItem('selectedPlan');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            currentPlan = state.plan;
            currentWebsite = state.website || '';
            
            // Update UI if we have a saved plan
            if (currentPlan && CONFIG.PRICES[currentPlan]) {
                updatePaymentConfirmation({
                    name: currentPlan.toUpperCase(),
                    price: CONFIG.PRICES[currentPlan]
                });
            }
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                scrollToSection(targetId.substring(1));
            }
        });
    });
    
    // Active navigation based on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // Create back to top button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.title = 'Back to top';
        backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(backToTopBtn);
    }
    
    // Enter key support for URL input
    const urlInput = document.getElementById('website-url');
    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateDemoReport();
            }
        });
    }
    
    // Initialize demo request button
    const requestDemoBtn = document.querySelector('[onclick="requestDemoReport()"]');
    if (requestDemoBtn) {
        requestDemoBtn.onclick = generateDemoReport;
    }
});

// ============= GLOBAL FUNCTIONS =============

// Alias for backward compatibility
function requestDemoReport() {
    generateDemoReport();
}

function requestWebsiteHealthScore() {
    alert('Please use the "Get Free Demo Report" button to see actual findings from your website.');
    scrollToSection('demo');
}

// Performance optimization
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            // Any scroll-based optimizations can go here
        }, 100);
    }
});

// Make functions globally available
window.selectPlan = selectPlan;
window.generateDemoReport = generateDemoReport;
window.copyAddress = copyAddress;
window.showConfirmationForm = showConfirmationForm;
window.scrollToSection = scrollToSection;
window.requestDemoReport = requestDemoReport;
window.requestWebsiteHealthScore = requestWebsiteHealthScore;