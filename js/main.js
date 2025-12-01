/**
 * ============================================
 * MATRIX DIGITAL HEALTH - MAIN JAVASCRIPT
 * Version: 1.0.0 | Author: Gennady Konstantinov
 * ============================================
 */

// ===== ГЛОБАЛЬНЫЙ ОБЪЕКТ СИСТЕМЫ =====
window.MatrixSystem = {
    
    // ===== КОНФИГУРАЦИЯ СИСТЕМЫ =====
    config: {
        version: '1.0.0',
        environment: 'production',
        debug: false,
        apiBase: 'https://api.matrix-digital-health.com',
        contactEmail: 'digitaleng.contact@gmail.com',
        telegramSupport: '@DigitalEng_Support',
        usdtAddress: 'TGvyTtKBiSY5RHsfWipRdTjpWroeQSGLTC',
        defaultPrices: {
            basic: 97,
            premium: 247,
            elite: 497
        }
    },
    
    // ===== СОСТОЯНИЕ СИСТЕМЫ =====
    state: {
        initialized: false,
        currentPlan: null,
        userDomain: null,
        demoOpened: false,
        scrollPosition: 0
    },
    
    // ===== ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ =====
    init: function() {
        console.log('🚀 Initializing Matrix Digital Health System v' + this.config.version);
        
        try {
            // 1. Инициализация компонентов
            this.initComponents();
            
            // 2. Настройка обработчиков событий
            this.setupEventListeners();
            
            // 3. Восстановление состояния
            this.restoreState();
            
            // 4. Настройка аналитики
            this.setupAnalytics();
            
            // 5. Показать приветственное сообщение
            this.showWelcomeMessage();
            
            this.state.initialized = true;
            console.log('✅ System initialized successfully');
            
            return this;
            
        } catch (error) {
            console.error('❌ System initialization failed:', error);
            this.showError('System initialization error');
            return null;
        }
    },
    
    // ===== ИНИЦИАЛИЗАЦИЯ КОМПОНЕНТОВ =====
    initComponents: function() {
        console.log('🔧 Initializing components...');
        
        // Инициализация навигации
        this.initNavigation();
        
        // Инициализация карточек технологий
        this.initTechCards();
        
        // Инициализация ценовых карточек
        this.initPricingCards();
        
        // Инициализация кнопок оплаты
        this.initPaymentButtons();
        
        // Инициализация формы контакта
        this.initContactForm();
        
        // Инициализация QR-кода
        this.initQRCode();
        
        console.log('✅ Components initialized');
    },
    
    // ===== НАВИГАЦИЯ =====
    initNavigation: function() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        // Эффект при скролле
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Плавная прокрутка для навигационных ссылок
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Обновление активной ссылки
                    this.updateActiveNavLink(targetId);
                }
            });
        });
        
        // Активная навигационная ссылка при скролле
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && 
                    scrollPosition < sectionTop + sectionHeight) {
                    this.updateActiveNavLink('#' + sectionId);
                }
            });
        });
    },
    
    updateActiveNavLink: function(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    },
    
    // ===== КАРТОЧКИ ТЕХНОЛОГИЙ =====
    initTechCards: function() {
        const techCards = document.querySelectorAll('.tech-card');
        
        techCards.forEach(card => {
            // Добавляем обработчик клика
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                const techId = card.dataset.tech;
                if (!techId) return;
                
                this.openTechDemo(techId);
            });
            
            // Добавляем эффекты при наведении
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.borderColor = 'var(--primary)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.borderColor = '';
            });
            
            // Анимация появления
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        // Запускаем анимацию появления карточек
        setTimeout(() => {
            techCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    },
    
    openTechDemo: function(techId) {
        console.log('Opening tech demo:', techId);
        
        // Запрашиваем домен у пользователя
        this.promptForDomain()
            .then(domain => {
                if (!domain) return;
                
                this.state.userDomain = domain;
                
                // Показываем демо через DemoCore
                if (window.DemoCore) {
                    window.DemoCore.openTechDemo(techId, domain);
                } else {
                    this.showError('Demo system not available');
                }
            })
            .catch(error => {
                console.error('Error opening demo:', error);
                this.showError('Failed to open demo');
            });
    },
    
    // ===== ЦЕНОВЫЕ КАРТОЧКИ =====
    initPricingCards: function() {
        const pricingButtons = document.querySelectorAll('[data-plan]');
        
        pricingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const plan = button.dataset.plan;
                if (!plan) return;
                
                this.selectPricingPlan(plan);
            });
        });
        
        // Эффект при наведении на карточки
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(-8px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    },
    
    selectPricingPlan: function(plan) {
        console.log('Selected plan:', plan);
        
        const prices = this.config.defaultPrices;
        const planNames = {
            basic: 'Basic Analysis',
            premium: 'Premium Audit',
            elite: 'Elite Package'
        };
        
        const price = prices[plan];
        const name = planNames[plan] || plan;
        
        this.state.currentPlan = { plan, price, name };
        
        // Показываем диалог подтверждения
        this.showPlanConfirmation(plan, price, name);
    },
    
    showPlanConfirmation: function(plan, price, name) {
        const message = `You selected: ${name}\n\nPrice: $${price}\n\nProceed with analysis?`;
        
        if (confirm(message)) {
            this.startOrderProcess(plan);
        }
    },
    
    startOrderProcess: function(plan) {
        // Запрашиваем домен
        this.promptForDomain()
            .then(domain => {
                if (!domain) return;
                
                this.state.userDomain = domain;
                
                // Показываем процесс заказа
                this.showOrderModal(plan, domain);
            })
            .catch(error => {
                console.error('Error starting order:', error);
                this.showError('Failed to start order process');
            });
    },
    
    // ===== КНОПКИ ОПЛАТЫ =====
    initPaymentButtons: function() {
        // Кнопка копирования USDT адреса
        const copyBtn = document.getElementById('copy-address-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyUSDTAddress();
            });
        }
        
        // Кнопка начала анализа
        const startBtn = document.getElementById('start-analysis-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startAnalysis();
            });
        }
        
        // Кнопка просмотра демо
        const demoBtn = document.getElementById('view-demo-btn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.showSampleReport();
            });
        }
    },
    
    copyUSDTAddress: function() {
        const address = this.config.usdtAddress;
        
        navigator.clipboard.writeText(address)
            .then(() => {
                this.showNotification('USDT address copied to clipboard!', 'success');
                
                // Анимация кнопки
                const btn = document.getElementById('copy-address-btn');
                if (btn) {
                    btn.textContent = 'Copied!';
                    btn.style.background = 'var(--success)';
                    
                    setTimeout(() => {
                        btn.textContent = 'Copy';
                        btn.style.background = '';
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                
                // Fallback метод
                const textArea = document.createElement('textarea');
                textArea.value = address;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                this.showNotification('Address copied!', 'success');
            });
    },
    
    startAnalysis: function() {
        // Показываем выбор пакета
        this.showPlanSelection();
    },
    
    showPlanSelection: function() {
        const planOptions = `
            <div class="plan-selection-modal">
                <h3>Select Analysis Package</h3>
                
                <div class="plan-options">
                    <div class="plan-option" data-plan="basic">
                        <h4>Basic Analysis</h4>
                        <div class="plan-price">$${this.config.defaultPrices.basic}</div>
                        <p>Single technology deep dive</p>
                        <button class="btn btn-sm">Select</button>
                    </div>
                    
                    <div class="plan-option featured" data-plan="premium">
                        <h4>Premium Audit</h4>
                        <div class="plan-price">$${this.config.defaultPrices.premium}</div>
                        <p>Complete 5-layer analysis</p>
                        <button class="btn btn-sm btn-primary">Select</button>
                    </div>
                    
                    <div class="plan-option" data-plan="elite">
                        <h4>Elite Package</h4>
                        <div class="plan-price">$${this.config.defaultPrices.elite}</div>
                        <p>Enterprise-grade solution</p>
                        <button class="btn btn-sm">Select</button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('Select Package', planOptions, 'medium');
        
        // Добавляем обработчики для кнопок выбора
        document.querySelectorAll('.plan-option').forEach(option => {
            option.addEventListener('click', () => {
                const plan = option.dataset.plan;
                this.selectPricingPlan(plan);
                this.closeModal();
            });
        });
    },
    
    showSampleReport: function() {
        // Показываем пример отчета
        const sampleContent = `
            <div class="sample-report">
                <h3>📋 Sample Report Preview</h3>
                
                <div class="sample-section">
                    <h4>Executive Summary</h4>
                    <p>Comprehensive analysis of website health with actionable recommendations.</p>
                </div>
                
                <div class="sample-section">
                    <h4>Key Findings</h4>
                    <ul>
                        <li>Performance optimization opportunities</li>
                        <li>Security vulnerabilities identified</li>
                        <li>SEO improvement potential</li>
                        <li>Conversion rate optimization</li>
                    </ul>
                </div>
                
                <div class="sample-section">
                    <h4>ROI Calculation</h4>
                    <p>Estimated monthly growth potential: <strong>$2,500 - $5,000</strong></p>
                </div>
                
                <button class="btn btn-primary" onclick="MatrixSystem.startAnalysis()">
                    Get Your Custom Analysis
                </button>
            </div>
        `;
        
        this.showModal('Sample Report', sampleContent, 'large');
    },
    
    // ===== ФОРМА КОНТАКТА =====
    initContactForm: function() {
        // Инициализация формы если есть на странице
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitContactForm(contactForm);
        });
    },
    
    submitContactForm: function(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Валидация
        if (!data.email || !data.message) {
            this.showError('Please fill all required fields');
            return;
        }
        
        // Показываем индикатор загрузки
        this.showLoading('Sending message...');
        
        // Симуляция отправки (в реальности - API call)
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Message sent successfully! We will contact you within 24 hours.', 'success');
            form.reset();
            
            // Логируем в консоль
            console.log('Contact form submitted:', data);
            
        }, 1500);
    },
    
    // ===== QR-КОД ФУНКЦИОНАЛЬНОСТЬ =====
    initQRCode: function() {
        const qrCode = document.querySelector('.qr-code');
        if (!qrCode) {
            console.log('QR code element not found');
            return;
        }
        
        // Делаем QR-код кликабельным
        qrCode.style.cursor = 'pointer';
        qrCode.title = 'Click to enlarge QR code';
        
        qrCode.addEventListener('click', (e) => {
            e.preventDefault();
            this.showQRModal();
        });
        
        console.log('✅ QR code initialized');
    },
    
    showQRModal: function() {
        const modalContent = `
            <div style="text-align: center; padding: 20px;">
                <div style="background: white; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                    <img src="assets/images/qr-usdt.png" 
                         alt="USDT QR Code" 
                         style="width: 250px; height: 250px; display: block; border-radius: 8px;">
                </div>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: left; border: 1px solid #e2e8f0;">
                    <p style="margin-bottom: 8px; color: #64748b; font-size: 14px; font-weight: 500;">
                        💎 USDT Address (TRC20):
                    </p>
                    <code style="color: #00dc82; font-size: 13px; word-break: break-all; font-family: 'Courier New', monospace; background: rgba(0, 220, 130, 0.1); padding: 10px; border-radius: 6px; display: block;">
                        ${this.config.usdtAddress}
                    </code>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn btn-primary" onclick="MatrixSystem.copyUSDTAddress()">
                        📋 Copy Address
                    </button>
                    <button class="btn btn-outline" onclick="MatrixSystem.closeModal()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        this.showModal('USDT Payment QR Code', modalContent, 'small');
    },
    
    // ===== ОБЩИЕ УТИЛИТЫ =====
    promptForDomain: function() {
        return new Promise((resolve) => {
            const domain = prompt('Enter your website URL for analysis:', 'https://example.com');
            
            if (!domain) {
                resolve(null);
                return;
            }
            
            // Валидация домена
            const cleanDomain = this.validateAndCleanDomain(domain);
            
            if (!cleanDomain) {
                this.showError('Please enter a valid website URL');
                resolve(null);
                return;
            }
            
            resolve(cleanDomain);
        });
    },
    
    validateAndCleanDomain: function(domain) {
        try {
            // Удаляем протокол и слеши
            let cleanDomain = domain.trim()
                .replace(/^https?:\/\//i, '')
                .replace(/\/$/, '');
            
            // Проверяем, есть ли точка в домене
            if (!cleanDomain.includes('.')) {
                return null;
            }
            
            // Удаляем www если есть
            cleanDomain = cleanDomain.replace(/^www\./i, '');
            
            return cleanDomain;
            
        } catch (error) {
            console.error('Domain validation error:', error);
            return null;
        }
    },
    
    showOrderModal: function(plan, domain) {
        const prices = this.config.defaultPrices;
        const price = prices[plan];
        
        const orderContent = `
            <div class="order-process">
                <div class="order-step active">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Order Details</h4>
                        <p><strong>Plan:</strong> ${plan.toUpperCase()}</p>
                        <p><strong>Domain:</strong> ${domain}</p>
                        <p><strong>Price:</strong> $${price}</p>
                    </div>
                </div>
                
                <div class="order-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Analysis Process</h4>
                        <p>We will analyze your website and prepare detailed report within 24-48 hours.</p>
                    </div>
                </div>
                
                <div class="order-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Report Delivery</h4>
                        <p>You will receive comprehensive PDF report via email.</p>
                    </div>
                </div>
                
                <div class="order-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Payment</h4>
                        <p>Pay only after reviewing the report and confirming its value.</p>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="btn btn-primary" id="confirm-order-btn">
                        Confirm Order
                    </button>
                    <button class="btn btn-outline" onclick="MatrixSystem.closeModal()">
                        Cancel
                    </button>
                </div>
            </div>
        `;
        
        this.showModal('Order Process', orderContent, 'large');
        
        // Обработчик подтверждения заказа
        const confirmBtn = document.getElementById('confirm-order-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmOrder(plan, domain, price);
            });
        }
    },
    
    confirmOrder: function(plan, domain, price) {
        console.log('Order confirmed:', { plan, domain, price });
        
        this.showLoading('Processing your order...');
        
        // Симуляция обработки заказа
        setTimeout(() => {
            this.hideLoading();
            this.closeModal();
            
            this.showNotification('Order confirmed! We will start analysis immediately.', 'success');
            
            // Сохраняем заказ
            this.saveOrder(plan, domain, price);
            
            // Показываем инструкции
            this.showOrderInstructions(domain);
            
        }, 2000);
    },
    
    saveOrder: function(plan, domain, price) {
        const order = {
            id: 'ORD-' + Date.now(),
            plan: plan,
            domain: domain,
            price: price,
            date: new Date().toISOString(),
            status: 'processing'
        };
        
        // Сохраняем в localStorage
        try {
            localStorage.setItem('matrix_last_order', JSON.stringify(order));
            console.log('Order saved:', order);
        } catch (error) {
            console.error('Failed to save order:', error);
        }
    },
    
    showOrderInstructions: function(domain) {
        const instructions = `
            <div class="order-instructions">
                <h3>✅ Order Confirmed!</h3>
                
                <div class="instruction-card">
                    <h4>What happens next:</h4>
                    <ol>
                        <li>We are analyzing <strong>${domain}</strong></li>
                        <li>You will receive report within 24-48 hours</li>
                        <li>Review the report and its findings</li>
                        <li>Make payment only if satisfied</li>
                    </ol>
                </div>
                
                <div class="instruction-card">
                    <h4>Next steps:</h4>
                    <p>Check your email for updates. You can also contact us anytime:</p>
                    <p>📧 ${this.config.contactEmail}</p>
                    <p>📱 ${this.config.telegramSupport}</p>
                </div>
                
                <button class="btn btn-primary" onclick="MatrixSystem.closeModal()">
                    Got it!
                </button>
            </div>
        `;
        
        this.showModal('Order Instructions', instructions, 'medium');
    },
    
    // ===== МОДАЛЬНЫЕ ОКНА =====
    showModal: function(title, content, size = 'medium') {
        // Создаем модальное окно
        const modalId = 'system-modal';
        let existingModal = document.getElementById(modalId);
        
        if (existingModal) {
            existingModal.remove();
        }
        
        const sizeClass = `modal-${size}`;
        
        const modalHTML = `
            <div id="${modalId}" class="system-modal">
                <div class="system-modal-overlay"></div>
                <div class="system-modal-content ${sizeClass}">
                    <div class="system-modal-header">
                        <h3>${title}</h3>
                        <button class="system-modal-close" onclick="MatrixSystem.closeModal()">×</button>
                    </div>
                    <div class="system-modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Блокируем скролл
        document.body.style.overflow = 'hidden';
        
        // Показываем с анимацией
        setTimeout(() => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        }, 10);
    },
    
    closeModal: function() {
        const modal = document.querySelector('.system-modal');
        if (modal) {
            modal.classList.remove('active');
            
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
        
        // Также закрываем демо-модалку если открыта
        if (window.DemoCore) {
            window.DemoCore.closeDemo();
        }
    },
    
    // ===== УВЕДОМЛЕНИЯ =====
    showNotification: function(message, type = 'info') {
        const notificationId = 'notification-' + Date.now();
        
        const notificationHTML = `
            <div id="${notificationId}" class="system-notification ${type}">
                <div class="notification-content">
                    <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                    <span class="notification-message">${message}</span>
                </div>
                <button class="notification-close" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', notificationHTML);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            const notification = document.getElementById(notificationId);
            if (notification) {
                notification.remove();
            }
        }, 5000);
    },
    
    getNotificationIcon: function(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        return icons[type] || icons.info;
    },
    
    showError: function(message) {
        this.showNotification(message, 'error');
    },
    
    showSuccess: function(message) {
        this.showNotification(message, 'success');
    },
    
    // ===== ИНДИКАТОР ЗАГРУЗКИ =====
    showLoading: function(message = 'Loading...') {
        const loadingId = 'system-loading';
        let existingLoading = document.getElementById(loadingId);
        
        if (existingLoading) {
            existingLoading.remove();
        }
        
        const loadingHTML = `
            <div id="${loadingId}" class="system-loading">
                <div class="loading-spinner"></div>
                <div class="loading-message">${message}</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
        
        // Блокируем скролл
        document.body.style.overflow = 'hidden';
    },
    
    hideLoading: function() {
        const loading = document.querySelector('.system-loading');
        if (loading) {
            loading.remove();
            document.body.style.overflow = '';
        }
    },
    
    // ===== СОХРАНЕНИЕ И ВОССТАНОВЛЕНИЕ СОСТОЯНИЯ =====
    saveState: function() {
        try {
            localStorage.setItem('matrix_system_state', JSON.stringify(this.state));
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    },
    
    restoreState: function() {
        try {
            const savedState = localStorage.getItem('matrix_system_state');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                this.state = { ...this.state, ...parsedState };
                console.log('State restored');
            }
        } catch (error) {
            console.error('Failed to restore state:', error);
        }
    },
    
    // ===== АНАЛИТИКА =====
    setupAnalytics: function() {
        // Трекинг событий
        this.trackEvent('page_view', {
            page: window.location.pathname,
            referrer: document.referrer
        });
        
        // Трекинг кликов
        document.addEventListener('click', (e) => {
            const target = e.target;
            const buttonText = target.textContent?.trim();
            const elementId = target.id;
            
            if (buttonText || elementId) {
                this.trackEvent('click', {
                    element: elementId || 'button',
                    text: buttonText,
                    href: target.href
                });
            }
        });
    },
    
    trackEvent: function(eventName, properties = {}) {
        if (!this.config.debug) return;
        
        console.log(`📊 Event: ${eventName}`, properties);
        
        // Здесь можно добавить интеграцию с Google Analytics, Yandex.Metrica и т.д.
    },
    
    // ===== НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ =====
    setupEventListeners: function() {
        // Обработка внешних ссылок
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.hostname !== window.location.hostname) {
                e.preventDefault();
                this.trackEvent('external_link_click', { url: link.href });
                window.open(link.href, '_blank');
            }
        });
        
        // Обработка ошибок изображений
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.warn('Image failed to load:', e.target.src);
            }
        }, true);
        
        // Сохранение состояния перед закрытием страницы
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });
    },
    
    // ===== ПРИВЕТСТВЕННОЕ СООБЩЕНИЕ =====
    showWelcomeMessage: function() {
        console.log(`
        ╔══════════════════════════════════════════════╗
        ║         MATRIX DIGITAL HEALTH               ║
        ║         v${this.config.version}                          ║
        ║                                             ║
        ║  Professional Website Diagnosis System      ║
        ║  Ready for Quantum Growth Analysis! 🚀     ║
        ╚══════════════════════════════════════════════╝
        `);
        
        // Показываем приветственное уведомление (только при первом посещении)
        if (!localStorage.getItem('matrix_welcome_shown')) {
            setTimeout(() => {
                this.showNotification('Welcome to Matrix Digital Health! Click any technology card to start analysis.', 'info');
                localStorage.setItem('matrix_welcome_shown', 'true');
            }, 2000);
        }
    },
    
    // ===== ПУБЛИЧНЫЕ МЕТОДЫ =====
    
    // Получить информацию о системе
    getSystemInfo: function() {
        return {
            version: this.config.version,
            initialized: this.state.initialized,
            currentPlan: this.state.currentPlan,
            userDomain: this.state.userDomain
        };
    },
    
    // Сбросить состояние
    resetState: function() {
        this.state = {
            initialized: true,
            currentPlan: null,
            userDomain: null,
            demoOpened: false,
            scrollPosition: 0
        };
        
        this.saveState();
        this.showNotification('System state reset', 'success');
    },
    
    // Экспорт данных
    exportData: function() {
        const data = {
            config: this.config,
            state: this.state,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `matrix-system-backup-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully', 'success');
    },
    
    // Импорт данных
    importData: function(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.config && data.state) {
                this.config = { ...this.config, ...data.config };
                this.state = { ...this.state, ...data.state };
                this.saveState();
                
                this.showNotification('Data imported successfully', 'success');
                return true;
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            this.showError('Failed to import data: ' + error.message);
            return false;
        }
    }
}; // КОНЕЦ ОБЪЕКТА MatrixSystem

