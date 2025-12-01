/**
 * ============================================
 * MATRIX DIGITAL HEALTH - DEMO CORE SYSTEM
 * Version: 1.0.0 | Author: Gennady Konstantinov
 * ============================================
 */

// ===== ГЛОБАЛЬНЫЙ ОБЪЕКТ ДЕМО-СИСТЕМЫ =====
window.DemoCore = (function() {
    
    // ===== ПРИВАТНЫЕ ПЕРЕМЕННЫЕ =====
    let demoModal = null;
    let currentDemo = null;
    let demoData = {};
    let isGenerating = false;
    
    // ===== КОНФИГУРАЦИЯ ДЕМО-СИСТЕМЫ =====
    const config = {
        version: '1.0.0',
        demoDuration: 24, // Часы доступности демо
        maxDemosPerDay: 10,
        cacheDuration: 3600000, // 1 час в миллисекундах
        techData: {
            immunity: {
                name: 'Website Immunity Audit',
                icon: '🛡️',
                color: '#00dc82',
                description: 'Security, stability & performance analysis',
                price: 97
            },
            seo: {
                name: 'SEO-DNA Analysis',
                icon: '🧬',
                color: '#00c2ff',
                description: 'Search optimization genetics decoding',
                price: 97
            },
            traffic: {
                name: 'Traffic Metabolism',
                icon: '💸',
                color: '#f59e0b',
                description: 'Conversion flow & leakage diagnosis',
                price: 97
            },
            competitive: {
                name: 'Competitive Genome',
                icon: '🥊',
                color: '#ef4444',
                description: 'Market leaders DNA decoding',
                price: 97
            },
            growth: {
                name: 'Growth Scenario',
                icon: '📈',
                color: '#10b981',
                description: 'Personal scaling roadmap',
                price: 97
            }
        }
    };
    
    // ===== ТЕХНОЛОГИЧЕСКИЕ ШАБЛОНЫ =====
    const techTemplates = {
        immunity: {
            metrics: ['performance', 'security', 'stability', 'reliability'],
            issues: [
                { name: 'Slow Page Load Time', severity: 'high', impact: 'User experience degradation' },
                { name: 'SSL Certificate Issues', severity: 'critical', impact: 'Security vulnerabilities' },
                { name: 'Browser Caching Not Configured', severity: 'medium', impact: 'Performance loss' },
                { name: 'Mixed Content Warnings', severity: 'high', impact: 'Security warnings for users' },
                { name: 'Unoptimized Images', severity: 'medium', impact: 'Bandwidth waste' }
            ],
            recommendations: [
                'Implement image compression and lazy loading',
                'Configure proper cache headers',
                'Update SSL configuration',
                'Enable HTTP/2 protocol',
                'Optimize CSS and JavaScript delivery'
            ]
        },
        seo: {
            metrics: ['visibility', 'relevance', 'authority', 'technical'],
            issues: [
                { name: 'Poor Mobile Optimization', severity: 'high', impact: 'Search ranking penalty' },
                { name: 'Missing Meta Descriptions', severity: 'medium', impact: 'Low click-through rate' },
                { name: 'Duplicate Content', severity: 'critical', impact: 'SEO cannibalization' },
                { name: 'Broken Internal Links', severity: 'medium', impact: 'Crawl budget waste' },
                { name: 'Slow Core Web Vitals', severity: 'high', impact: 'Ranking factor reduction' }
            ],
            recommendations: [
                'Implement responsive design improvements',
                'Create unique meta descriptions for key pages',
                'Consolidate duplicate content',
                'Fix broken links and improve internal linking',
                'Optimize Core Web Vitals scores'
            ]
        },
        traffic: {
            metrics: ['conversion', 'engagement', 'retention', 'acquisition'],
            issues: [
                { name: 'High Bounce Rate', severity: 'high', impact: 'Visitor retention loss' },
                { name: 'Poor Mobile Conversion', severity: 'critical', impact: 'Revenue leakage' },
                { name: 'Ineffective CTAs', severity: 'medium', impact: 'Low conversion rate' },
                { name: 'Complex Checkout Process', severity: 'high', impact: 'Cart abandonment' },
                { name: 'Missing Analytics Tracking', severity: 'medium', impact: 'Data blindness' }
            ],
            recommendations: [
                'Simplify user journey and reduce steps',
                'Optimize mobile user experience',
                'Improve call-to-action design and placement',
                'Streamline checkout process',
                'Implement comprehensive analytics tracking'
            ]
        },
        competitive: {
            metrics: ['market_share', 'differentiation', 'innovation', 'positioning'],
            issues: [
                { name: 'Lack of Unique Value Proposition', severity: 'critical', impact: 'Poor market positioning' },
                { name: 'Inferior Content Quality', severity: 'high', impact: 'Lower authority' },
                { name: 'Missing Key Features', severity: 'medium', impact: 'Competitive disadvantage' },
                { name: 'Poor Brand Differentiation', severity: 'high', impact: 'Commoditization' },
                { name: 'Ineffective Pricing Strategy', severity: 'medium', impact: 'Revenue optimization loss' }
            ],
            recommendations: [
                'Develop unique value proposition',
                'Create superior content strategy',
                'Implement missing key features',
                'Strengthen brand differentiation',
                'Optimize pricing strategy based on competitors'
            ]
        },
        growth: {
            metrics: ['roi', 'scalability', 'efficiency', 'potential'],
            issues: [
                { name: 'Limited Scalability Architecture', severity: 'high', impact: 'Growth bottlenecks' },
                { name: 'Inefficient Resource Allocation', severity: 'medium', impact: 'Wasted investment' },
                { name: 'Missing Automation Systems', severity: 'high', impact: 'Operational inefficiency' },
                { name: 'Poor Data-Driven Decision Making', severity: 'critical', impact: 'Strategic blindness' },
                { name: 'Inadequate Performance Tracking', severity: 'medium', impact: 'Progress uncertainty' }
            ],
            recommendations: [
                'Implement scalable architecture improvements',
                'Optimize resource allocation based on ROI',
                'Automate repetitive processes',
                'Establish data-driven decision framework',
                'Implement comprehensive KPI tracking'
            ]
        }
    };
    
    // ===== ПУБЛИЧНЫЕ МЕТОДЫ =====
    return {
        
        // ===== ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ =====
        init: function() {
            console.log('🚀 Initializing Demo Core System v' + config.version);
            
            try {
                this.setupDemoModal();
                this.setupEventListeners();
                this.loadDemoCache();
                
                console.log('✅ Demo Core System initialized');
                this.showWelcomeMessage();
                
                return this;
                
            } catch (error) {
                console.error('❌ Demo Core initialization failed:', error);
                return null;
            }
        },
        
        // ===== НАСТРОЙКА ДЕМО-МОДАЛКИ =====
        setupDemoModal: function() {
            // Создаем HTML структуру демо-модалки
            const modalHTML = `
                <div id="demo-core-modal" class="demo-modal">
                    <div class="demo-modal-overlay"></div>
                    <div class="demo-modal-content">
                        <button class="demo-modal-close" id="demo-close-btn">×</button>
                        <div id="demo-content"></div>
                    </div>
                </div>
                
                <div id="demo-loading" class="demo-loading">
                    <div class="loading-content">
                        <div class="demo-loading-spinner"></div>
                        <p class="demo-loading-text">Generating personalized analysis...</p>
                        <div class="demo-generation-progress">
                            <div class="demo-progress-bar">
                                <div class="demo-progress-fill"></div>
                            </div>
                            <div class="demo-progress-text">
                                <span class="progress-current">0%</span>
                                <span class="progress-total">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Добавляем в DOM если еще нет
            if (!document.getElementById('demo-core-modal')) {
                document.body.insertAdjacentHTML('beforeend', modalHTML);
            }
            
            demoModal = document.getElementById('demo-core-modal');
        },
        
        // ===== ОТКРЫТИЕ ДЕМО ДЛЯ ТЕХНОЛОГИИ =====
        openTechDemo: function(techId, domain) {
            if (isGenerating) {
                console.warn('Demo generation already in progress');
                return;
            }
            
            if (!config.techData[techId]) {
                this.showError('Invalid technology selected');
                return;
            }
            
            if (!domain || domain.trim() === '') {
                this.showError('Please provide a valid domain');
                return;
            }
            
            currentDemo = {
                techId: techId,
                domain: domain,
                timestamp: Date.now()
            };
            
            // Проверяем лимиты
            if (!this.checkDemoLimits()) {
                this.showError('Daily demo limit reached. Please try again tomorrow.');
                return;
            }
            
            // Начинаем генерацию демо
            this.startDemoGeneration(techId, domain);
        },
        
        // ===== ГЕНЕРАЦИЯ ДЕМО-ОТЧЕТА =====
        startDemoGeneration: function(techId, domain) {
            isGenerating = true;
            
            // Показываем индикатор загрузки
            this.showLoading();
            
            // Симулируем процесс генерации с прогрессом
            this.simulateGenerationProgress()
                .then(() => {
                    // Генерируем данные демо
                    const demoData = this.generateDemoData(techId, domain);
                    
                    // Скрываем индикатор загрузки
                    this.hideLoading();
                    
                    // Показываем демо
                    this.displayDemo(demoData);
                    
                    // Сохраняем в кэш
                    this.saveDemoToCache(techId, domain, demoData);
                    
                    // Обновляем счетчик демо
                    this.updateDemoCounter();
                    
                    isGenerating = false;
                })
                .catch(error => {
                    console.error('Demo generation failed:', error);
                    this.hideLoading();
                    this.showError('Failed to generate demo. Please try again.');
                    isGenerating = false;
                });
        },
        
        // ===== СИМУЛЯЦИЯ ПРОГРЕССА ГЕНЕРАЦИИ =====
        simulateGenerationProgress: function() {
            return new Promise((resolve) => {
                let progress = 0;
                const progressBar = document.querySelector('.demo-progress-fill');
                const progressText = document.querySelector('.progress-current');
                
                const interval = setInterval(() => {
                    progress += Math.random() * 15 + 5;
                    if (progress > 100) progress = 100;
                    
                    if (progressBar) {
                        progressBar.style.width = progress + '%';
                    }
                    
                    if (progressText) {
                        progressText.textContent = Math.round(progress) + '%';
                    }
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(resolve, 500);
                    }
                }, 200);
            });
        },
        
        // ===== ГЕНЕРАЦИЯ ДАННЫХ ДЕМО =====
        generateDemoData: function(techId, domain) {
            const techConfig = config.techData[techId];
            const template = techTemplates[techId];
            
            if (!techConfig || !template) {
                throw new Error('Invalid technology configuration');
            }
            
            // Генерируем уникальные данные на основе домена
            const domainHash = this.hashString(domain);
            const randomSeed = parseInt(domainHash.substring(0, 8), 16);
            
            // Генерация Health Score (60-90)
            const healthScore = 60 + (randomSeed % 31);
            
            // Генерация метрик
            const metrics = {};
            template.metrics.forEach((metric, index) => {
                const baseScore = 50 + (randomSeed % 46);
                const variation = (randomSeed % 21) - 10;
                metrics[metric] = Math.max(20, Math.min(100, baseScore + variation + (index * 5)));
            });
            
            // Выбор случайных проблем (3-5 штук)
            const selectedIssues = [...template.issues]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3 + (randomSeed % 3));
            
            // Выбор случайных рекомендаций (3-4 штуки)
            const selectedRecommendations = [...template.recommendations]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3 + (randomSeed % 2));
            
            // Расчет потенциального эффекта
            const monthlyLoss = 500 + (randomSeed % 4500);
            const improvementPotential = 20 + (randomSeed % 50);
            const potentialGrowth = Math.round(monthlyLoss * (improvementPotential / 100));
            const roiPotential = 100 + (randomSeed % 400);
            
            return {
                techId: techId,
                domain: domain,
                techConfig: techConfig,
                healthScore: healthScore,
                metrics: metrics,
                issues: selectedIssues,
                recommendations: selectedRecommendations,
                monthlyLoss: monthlyLoss,
                improvementPotential: improvementPotential,
                potentialGrowth: potentialGrowth,
                roiPotential: roiPotential,
                generatedAt: new Date().toISOString(),
                demoId: 'DEMO-' + Date.now() + '-' + techId.toUpperCase()
            };
        },
        
        // ===== ОТОБРАЖЕНИЕ ДЕМО =====
        displayDemo: function(demoData) {
            if (!demoModal) {
                this.setupDemoModal();
            }
            
            // Генерируем HTML контент
            const demoHTML = this.generateDemoHTML(demoData);
            
            // Вставляем контент
            const demoContent = document.getElementById('demo-content');
            if (demoContent) {
                demoContent.innerHTML = demoHTML;
            }
            
            // Показываем модалку
            demoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Добавляем обработчики для кнопок внутри демо
            this.setupDemoButtons(demoData);
            
            // Запускаем анимации
            this.animateDemoContent();
            
            // Логируем просмотр демо
            this.logDemoView(demoData);
        },
        
        // ===== ГЕНЕРАЦИЯ HTML ДЕМО =====
        generateDemoHTML: function(data) {
            const tech = data.techConfig;
            
            return `
                <!-- Заголовок демо -->
                <div class="demo-header">
                    <div class="demo-title-section">
                        <div class="demo-tech-icon">${tech.icon}</div>
                        <div class="demo-title-content">
                            <h2>${tech.name} - DEMO</h2>
                            <div class="demo-subtitle">${tech.description}</div>
                        </div>
                    </div>
                    
                    <div class="demo-domain-info">
                        <span class="demo-domain-label">Domain:</span>
                        <span class="demo-domain-value">${data.domain}</span>
                        <span class="demo-demo-id">${data.demoId}</span>
                    </div>
                    
                    <div class="demo-warning-banner">
                        <span class="demo-warning-icon">⚠️</span>
                        <span class="demo-warning-text">
                            This is a preview version. Full report contains complete analysis with detailed implementation steps.
                        </span>
                    </div>
                </div>
                
                <!-- Основной контент демо -->
                <div class="demo-body">
                    <div class="demo-scroll-content">
                        
                        <!-- Секция Health Score -->
                        <div class="demo-score-section">
                            <div class="demo-score-header">
                                <h3 class="demo-score-title">Website Health Score</h3>
                                <div class="demo-score-badge">${data.healthScore}/100</div>
                            </div>
                            
                            <div class="demo-score-visual">
                                <div class="demo-score-bar">
                                    <div class="demo-score-fill" style="width: ${data.healthScore}%"></div>
                                </div>
                                <div class="demo-score-labels">
                                    <span>Poor</span>
                                    <span>Excellent</span>
                                </div>
                            </div>
                            
                            <div class="demo-score-breakdown">
                                ${Object.entries(data.metrics).map(([name, value]) => `
                                    <div class="demo-metric">
                                        <div class="demo-metric-name">
                                            <span>${this.formatMetricName(name)}</span>
                                        </div>
                                        <div class="demo-metric-value">${Math.round(value)}%</div>
                                        <div class="demo-metric-bar">
                                            <div class="demo-metric-fill" style="width: ${value}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Секция критических проблем -->
                        <div class="demo-issues-section">
                            <h3 class="demo-section-title">
                                <span>⚠️</span>
                                Critical Issues Detected
                            </h3>
                            
                            <div class="demo-issues-grid">
                                ${data.issues.map((issue, index) => `
                                    <div class="demo-issue-card ${issue.severity}">
                                        <div class="demo-issue-header">
                                            <h4 class="demo-issue-title">${issue.name}</h4>
                                            <span class="demo-issue-severity">${issue.severity}</span>
                                        </div>
                                        <p class="demo-issue-description">${issue.impact}</p>
                                        <div class="demo-issue-impact">
                                            <span>Impact:</span>
                                            <strong>${this.getImpactLevel(issue.severity)}</strong>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Секция потенциального эффекта -->
                        <div class="demo-impact-section">
                            <h3 class="demo-section-title">
                                <span>💰</span>
                                Potential Financial Impact
                            </h3>
                            
                            <div class="demo-impact-stats">
                                <div class="demo-impact-stat">
                                    <div class="demo-impact-value">$${data.monthlyLoss}</div>
                                    <div class="demo-impact-label">Estimated monthly loss</div>
                                </div>
                                
                                <div class="demo-impact-stat">
                                    <div class="demo-impact-value">${data.improvementPotential}%</div>
                                    <div class="demo-impact-label">Improvement potential</div>
                                </div>
                                
                                <div class="demo-impact-stat">
                                    <div class="demo-impact-value">$${data.potentialGrowth}</div>
                                    <div class="demo-impact-label">Monthly growth potential</div>
                                </div>
                                
                                <div class="demo-impact-stat">
                                    <div class="demo-impact-value">${data.roiPotential}%</div>
                                    <div class="demo-impact-label">ROI potential</div>
                                </div>
                            </div>
                            
                            <div class="demo-roi-calculation">
                                <h4 class="demo-roi-title">
                                    <span>📊</span>
                                    ROI Calculation Example
                                </h4>
                                <div class="demo-roi-grid">
                                    <div class="demo-roi-item">
                                        <span class="demo-roi-label">Investment (this report)</span>
                                        <span class="demo-roi-value">$${tech.price}</span>
                                    </div>
                                    <div class="demo-roi-item">
                                        <span class="demo-roi-label">Monthly return</span>
                                        <span class="demo-roi-value">$${data.potentialGrowth}</span>
                                    </div>
                                    <div class="demo-roi-item">
                                        <span class="demo-roi-label">Payback period</span>
                                        <span class="demo-roi-value">~1 month</span>
                                    </div>
                                    <div class="demo-roi-item">
                                        <span class="demo-roi-label">Annual ROI</span>
                                        <span class="demo-roi-value">${data.roiPotential}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Секция рекомендаций -->
                        <div class="demo-recommendations-section">
                            <h3 class="demo-section-title">
                                <span>🎯</span>
                                Priority Recommendations
                            </h3>
                            
                            <div class="demo-recommendations-list">
                                ${data.recommendations.map((rec, index) => `
                                    <div class="demo-recommendation-item">
                                        <div class="demo-recommendation-number">${index + 1}</div>
                                        <div class="demo-recommendation-content">
                                            <h4 class="demo-recommendation-title">${rec}</h4>
                                            <div class="demo-recommendation-priority ${index < 2 ? 'high' : 'medium'}">
                                                <span>${index < 2 ? 'High Priority' : 'Medium Priority'}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Что включено в полный отчет -->
                        <div class="demo-full-report-section">
                            <h3 class="demo-full-report-title">
                                <span>📋</span>
                                What's Included in Full Report
                            </h3>
                            
                            <div class="demo-features-grid">
                                <div class="demo-feature-item">
                                    <div class="demo-feature-icon">📊</div>
                                    <div class="demo-feature-text">
                                        <div class="demo-feature-name">Complete Technical Analysis</div>
                                        <div class="demo-feature-description">50+ pages of detailed insights</div>
                                    </div>
                                </div>
                                
                                <div class="demo-feature-item">
                                    <div class="demo-feature-icon">🥊</div>
                                    <div class="demo-feature-text">
                                        <div class="demo-feature-name">Competitor Comparison</div>
                                        <div class="demo-feature-description">Detailed analysis of 5+ competitors</div>
                                    </div>
                                </div>
                                
                                <div class="demo-feature-item">
                                    <div class="demo-feature-icon">🛠️</div>
                                    <div class="demo-feature-text">
                                        <div class="demo-feature-name">Implementation Guide</div>
                                        <div class="demo-feature-description">Step-by-step action plan</div>
                                    </div>
                                </div>
                                
                                <div class="demo-feature-item">
                                    <div class="demo-feature-icon">💰</div>
                                    <div class="demo-feature-text">
                                        <div class="demo-feature-name">ROI Calculations</div>
                                        <div class="demo-feature-description">Detailed financial impact analysis</div>
                                    </div>
                                </div>
                                
                                <div class="demo-feature-item">
                                    <div class="demo-feature-icon">📈</div>
                                    <div class="demo-feature-text">
                                        <div class="demo-feature-name">KPI Dashboard</div>
                                        <div class="demo-feature-description">Track progress with key metrics</div>
                                    </div>
                                </div>
                                
                                <div class="demo-feature-item">
                                    <div class="demo-feature-icon">🤝</div>
                                    <div class="demo-feature-text">
                                        <div class="demo-feature-name">30-Day Support</div>
                                        <div class="demo-feature-description">Expert guidance during implementation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Футер демо с CTA -->
                <div class="demo-footer">
                    <div class="demo-cta-section">
                        <h3 class="demo-cta-title">Ready for Full Analysis?</h3>
                        <p class="demo-cta-description">
                            Get complete ${tech.name} report with detailed implementation steps, 
                            competitor analysis, and personalized roadmap.
                        </p>
                        
                        <div class="demo-cta-buttons">
                            <button class="demo-cta-primary" id="demo-buy-btn">
                                🚀 Get Full Report - $${tech.price}
                            </button>
                            <button class="demo-cta-secondary" id="demo-close-demo-btn">
                                Close Demo
                            </button>
                        </div>
                        
                        <p class="demo-cta-note">
                            💡 <strong>No upfront payment</strong> - Pay only after receiving and reviewing the full report.
                        </p>
                    </div>
                </div>
            `;
        },
        
        // ===== НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ =====
        setupEventListeners: function() {
            // Кнопка закрытия демо
            document.addEventListener('click', (e) => {
                if (e.target.id === 'demo-close-btn' || 
                    e.target.id === 'demo-close-demo-btn' ||
                    e.target.closest('#demo-close-btn') ||
                    e.target.closest('#demo-close-demo-btn')) {
                    e.preventDefault();
                    this.closeDemo();
                }
                
                // Кнопка покупки полного отчета
                if (e.target.id === 'demo-buy-btn' || e.target.closest('#demo-buy-btn')) {
                    e.preventDefault();
                    this.initiatePurchase();
                }
            });
            
            // Закрытие по клику на оверлей
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('demo-modal-overlay')) {
                    this.closeDemo();
                }
            });
            
            // Закрытие по Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
                    this.closeDemo();
                }
            });
        },
        
        setupDemoButtons: function(demoData) {
            // Обработчик для кнопки покупки
            const buyBtn = document.getElementById('demo-buy-btn');
            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    this.initiatePurchase(demoData);
                });
            }
        },
        
        // ===== ИНИЦИАЦИЯ ПОКУПКИ =====
        initiatePurchase: function(demoData = null) {
            const techId = demoData?.techId || currentDemo?.techId;
            
            if (!techId) {
                this.showError('Unable to initiate purchase');
                return;
            }
            
            const tech = config.techData[techId];
            if (!tech) return;
            
            // Закрываем демо
            this.closeDemo();
            
            // Показываем подтверждение покупки
            if (confirm(`Get full ${tech.name} report for $${tech.price}?\n\nYou will receive complete analysis within 24 hours.`)) {
                // Интеграция с основной системой
                if (window.MatrixSystem) {
                    window.MatrixSystem.selectPricingPlan('basic');
                } else {
                    // Fallback
                    alert(`Purchase initiated for ${tech.name}. We will contact you shortly.`);
                }
            }
        },
        
        // ===== ЗАКРЫТИЕ ДЕМО =====
        closeDemo: function() {
            if (demoModal) {
                demoModal.classList.remove('active');
                
                // Даем время для анимации закрытия
                setTimeout(() => {
                    const demoContent = document.getElementById('demo-content');
                    if (demoContent) {
                        demoContent.innerHTML = '';
                    }
                    document.body.style.overflow = '';
                }, 300);
            }
            
            currentDemo = null;
        },
        
        // ===== ИНДИКАТОР ЗАГРУЗКИ =====
        showLoading: function() {
            const loading = document.getElementById('demo-loading');
            if (loading) {
                loading.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        },
        
        hideLoading: function() {
            const loading = document.getElementById('demo-loading');
            if (loading) {
                loading.classList.remove('active');
                document.body.style.overflow = '';
            }
        },
        
        // ===== АНИМАЦИИ КОНТЕНТА ДЕМО =====
        animateDemoContent: function() {
            // Ждем пока контент отобразится
            setTimeout(() => {
                const animatedElements = document.querySelectorAll('.demo-stagger-item');
                animatedElements.forEach((el, index) => {
                    el.style.animationDelay = (index * 0.1) + 's';
                    el.classList.add('demo-content-animated');
                });
                
                // Анимация прогресс-баров
                const metricBars = document.querySelectorAll('.demo-metric-fill');
                metricBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                            bar.style.width = width;
                        }, 100);
                    }, index * 200);
                });
                
            }, 100);
        },
        
        // ===== КЭШИРОВАНИЕ ДЕМО =====
        saveDemoToCache: function(techId, domain, data) {
            try {
                const cacheKey = `demo_${techId}_${this.hashString(domain)}`;
                const cacheData = {
                    data: data,
                    timestamp: Date.now(),
                    expiry: Date.now() + config.cacheDuration
                };
                
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                console.log('Demo saved to cache:', cacheKey);
            } catch (error) {
                console.warn('Failed to save demo to cache:', error);
            }
        },
        
        loadDemoCache: function() {
            try {
                const today = new Date().toDateString();
                const cacheKey = `demo_counter_${today}`;
                const count = localStorage.getItem(cacheKey) || 0;
                console.log('Demo counter loaded:', count);
            } catch (error) {
                console.warn('Failed to load demo cache:', error);
            }
        },
        
        updateDemoCounter: function() {
            try {
                const today = new Date().toDateString();
                const cacheKey = `demo_counter_${today}`;
                let count = parseInt(localStorage.getItem(cacheKey) || '0');
                count++;
                localStorage.setItem(cacheKey, count.toString());
                console.log('Demo counter updated:', count);
            } catch (error) {
                console.warn('Failed to update demo counter:', error);
            }
        },
        
        checkDemoLimits: function() {
            try {
                const today = new Date().toDateString();
                const cacheKey = `demo_counter_${today}`;
                const count = parseInt(localStorage.getItem(cacheKey) || '0');
                
                return count < config.maxDemosPerDay;
            } catch (error) {
                console.warn('Failed to check demo limits:', error);
                return true; // Разрешаем если не можем проверить
            }
        },
        
        // ===== ЛОГИРОВАНИЕ =====
        logDemoView: function(demoData) {
            console.log('📊 Demo viewed:', {
                tech: demoData.techId,
                domain: demoData.domain,
                demoId: demoData.demoId,
                score: demoData.healthScore,
                timestamp: new Date().toISOString()
            });
            
            // Здесь можно добавить отправку в аналитику
            if (window.MatrixSystem && window.MatrixSystem.trackEvent) {
                window.MatrixSystem.trackEvent('demo_viewed', {
                    tech: demoData.techId,
                    domain: demoData.domain,
                    score: demoData.healthScore
                });
            }
        },
        
        // ===== УТИЛИТЫ =====
        hashString: function(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return Math.abs(hash).toString(16);
        },
        
        formatMetricName: function(name) {
            return name.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },
        
        getImpactLevel: function(severity) {
            const levels = {
                'critical': 'Very High',
                'high': 'High',
                'medium': 'Medium',
                'low': 'Low'
            };
            return levels[severity] || 'Medium';
        },
        
        // ===== УВЕДОМЛЕНИЯ =====
        showError: function(message) {
            if (window.MatrixSystem && window.MatrixSystem.showError) {
                window.MatrixSystem.showError(message);
            } else {
                alert('Error: ' + message);
            }
        },
        
        showSuccess: function(message) {
            if (window.MatrixSystem && window.MatrixSystem.showSuccess) {
                window.MatrixSystem.showSuccess(message);
            } else {
                alert('Success: ' + message);
            }
        },
        
        // ===== ПРИВЕТСТВЕННОЕ СООБЩЕНИЕ =====
        showWelcomeMessage: function() {
            console.log(`
            ╔══════════════════════════════════════╗
            ║     DEMO CORE SYSTEM v${config.version}     ║
            ║     Ready for interactive demos!    ║
            ╚══════════════════════════════════════╝
            `);
        },
        
        // ===== ПУБЛИЧНЫЕ МЕТОДЫ =====
        
        // Получить информацию о системе
        getInfo: function() {
            return {
                version: config.version,
                technologies: Object.keys(config.techData),
                demoCount: this.getDemoCount(),
                cacheSize: this.getCacheSize()
            };
        },
        
        // Получить количество демо за сегодня
        getDemoCount: function() {
            try {
                const today = new Date().toDateString();
                const cacheKey = `demo_counter_${today}`;
                return parseInt(localStorage.getItem(cacheKey) || '0');
            } catch {
                return 0;
            }
        },
        
        // Получить размер кэша
        getCacheSize: function() {
            try {
                let size = 0;
                for (let key in localStorage) {
                    if (key.startsWith('demo_')) {
                        size += localStorage.getItem(key).length;
                    }
                }
                return (size / 1024).toFixed(2) + ' KB';
            } catch {
                return 'Unknown';
            }
        },
        
        // Очистить кэш
        clearCache: function() {
            try {
                const keysToRemove = [];
                for (let key in localStorage) {
                    if (key.startsWith('demo_') || key.startsWith('demo_counter_')) {
                        keysToRemove.push(key);
                    }
                }
                
                keysToRemove.forEach(key => localStorage.removeItem(key));
                console.log('Cache cleared:', keysToRemove.length, 'items removed');
                this.showSuccess('Demo cache cleared successfully');
                
                return keysToRemove.length;
            } catch (error) {
                console.error('Failed to clear cache:', error);
                this.showError('Failed to clear cache');
                return 0;
            }
        },
        
        // Тестовая генерация демо
        testDemo: function(techId = 'immunity', domain = 'example.com') {
            console.log('Running test demo generation...');
            
            try {
                const demoData = this.generateDemoData(techId, domain);
                console.log('Test demo generated:', demoData);
                
                this.displayDemo(demoData);
                this.showSuccess('Test demo generated successfully');
                
                return demoData;
            } catch (error) {
                console.error('Test demo failed:', error);
                this.showError('Test demo generation failed');
                return null;
            }
        },
        
        // Экспорт данных демо
        exportDemoData: function(demoId = null) {
            let dataToExport;
            
            if (demoId) {
                // Ищем конкретное демо
                for (let key in localStorage) {
                    if (key.startsWith('demo_')) {
                        try {
                            const cached = JSON.parse(localStorage.getItem(key));
                            if (cached.data.demoId === demoId) {
                                dataToExport = cached.data;
                                break;
                            }
                        } catch (e) {
                            // Пропускаем невалидные записи
                        }
                    }
                }
            } else {
                // Экспорт всех демо
                const allDemos = [];
                for (let key in localStorage) {
                    if (key.startsWith('demo_')) {
                        try {
                            const cached = JSON.parse(localStorage.getItem(key));
                            if (cached.data && Date.now() < cached.expiry) {
                                allDemos.push(cached.data);
                            }
                        } catch (e) {
                            // Пропускаем невалидные записи
                        }
                    }
                }
                dataToExport = allDemos;
            }
            
            if (!dataToExport) {
                this.showError('No demo data found');
                return false;
            }
            
            try {
                const dataStr = JSON.stringify(dataToExport, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                
                const url = URL.createObjectURL(dataBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `demo-export-${demoId || 'all'}-${Date.now()}.json`;
                a.click();
                
                URL.revokeObjectURL(url);
                
                this.showSuccess('Demo data exported successfully');
                return true;
            } catch (error) {
                console.error('Export failed:', error);
                this.showError('Failed to export demo data');
                return false;
            }
        },
        
        // Получить статистику
        getStats: function() {
            const today = new Date().toDateString();
            const demoCount = this.getDemoCount();
            
            let totalCacheItems = 0;
            let expiredItems = 0;
            
            for (let key in localStorage) {
                if (key.startsWith('demo_')) {
                    totalCacheItems++;
                    try {
                        const cached = JSON.parse(localStorage.getItem(key));
                        if (Date.now() > cached.expiry) {
                            expiredItems++;
                        }
                    } catch (e) {
                        // Невалидная запись
                    }
                }
            }
            
            return {
                demoCountToday: demoCount,
                totalCacheItems: totalCacheItems,
                expiredCacheItems: expiredItems,
                activeCacheItems: totalCacheItems - expiredItems,
                cacheSize: this.getCacheSize(),
                dailyLimit: config.maxDemosPerDay,
                remainingDemos: Math.max(0, config.maxDemosPerDay - demoCount)
            };
        },
        
        // Восстановить из бэкапа
        restoreFromBackup: function(jsonData) {
            try {
                const data = JSON.parse(jsonData);
                let restoredCount = 0;
                
                if (Array.isArray(data)) {
                    // Множественный импорт
                    data.forEach(demoData => {
                        if (demoData.techId && demoData.domain) {
                            const cacheKey = `demo_${demoData.techId}_${this.hashString(demoData.domain)}`;
                            const cacheData = {
                                data: demoData,
                                timestamp: Date.now(),
                                expiry: Date.now() + config.cacheDuration
                            };
                            
                            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                            restoredCount++;
                        }
                    });
                } else if (data.techId && data.domain) {
                    // Одиночный импорт
                    const cacheKey = `demo_${data.techId}_${this.hashString(data.domain)}`;
                    const cacheData = {
                        data: data,
                        timestamp: Date.now(),
                        expiry: Date.now() + config.cacheDuration
                    };
                    
                    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                    restoredCount = 1;
                } else {
                    throw new Error('Invalid backup format');
                }
                
                this.showSuccess(`Restored ${restoredCount} demo(s) from backup`);
                return restoredCount;
                
            } catch (error) {
                console.error('Restore failed:', error);
                this.showError('Failed to restore from backup: ' + error.message);
                return 0;
            }
        }
    };
})();

