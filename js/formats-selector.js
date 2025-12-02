// ============================================
// FORMATS-SELECTOR.JS
// Система выбора формата и заказа
// ============================================

window.FormatSelector = {
    
    // Конфигурация форматов
    formats: {
        'quantum-arch': {
            title: 'Quantum Architecture Audit',
            price: 97,
            delivery: '24-48 hours',
            description: 'Quantum-level website structure analysis'
        },
        'quantum-scan': {
            title: 'Competitor Quantum Scan',
            price: 97,
            delivery: '24-48 hours',
            description: 'Quantum scanning of competitor strategies'
        },
        'quantum-flow': {
            title: 'Conversion Flow Quantum Analysis',
            price: 147,
            delivery: '48 hours',
            description: 'Quantum analysis of conversion pathways'
        },
        'quantum-perf': {
            title: 'Performance Quantum Dashboard',
            price: 197,
            delivery: '24 hours',
            description: 'Real-time quantum performance monitoring'
        },
        'quantum-asset': {
            title: 'Hidden Asset Quantum Discovery',
            price: 247,
            delivery: '72 hours',
            description: 'Quantum discovery of hidden opportunities'
        },
        'quantum-audit': {
            title: 'Marketing Efficiency Quantum Audit',
            price: 297,
            delivery: '48 hours',
            description: 'Quantum audit of marketing efficiency'
        },
        'quantum-gap': {
            title: 'Performance Gap Quantum Analysis',
            price: 347,
            delivery: '72 hours',
            description: 'Quantum analysis of performance gaps'
        },
        'quantum-growth': {
            title: 'Quantum Growth Roadmap',
            price: 397,
            delivery: '48 hours',
            description: 'Quantum-powered 90-day growth strategy'
        },
        'quantum-sprint': {
            title: 'Quantum Strategy Sprint',
            price: 497,
            delivery: '48 hours',
            description: '48-hour quantum strategy development'
        },
        'quantum-transform': {
            title: 'Quantum Marketing Transformation',
            price: 997,
            delivery: '7 days',
            description: '7-day quantum marketing transformation'
        }
    },
    
    // Инициализация
    init: function() {
        console.log('🎯 Format Selector initialized');
        this.setupEventListeners();
        this.setupModalStyles();
    },
    
    // Настройка обработчиков событий
    setupEventListeners: function() {
        // Кнопки выбора формата
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-format-select')) {
                const formatId = e.target.dataset.format;
                this.selectFormat(formatId);
            }
        });
        
        // Главная кнопка "Choose Analysis Format"
        const chooseBtn = document.getElementById('choose-format-btn');
        if (chooseBtn) {
            chooseBtn.addEventListener('click', () => {
                document.querySelector('#formats')?.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        // Кнопка "View Sample Reports"
        const samplesBtn = document.getElementById('view-samples-btn');
        if (samplesBtn) {
            samplesBtn.addEventListener('click', () => {
                document.querySelector('#samples')?.scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        // Кнопка копирования USDT адреса
        const copyBtn = document.getElementById('copy-address-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', this.copyUSDTAddress);
        }
    },
    
    // Выбор формата
    selectFormat: function(formatId) {
        const format = this.formats[formatId];
        if (!format) {
            console.error('Format not found:', formatId);
            return;
        }
        
        console.log('📋 Selected format:', format.title);
        this.showOrderModal(formatId, format);
    },
    
    // Показать модальное окно заказа
    showOrderModal: function(formatId, format) {
        // Удаляем старую модалку если есть
        this.removeExistingModal();
        
        // Создаем HTML модалки
        const modalHTML = `
            <div id="order-modal" class="order-modal">
                <div class="order-modal-overlay" id="close-order-modal"></div>
                <div class="order-modal-content">
                    <button class="order-modal-close" id="close-order-btn">×</button>
                    
                    <div class="order-header">
                        <h2>Order: ${format.title}</h2>
                        <div class="order-price">$${format.price}</div>
                    </div>
                    
                    <div class="order-description">
                        <p>${format.description}</p>
                        <p><strong>Delivery:</strong> ${format.delivery}</p>
                    </div>
                    
                    <form id="order-form" class="order-form">
                        <div class="form-group">
                            <label for="client-name">Your Name *</label>
                            <input type="text" id="client-name" required 
                                   placeholder="John Smith">
                        </div>
                        
                        <div class="form-group">
                            <label for="client-email">Email Address *</label>
                            <input type="email" id="client-email" required 
                                   placeholder="your@email.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="website-url">Website URL *</label>
                            <input type="url" id="website-url" required 
                                   placeholder="https://example.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="additional-info">Additional Information</label>
                            <textarea id="additional-info" rows="3"
                                      placeholder="Specific requirements, competitor URLs, target audience, etc."></textarea>
                        </div>
                        
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="agree-terms" required>
                            <label for="agree-terms">
                                I understand that payment ($${format.price} in USDT) is made only after delivery of the website analysis presentation.
                            </label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" id="cancel-order">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Submit Order Request
                            </button>
                        </div>
                    </form>
                    
                    <div class="order-note">
                        <p>💡 <strong>Process:</strong> After submission, analysis is conducted → interactive presentation is provided → payment is made after review.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Вставляем модалку в контейнер
        const container = document.getElementById('modal-container') || document.body;
        container.insertAdjacentHTML('beforeend', modalHTML);
        
        // Настраиваем обработчики модалки
        this.setupModalEvents(formatId);
    },
    
    // Удалить существующую модалку
    removeExistingModal: function() {
        const existingModal = document.getElementById('order-modal');
        if (existingModal) {
            existingModal.remove();
        }
    },
    
    // Настройка событий модалки
    setupModalEvents: function(formatId) {
        // Функция закрытия модалки
        const closeModal = () => {
            this.removeExistingModal();
        };
        
        // Обработчики закрытия
        document.getElementById('close-order-modal').addEventListener('click', closeModal);
        document.getElementById('close-order-btn').addEventListener('click', closeModal);
        document.getElementById('cancel-order').addEventListener('click', closeModal);
        
        // Обработка формы
        document.getElementById('order-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitOrder(formatId);
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('order-modal')) {
                closeModal();
            }
        });
    },
    
    // Отправка заказа
    submitOrder: function(formatId) {
        const form = document.getElementById('order-form');
        const format = this.formats[formatId];
        
        // Собираем данные
        const orderData = {
            format: formatId,
            formatName: format.title,
            price: format.price,
            delivery: format.delivery,
            timestamp: new Date().toISOString(),
            client: {
                name: document.getElementById('client-name').value.trim(),
                email: document.getElementById('client-email').value.trim(),
                website: document.getElementById('website-url').value.trim(),
                additional: document.getElementById('additional-info').value.trim()
            }
        };
        
        // Простая валидация
        if (!this.validateOrderData(orderData)) {
            return;
        }
        
        // Показываем индикатор загрузки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Имитация отправки (в реальности здесь будет fetch/axios)
        setTimeout(() => {
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Показываем успешное сообщение
            this.showSuccessMessage(orderData);
            
            // Закрываем модалку
            this.removeExistingModal();
            
            // Логируем в консоль (для отладки)
            console.log('📦 Order submitted:', orderData);
            
            // Здесь можно добавить отправку на сервер:
            // this.sendToServer(orderData);
            
        }, 1500);
    },
    
    // Валидация данных заказа
    validateOrderData: function(data) {
        const errors = [];
        
        if (!data.client.name || data.client.name.length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!data.client.email || !this.isValidEmail(data.client.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.client.website || !this.isValidUrl(data.client.website)) {
            errors.push('Please enter a valid website URL');
        }
        
        if (errors.length > 0) {
            this.showValidationError(errors.join('. '));
            return false;
        }
        
        return true;
    },
    
    // Проверка email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Проверка URL
    isValidUrl: function(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    },
    
    // Показать ошибку валидации
    showValidationError: function(message) {
        // Удаляем старую ошибку если есть
        const oldError = document.querySelector('.validation-error');
        if (oldError) oldError.remove();
        
        // Создаем элемент ошибки
        const errorHTML = `
            <div class="validation-error" style="
                background: #fef2f2;
                border: 1px solid #fca5a5;
                color: #dc2626;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
                font-size: 14px;
            ">
                ⚠️ ${message}
            </div>
        `;
        
        // Вставляем перед формой
        const form = document.getElementById('order-form');
        form.insertAdjacentHTML('afterbegin', errorHTML);
        
        // Автоудаление через 5 секунд
        setTimeout(() => {
            const error = document.querySelector('.validation-error');
            if (error) error.remove();
        }, 5000);
    },
    
    // Показать сообщение об успехе
    showSuccessMessage: function(orderData) {
        // Создаем HTML сообщения
        const messageHTML = `
            <div id="success-message" class="success-message">
                <div class="success-content">
                    <div class="success-icon">✅</div>
                    <h3>Order Request Submitted Successfully!</h3>
                    <p>Thank you, <strong>${orderData.client.name}</strong>!</p>
                    <p>Your request for <strong>${orderData.formatName}</strong> has been received.</p>
                    <p><strong>Website:</strong> ${orderData.client.website}</p>
                    <p><strong>Delivery timeframe:</strong> ${orderData.delivery}</p>
                    <p>We will contact you at <strong>${orderData.client.email}</strong> when the analysis presentation is ready for review.</p>
                    <button class="btn btn-primary" onclick="document.getElementById('success-message').remove()">
                        Got it!
                    </button>
                </div>
            </div>
        `;
        
        // Вставляем сообщение
        document.body.insertAdjacentHTML('beforeend', messageHTML);
    },
    
    // Копирование USDT адреса
    copyUSDTAddress: function() {
        const address = document.getElementById('usdt-address').textContent;
        
        // Используем Clipboard API
        navigator.clipboard.writeText(address).then(() => {
            // Показываем подтверждение
            const originalText = document.getElementById('copy-address-btn').textContent;
            document.getElementById('copy-address-btn').textContent = 'Copied!';
            document.getElementById('copy-address-btn').style.background = '#00dc82';
            document.getElementById('copy-address-btn').style.color = '#0f172a';
            
            // Возвращаем исходный текст через 2 секунды
            setTimeout(() => {
                document.getElementById('copy-address-btn').textContent = originalText;
                document.getElementById('copy-address-btn').style.background = '';
                document.getElementById('copy-address-btn').style.color = '';
            }, 2000);
            
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Please copy the address manually: ' + address);
        });
    },
    
    // Настройка стилей модалки (если их нет в CSS)
    setupModalStyles: function() {
        // Проверяем, есть ли уже стили
        if (document.querySelector('#order-modal-styles')) {
            return;
        }
        
        const styles = `
            <style id="order-modal-styles">
            .order-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .order-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(8px);
            }
            
            .order-modal-content {
                position: relative;
                background: #0f172a;
                border-radius: 24px;
                border: 1px solid #334155;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                z-index: 10001;
                padding: 40px;
                width: 100%;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                animation: slideUp 0.4s ease;
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .order-modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: #ef4444;
                color: white;
                border: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .order-modal-close:hover {
                background: #dc2626;
                transform: scale(1.1);
            }
            
            .order-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid #334155;
            }
            
            .order-header h2 {
                color: #00dc82;
                margin-bottom: 10px;
                font-size: 28px;
            }
            
            .order-price {
                font-size: 32px;
                color: #00dc82;
                font-weight: 800;
                margin-top: 10px;
            }
            
            .order-description {
                background: rgba(0, 220, 130, 0.1);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 30px;
                border-left: 4px solid #00dc82;
            }
            
            .order-description p {
                color: #cbd5e1;
                margin: 5px 0;
            }
            
            .order-form .form-group {
                margin-bottom: 20px;
            }
            
            .order-form label {
                display: block;
                color: #cbd5e1;
                margin-bottom: 8px;
                font-weight: 500;
                font-size: 14px;
            }
            
            .order-form input,
            .order-form textarea {
                width: 100%;
                padding: 14px 16px;
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 12px;
                color: white;
                font-size: 16px;
                transition: all 0.3s ease;
                font-family: inherit;
            }
            
            .order-form input:focus,
            .order-form textarea:focus {
                outline: none;
                border-color: #00dc82;
                box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.1);
            }
            
            .checkbox-group {
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
            
            .checkbox-group input {
                width: auto;
                margin-top: 5px;
            }
            
            .checkbox-group label {
                font-size: 13px;
                color: #94a3b8;
                line-height: 1.5;
            }
            
            .form-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            .btn {
                padding: 14px 28px;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                flex: 1;
                border: none;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #00dc82, #00c2ff);
                color: #0f172a;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 220, 130, 0.3);
            }
            
            .btn-outline {
                background: transparent;
                border: 2px solid #64748b;
                color: #64748b;
            }
            
            .btn-outline:hover {
                border-color: #00dc82;
                color: #00dc82;
            }
            
            .order-note {
                margin-top: 30px;
                padding: 15px;
                background: rgba(0, 194, 255, 0.1);
                border-radius: 12px;
                border-left: 4px solid #00c2ff;
            }
            
            .order-note p {
                color: #cbd5e1;
                font-size: 14px;
                margin: 0;
                line-height: 1.5;
            }
            
            .success-message {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10002;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            .success-content {
                background: #0f172a;
                border-radius: 24px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                border: 2px solid #00dc82;
                animation: slideUp 0.4s ease;
            }
            
            .success-icon {
                font-size: 60px;
                margin-bottom: 20px;
            }
            
            .success-content h3 {
                color: #00dc82;
                margin-bottom: 15px;
                font-size: 24px;
            }
            
            .success-content p {
                color: #cbd5e1;
                margin-bottom: 10px;
                line-height: 1.5;
            }
            
            @media (max-width: 768px) {
                .order-modal-content {
                    padding: 25px;
                    max-height: 95vh;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .success-content {
                    padding: 25px;
                }
            }
            </style>
        `;
        
        // Добавляем стили в head
        document.head.insertAdjacentHTML('beforeend', styles);
    },
    
    // Отправка на сервер (заглушка для будущей реализации)
    sendToServer: function(orderData) {
        // В будущем здесь будет fetch/axios запрос
        console.log('📤 Would send to server:', orderData);
        /*
        fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => console.log('Server response:', data))
        .catch(error => console.error('Error:', error));
        */
    }
};

// Инициализация при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    FormatSelector.init();
    console.log('✅ Format Selector ready');
});

// Экспорт для глобального доступа
window.formatSelector = FormatSelector;