// ===== СТИЛИ ДЛЯ СИСТЕМНЫХ КОМПОНЕНТОВ =====
const systemStyles = `
    <style>
        /* СИСТЕМНЫЕ УВЕДОМЛЕНИЯ */
        .system-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 400px;
            background: var(--dark-light);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 16px;
            box-shadow: var(--shadow-lg);
            z-index: 99999;
            animation: notificationSlideIn 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        @keyframes notificationSlideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .system-notification.success {
            border-left: 4px solid var(--success);
        }
        
        .system-notification.error {
            border-left: 4px solid var(--error);
        }
        
        .system-notification.warning {
            border-left: 4px solid var(--warning);
        }
        
        .system-notification.info {
            border-left: 4px solid var(--info);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-grow: 1;
        }
        
        .notification-icon {
            font-size: 20px;
            flex-shrink: 0;
        }
        
        .notification-message {
            color: var(--light);
            font-size: 14px;
            line-height: 1.4;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: var(--gray);
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--light);
        }
        
        /* СИСТЕМНЫЕ МОДАЛЬНЫЕ ОКНА */
        .system-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99998;
            display: none;
        }
        
        .system-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .system-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(5px);
            animation: overlayFadeIn 0.3s ease;
        }
        
        .system-modal-content {
            position: relative;
            background: var(--dark-light);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 1;
            animation: modalFadeIn 0.3s ease;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }
        
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .modal-small {
            width: 90%;
            max-width: 400px;
        }
        
        .modal-medium {
            width: 90%;
            max-width: 600px;
        }
        
        .modal-large {
            width: 90%;
            max-width: 800px;
        }
        
        .system-modal-header {
            padding: 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .system-modal-header h3 {
            margin: 0;
            font-size: 20px;
            color: var(--light);
        }
        
        .system-modal-close {
            background: transparent;
            border: none;
            color: var(--gray);
            font-size: 28px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .system-modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--light);
        }
        
        .system-modal-body {
            padding: 24px;
            overflow-y: auto;
            flex-grow: 1;
        }
        
        /* ИНДИКАТОР ЗАГРУЗКИ */
        .system-loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 99997;
            gap: 20px;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: loadingSpin 1s linear infinite;
        }
        
        @keyframes loadingSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-message {
            color: var(--light);
            font-size: 16px;
            font-weight: 500;
        }
        
        /* СТИЛИ ДЛЯ ПРОЦЕССА ЗАКАЗА */
        .order-process {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .order-step {
            display: flex;
            gap: 16px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            opacity: 0.6;
            transition: all 0.3s ease;
        }
        
        .order-step.active {
            opacity: 1;
            border-color: var(--primary);
            background: rgba(0, 220, 130, 0.05);
        }
        
        .step-number {
            width: 32px;
            height: 32px;
            background: var(--gradient-primary);
            color: var(--darker);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
        }
        
        .step-content {
            flex-grow: 1;
        }
        
        .step-content h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            color: var(--light);
        }
        
        .step-content p {
            margin: 4px 0;
            color: var(--gray);
            font-size: 14px;
        }
        
        .order-actions {
            display: flex;
            gap: 12px;
            margin-top: 24px;
            justify-content: flex-end;
        }
        
        /* СТИЛИ ДЛЯ ВЫБОРА ПЛАНА */
        .plan-selection-modal {
            padding: 20px;
        }
        
        .plan-selection-modal h3 {
            text-align: center;
            margin-bottom: 30px;
            color: var(--light);
        }
        
        .plan-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 30px;
        }
        
        .plan-option {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 24px 16px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .plan-option:hover {
            transform: translateY(-4px);
            border-color: var(--primary);
        }
        
        .plan-option.featured {
            border: 2px solid var(--primary);
            position: relative;
        }
        
        .plan-option h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            color: var(--light);
        }
        
        .plan-price {
            font-size: 28px;
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 12px 0;
        }
        
        .plan-option p {
            color: var(--gray);
            font-size: 13px;
            margin: 8px 0 16px;
            line-height: 1.4;
        }
        
        /* СТИЛИ ДЛЯ ИНСТРУКЦИЙ */
        .order-instructions {
            padding: 20px;
        }
        
        .order-instructions h3 {
            text-align: center;
            margin-bottom: 24px;
            color: var(--light);
        }
        
        .instruction-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 20px;
            margin-bottom: 16px;
        }
        
        .instruction-card h4 {
            margin: 0 0 12px 0;
            color: var(--primary);
            font-size: 16px;
        }
        
        .instruction-card ol {
            padding-left: 20px;
            margin: 12px 0;
        }
        
        .instruction-card li {
            color: var(--gray);
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .instruction-card p {
            color: var(--gray);
            margin: 8px 0;
            line-height: 1.5;
        }
        
        /* СТИЛИ ДЛЯ ПРИМЕРА ОТЧЕТА */
        .sample-report {
            padding: 20px;
        }
        
        .sample-report h3 {
            text-align: center;
            margin-bottom: 24px;
            color: var(--light);
        }
        
        .sample-section {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 20px;
            margin-bottom: 16px;
        }
        
        .sample-section h4 {
            margin: 0 0 12px 0;
            color: var(--primary);
            font-size: 16px;
        }
        
        .sample-section ul {
            padding-left: 20px;
            margin: 12px 0;
        }
        
        .sample-section li {
            color: var(--gray);
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .sample-report .btn {
            display: block;
            margin: 24px auto 0;
        }
        
        /* АДАПТИВНОСТЬ */
        @media (max-width: 768px) {
            .system-notification {
                left: 20px;
                right: 20px;
                max-width: none;
            }
            
            .plan-options {
                grid-template-columns: 1fr;
            }
            
            .order-actions {
                flex-direction: column;
            }
            
            .order-actions .btn {
                width: 100%;
            }
        }
    </style>
`;