// ===== ГЛОБАЛЬНЫЕ УТИЛИТЫ ДЛЯ РАБОТЫ С ДЕМО =====

/**
 * Быстрый доступ к демо-системе
 */
window.$demo = window.DemoCore;

/**
 * Тестовая функция для генерации демо
 */
window.testDemoGeneration = function(techId = 'immunity', domain = 'example.com') {
    return DemoCore.testDemo(techId, domain);
};

/**
 * Очистка кэша демо
 */
window.clearDemoCache = function() {
    return DemoCore.clearCache();
};

/**
 * Получение статистики демо-системы
 */
window.getDemoStats = function() {
    return DemoCore.getStats();
};

// ===== АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ =====
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDemoCore);
    } else {
        initializeDemoCore();
    }
    
    function initializeDemoCore() {
        setTimeout(() => {
            if (typeof DemoCore !== 'undefined') {
                DemoCore.init();
                
                // Экспортируем глобально для отладки
                window.$D = DemoCore;
                console.log('🎨 Demo Core доступен как window.$D');
                console.log('🧪 Используйте $D.testDemo() для тестирования');
                
                // Автоматическая очистка устаревшего кэша
                cleanupExpiredCache();
            }
        }, 300);
    }
    
    function cleanupExpiredCache() {
        try {
            let cleanedCount = 0;
            for (let key in localStorage) {
                if (key.startsWith('demo_')) {
                    try {
                        const cached = JSON.parse(localStorage.getItem(key));
                        if (Date.now() > cached.expiry) {
                            localStorage.removeItem(key);
                            cleanedCount++;
                        }
                    } catch (e) {
                        // Удаляем невалидные записи
                        localStorage.removeItem(key);
                        cleanedCount++;
                    }
                }
            }
            
            if (cleanedCount > 0) {
                console.log(`🧹 Очищено ${cleanedCount} устаревших записей кэша`);
            }
        } catch (error) {
            console.warn('Не удалось очистить кэш:', error);
        }
    }
})();

// ===== ИНТЕГРАЦИЯ С КОНСОЛЬЮ ДЛЯ ОТЛАДКИ =====
if (typeof window !== 'undefined') {
    window.debugDemo = function() {
        console.group('🎨 Demo Core Debug');
        console.log('Version:', DemoCore.getInfo().version);
        console.log('Stats:', DemoCore.getStats());
        console.log('Current Demo:', DemoCore.currentDemo || 'None');
        console.groupEnd();
        
        return DemoCore.getInfo();
    };
    
    window.exportDemoBackup = function() {
        DemoCore.exportDemoData();
    };
}

// ===== ОБРАБОТКА ОШИБОК =====
window.addEventListener('error', function(event) {
    if (event.error && event.error.toString().includes('DemoCore')) {
        console.error('🚨 Demo Core Error:', event.error);
        
        if (typeof DemoCore !== 'undefined') {
            DemoCore.showError('A demo system error occurred');
        }
    }
});

// ===== ФИНАЛЬНОЕ СООБЩЕНИЕ =====
console.log(`
🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨
🎨     DEMO CORE SYSTEM LOADED       🎨
🎨       Interactive demos ready      🎨
🎨       Personalization engine       🎨
🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨
`);

// ===== КОНЕЦ ФАЙЛА =====
// Demo Core System v1.0.0
// © 2025 Gennady Konstantinov
// Все права защищены