// ===== ДОБАВЛЯЕМ СТИЛИ В ДОКУМЕНТ =====
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#system-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'system-styles';
        styleElement.textContent = systemStyles;
        document.head.appendChild(styleElement);
    }
});

// ===== ОБЪЕКТ ДЛЯ РАБОТЫ С ДЕМО-СИСТЕМОЙ =====
// Этот объект будет расширен в demo-core.js
window.DemoCore = {
    init: function() {
        console.log('DemoCore placeholder initialized');
        return this;
    },
    
    openTechDemo: function(techId, domain) {
        console.log('Opening demo for:', techId, domain);
        MatrixSystem.showNotification('Demo system loading...', 'info');
    },
    
    closeDemo: function() {
        console.log('Closing demo');
    }
};

// ===== FINAL INITIALIZATION =====
(function() {
    // Ждем полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSystem);
    } else {
        initializeSystem();
    }
    
    function initializeSystem() {
        // Инициализация основной системы
        if (typeof MatrixSystem !== 'undefined') {
            setTimeout(() => {
                MatrixSystem.init();
                
                // Создаем глобальную ссылку для отладки
                if (typeof window !== 'undefined') {
                    window.$M = MatrixSystem;
                    console.log('💎 Matrix System доступен как window.$M');
                    console.log('🔧 Используйте $M.debugMatrix() для отладки');
                }
            }, 100);
        }
        
        // Инициализация демо-системы
        if (typeof DemoCore !== 'undefined') {
            setTimeout(() => {
                DemoCore.init();
            }, 200);
        }
    }
})();

// ===== ГЛОБАЛЬНЫЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Копирует текст в буфер обмена
 * @param {string} text - Текст для копирования
 * @returns {Promise<boolean>}
 */
window.copyToClipboard = function(text) {
    return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        });
};

/**
 * Показывает простое уведомление
 * @param {string} message - Сообщение
 * @param {string} type - Тип (success, error, warning, info)
 */
window.showToast = function(message, type = 'info') {
    if (typeof MatrixSystem !== 'undefined' && MatrixSystem.showNotification) {
        MatrixSystem.showNotification(message, type);
    } else {
        // Простой fallback
        alert(`${type.toUpperCase()}: ${message}`);
    }
};

/**
 * Валидирует URL/домен
 * @param {string} url - URL для валидации
 * @returns {string|null} - Очищенный домен или null
 */
window.validateDomain = function(url) {
    try {
        let clean = url.trim()
            .replace(/^https?:\/\//i, '')
            .replace(/\/$/, '')
            .replace(/^www\./i, '');
        
        if (!clean.includes('.') || clean.length < 3) {
            return null;
        }
        
        return clean;
    } catch {
        return null;
    }
};

/**
 * Форматирует сумму в USD
 * @param {number} amount - Сумма
 * @returns {string} - Отформатированная строка
 */
window.formatUSD = function(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

/**
 * Делает асинхронную задержку
 * @param {number} ms - Миллисекунды
 * @returns {Promise<void>}
 */
window.delay = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// ===== ЭКСПОРТ ДЛЯ МОДУЛЬНЫХ СИСТЕМ =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MatrixSystem,
        DemoCore,
        copyToClipboard,
        showToast,
        validateDomain,
        formatUSD,
        delay
    };
}

// ===== ФИНАЛЬНОЕ СООБЩЕНИЕ =====
console.log(`
✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
✨    MATRIX DIGITAL HEALTH SYSTEM   ✨
✨          v1.0.0 LOADED            ✨
✨                                    ✨
✨    Ready for quantum analysis!    ✨
✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
`);

// ===== POLYFILL ДЛЯ СТАРЫХ БРАУЗЕРОВ =====
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

// ===== ОБРАБОТКА КЛАВИШНЫХ СОКРАЩЕНИЙ =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + / для отладки
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (typeof MatrixSystem !== 'undefined') {
            MatrixSystem.showNotification('Debug mode activated', 'info');
            console.log('🔧 Debug Matrix System:', MatrixSystem.getSystemInfo());
        }
    }
    
    // Escape для закрытия модальных окон
    if (e.key === 'Escape') {
        if (typeof MatrixSystem !== 'undefined') {
            MatrixSystem.closeModal();
        }
        if (typeof DemoCore !== 'undefined') {
            DemoCore.closeDemo();
        }
    }
});

// ===== ОБРАБОТКА ONLINE/OFFLINE СОСТОЯНИЙ =====
window.addEventListener('online', function() {
    if (typeof MatrixSystem !== 'undefined') {
        MatrixSystem.showNotification('Connection restored', 'success');
    }
});

window.addEventListener('offline', function() {
    if (typeof MatrixSystem !== 'undefined') {
        MatrixSystem.showNotification('Connection lost', 'warning');
    }
});

// ===== SERVICE WORKER РЕГИСТРАЦИЯ (ЕСЛИ НУЖНО) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// ===== ПРОВЕРКА ВЕРСИЙ =====
const CURRENT_VERSION = '1.0.0';
const STORAGE_KEY = 'matrix_system_version';

try {
    const savedVersion = localStorage.getItem(STORAGE_KEY);
    if (savedVersion && savedVersion !== CURRENT_VERSION) {
        console.log(`🔄 System updated from ${savedVersion} to ${CURRENT_VERSION}`);
        if (typeof MatrixSystem !== 'undefined') {
            MatrixSystem.showNotification(`System updated to v${CURRENT_VERSION}`, 'info');
        }
    }
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
} catch (e) {
    console.warn('Could not check version:', e);
}

// ===== КОНЕЦ ФАЙЛА =====
// Matrix Digital Health System v1.0.0
// © 2025 Gennady Konstantinov
// Все права защищены