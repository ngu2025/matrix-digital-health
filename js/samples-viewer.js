// ============================================
// SAMPLES-VIEWER.JS
// Система просмотра образцов презентаций
// ============================================

window.SamplesViewer = {
    
    // Конфигурация образцов
    samples: [
        {
            id: 'sample-1',
            title: 'Quantum Architecture Analysis',
            description: 'Interactive dashboard of website structure analysis',
            preview: 'https://via.placeholder.com/600x400/00dc82/0f172a?text=Quantum+Architecture+Dashboard',
            type: 'dashboard',
            format: 'Quantum Architecture Audit'
        },
        {
            id: 'sample-2',
            title: 'Competitor Quantum Matrix',
            description: '3D matrix visualization of competitor analysis',
            preview: 'https://via.placeholder.com/600x400/00c2ff/0f172a?text=Competitor+Quantum+Matrix',
            type: 'matrix',
            format: 'Competitor Quantum Scan'
        },
        {
            id: 'sample-3',
            title: 'Conversion Flow Analysis',
            description: 'Interactive flow diagram of user conversion paths',
            preview: 'https://via.placeholder.com/600x400/8b5cf6/0f172a?text=Conversion+Flow+Analysis',
            type: 'flowchart',
            format: 'Conversion Flow Quantum Analysis'
        },
        {
            id: 'sample-4',
            title: 'Performance Quantum Dashboard',
            description: 'Real-time performance monitoring interface',
            preview: 'https://via.placeholder.com/600x400/10b981/0f172a?text=Performance+Quantum+Dashboard',
            type: 'dashboard',
            format: 'Performance Quantum Dashboard'
        },
        {
            id: 'sample-5',
            title: 'Hidden Assets Discovery',
            description: 'Visualization of discovered hidden opportunities',
            preview: 'https://via.placeholder.com/600x400/f59e0b/0f172a?text=Hidden+Assets+Discovery',
            type: 'discovery',
            format: 'Hidden Asset Quantum Discovery'
        },
        {
            id: 'sample-6',
            title: 'Marketing Efficiency Audit',
            description: 'Comprehensive marketing performance report',
            preview: 'https://via.placeholder.com/600x400/ef4444/0f172a?text=Marketing+Efficiency+Audit',
            type: 'report',
            format: 'Marketing Efficiency Quantum Audit'
        }
    ],
    
    // Инициализация
    init: function() {
        console.log('🎯 Samples Viewer initialized');
        this.setupEventListeners();
        this.setupSamplesGrid();
        this.setupModalStyles();
    },
    
    // Настройка обработчиков событий
    setupEventListeners: function() {
        // Кнопки просмотра образцов
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-view-sample')) {
                const sampleId = e.target.dataset.sample;
                this.viewSample(sampleId);
            }
        });
        
        // Кнопка "View More Samples"
        const moreBtn = document.getElementById('view-more-samples');
        if (moreBtn) {
            moreBtn.addEventListener('click', () => {
                this.showAllSamples();
            });
        }
    },
    
    // Настройка сетки образцов
    setupSamplesGrid: function() {
        const samplesGrid = document.getElementById('samples-grid');
        if (!samplesGrid) return;
        
        // Очищаем существующие карточки (если есть)
        samplesGrid.innerHTML = '';
        
        // Создаем карточки для каждого образца
        this.samples.forEach(sample => {
            const sampleHTML = this.createSampleCard(sample);
            samplesGrid.insertAdjacentHTML('beforeend', sampleHTML);
        });
    },
    
    // Создание карточки образца
    createSampleCard: function(sample) {
        return `
            <div class="sample-card" data-sample="${sample.id}">
                <div class="sample-preview">
                    <img src="${sample.preview}" 
                         alt="${sample.title}"
                         loading="lazy">
                </div>
                <h3>${sample.title}</h3>
                <p>${sample.description}</p>
                <p class="sample-format"><strong>Format:</strong> ${sample.format}</p>
                <button class="btn-view-sample" data-sample="${sample.id}">
                    View Interactive Sample
                </button>
            </div>
        `;
    },
    
    // Просмотр образца
    viewSample: function(sampleId) {
        const sample = this.samples.find(s => s.id === sampleId);
        if (!sample) {
            console.error('Sample not found:', sampleId);
            return;
        }
        
        console.log('🔍 Viewing sample:', sample.title);
        this.showSampleModal(sample);
    },
    
    // Показать модальное окно образца
    showSampleModal: function(sample) {
        // Удаляем старую модалку если есть
        this.removeExistingModal();
        
        // Создаем HTML модалки
        const modalHTML = `
            <div id="sample-modal" class="sample-modal">
                <div class="sample-modal-overlay" id="close-sample-modal"></div>
                <div class="sample-modal-content">
                    <button class="sample-modal-close" id="close-sample-btn">×</button>
                    
                    <div class="sample-modal-header">
                        <div class="sample-badge">${sample.type}</div>
                        <h2>${sample.title}</h2>
                        <p class="sample-format-label">Format: <strong>${sample.format}</strong></p>
                    </div>
                    
                    <div class="sample-modal-preview">
                        <img src="${sample.preview}" 
                             alt="${sample.title}"
                             id="sample-modal-image">
                        <div class="sample-preview-overlay">
                            <div class="preview-label">Interactive Preview</div>
                            <div class="preview-hint">This is a sample of an interactive presentation</div>
                        </div>
                    </div>
                    
                    <div class="sample-modal-description">
                        <h3>Description</h3>
                        <p>${sample.description}</p>
                        <p>This interactive presentation demonstrates the depth and quality of analysis provided.</p>
                    </div>
                    
                    <div class="sample-modal-features">
                        <h3>Key Features</h3>
                        <ul>
                            <li>Interactive navigation and filtering</li>
                            <li>Real-time data visualization</li>
                            <li>Clickable elements and tooltips</li>
                            <li>Export-ready charts and graphs</li>
                            <li>Detailed recommendations section</li>
                        </ul>
                    </div>
                    
                    <div class="sample-modal-actions">
                        <button class="btn btn-outline" id="close-sample-action">
                            Close Preview
                        </button>
                        <button class="btn btn-primary" onclick="formatSelector.selectFormat('${this.getFormatId(sample.format)}')">
                            Order This Format
                        </button>
                    </div>
                    
                    <div class="sample-modal-note">
                        <p>💡 <strong>Note:</strong> Actual presentations are tailored to your specific website data and include interactive elements for comprehensive analysis.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Вставляем модалку в контейнер
        const container = document.getElementById('modal-container') || document.body;
        container.insertAdjacentHTML('beforeend', modalHTML);
        
        // Настраиваем обработчики модалки
        this.setupSampleModalEvents();
        
        // Предзагрузка изображения
        this.preloadImage(sample.preview);
    },
    
    // Получить ID формата по названию
    getFormatId: function(formatName) {
        const formatMap = {
            'Quantum Architecture Audit': 'quantum-arch',
            'Competitor Quantum Scan': 'quantum-scan',
            'Conversion Flow Quantum Analysis': 'quantum-flow',
            'Performance Quantum Dashboard': 'quantum-perf',
            'Hidden Asset Quantum Discovery': 'quantum-asset',
            'Marketing Efficiency Quantum Audit': 'quantum-audit',
            'Performance Gap Quantum Analysis': 'quantum-gap',
            'Quantum Growth Roadmap': 'quantum-growth',
            'Quantum Strategy Sprint': 'quantum-sprint',
            'Quantum Marketing Transformation': 'quantum-transform'
        };
        
        return formatMap[formatName] || 'quantum-arch';
    },
    
    // Удалить существующую модалку
    removeExistingModal: function() {
        const existingModal = document.getElementById('sample-modal');
        if (existingModal) {
            existingModal.remove();
        }
    },
    
    // Настройка событий модалки образца
    setupSampleModalEvents: function() {
        // Функция закрытия модалки
        const closeModal = () => {
            this.removeExistingModal();
        };
        
        // Обработчики закрытия
        document.getElementById('close-sample-modal').addEventListener('click', closeModal);
        document.getElementById('close-sample-btn').addEventListener('click', closeModal);
        document.getElementById('close-sample-action').addEventListener('click', closeModal);
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('sample-modal')) {
                closeModal();
            }
        });
        
        // Предотвращение закрытия при клике на контент
        document.querySelector('.sample-modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    },
    
    // Предзагрузка изображения
    preloadImage: function(src) {
        const img = new Image();
        img.src = src;
    },
    
    // Показать все образцы
    showAllSamples: function() {
        const samplesGrid = document.getElementById('samples-grid');
        if (!samplesGrid) return;
        
        // Добавляем дополнительные образцы
        const additionalSamples = [
            {
                id: 'sample-7',
                title: 'Growth Roadmap Visualization',
                description: '90-day strategic growth plan with milestones',
                preview: 'https://via.placeholder.com/600x400/3b82f6/0f172a?text=Growth+Roadmap+Visualization',
                type: 'roadmap',
                format: 'Quantum Growth Roadmap'
            },
            {
                id: 'sample-8',
                title: 'Strategy Sprint Interface',
                description: '48-hour rapid strategy development dashboard',
                preview: 'https://via.placeholder.com/600x400/8b5cf6/0f172a?text=Strategy+Sprint+Interface',
                type: 'sprint',
                format: 'Quantum Strategy Sprint'
            }
        ];
        
        // Скрываем кнопку "View More"
        const moreBtn = document.getElementById('view-more-samples');
        if (moreBtn) {
            moreBtn.style.display = 'none';
        }
        
        // Добавляем дополнительные образцы
        additionalSamples.forEach(sample => {
            const sampleHTML = this.createSampleCard(sample);
            samplesGrid.insertAdjacentHTML('beforeend', sampleHTML);
        });
        
        // Показываем сообщение
        this.showMoreSamplesMessage();
    },
    
    // Показать сообщение о загрузке дополнительных образцов
    showMoreSamplesMessage: function() {
        const messageHTML = `
            <div class="more-samples-message">
                <p>All available sample presentations are now displayed.</p>
                <p>Each format includes unique interactive elements specific to the analysis type.</p>
            </div>
        `;
        
        const samplesSection = document.querySelector('.samples-section .container');
        if (samplesSection) {
            const existingMessage = samplesSection.querySelector('.more-samples-message');
            if (!existingMessage) {
                samplesSection.insertAdjacentHTML('beforeend', messageHTML);
            }
        }
    },
    
    // Настройка стилей модалки (если их нет в CSS)
    setupModalStyles: function() {
        // Проверяем, есть ли уже стили
        if (document.querySelector('#sample-modal-styles')) {
            return;
        }
        
        const styles = `
            <style id="sample-modal-styles">
            .sample-modal {
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
            
            .sample-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .sample-modal-content {
                position: relative;
                background: #0f172a;
                border-radius: 24px;
                border: 2px solid #00dc82;
                max-width: 900px;
                max-height: 95vh;
                overflow-y: auto;
                z-index: 10001;
                padding: 40px;
                width: 100%;
                box-shadow: 0 25px 50px -12px rgba(0, 220, 130, 0.2);
                animation: slideUp 0.4s ease;
            }
            
            .sample-modal-close {
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
                z-index: 10002;
            }
            
            .sample-modal-close:hover {
                background: #dc2626;
                transform: scale(1.1);
            }
            
            .sample-modal-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 1px solid #334155;
            }
            
            .sample-badge {
                display: inline-block;
                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                color: white;
                padding: 6px 15px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 15px;
            }
            
            .sample-modal-header h2 {
                color: #f1f5f9;
                margin-bottom: 10px;
                font-size: 32px;
            }
            
            .sample-format-label {
                color: #94a3b8;
                font-size: 16px;
            }
            
            .sample-modal-preview {
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                margin-bottom: 30px;
                border: 2px solid #334155;
            }
            
            #sample-modal-image {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .sample-preview-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9));
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .sample-modal-preview:hover .sample-preview-overlay {
                opacity: 1;
            }
            
            .preview-label {
                color: #00dc82;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .preview-hint {
                color: #cbd5e1;
                font-size: 16px;
                text-align: center;
                max-width: 80%;
            }
            
            .sample-modal-description {
                background: rgba(0, 220, 130, 0.05);
                border-radius: 16px;
                padding: 25px;
                margin-bottom: 30px;
                border-left: 4px solid #00dc82;
            }
            
            .sample-modal-description h3 {
                color: #00dc82;
                margin-bottom: 15px;
                font-size: 20px;
            }
            
            .sample-modal-description p {
                color: #cbd5e1;
                line-height: 1.6;
                margin-bottom: 10px;
            }
            
            .sample-modal-features {
                margin-bottom: 30px;
            }
            
            .sample-modal-features h3 {
                color: #f1f5f9;
                margin-bottom: 15px;
                font-size: 20px;
            }
            
            .sample-modal-features ul {
                list-style: none;
                padding: 0;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            
            .sample-modal-features li {
                color: #cbd5e1;
                padding: 10px 15px;
                background: rgba(30, 41, 59, 0.7);
                border-radius: 10px;
                border: 1px solid #334155;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .sample-modal-features li::before {
                content: "✓";
                color: #00dc82;
                font-weight: bold;
            }
            
            .sample-modal-actions {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .sample-modal-note {
                background: rgba(0, 194, 255, 0.05);
                border-radius: 16px;
                padding: 20px;
                border-left: 4px solid #00c2ff;
            }
            
            .sample-modal-note p {
                color: #cbd5e1;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
            }
            
            .more-samples-message {
                text-align: center;
                margin-top: 40px;
                padding: 20px;
                background: rgba(0, 220, 130, 0.1);
                border-radius: 16px;
                border: 1px solid #00dc82;
            }
            
            .more-samples-message p {
                color: #cbd5e1;
                margin: 10px 0;
            }
            
            .sample-format {
                color: #94a3b8;
                font-size: 13px;
                margin-bottom: 15px;
            }
            
            @media (max-width: 768px) {
                .sample-modal-content {
                    padding: 25px;
                    max-height: 90vh;
                }
                
                .sample-modal-features ul {
                    grid-template-columns: 1fr;
                }
                
                .sample-modal-actions {
                    flex-direction: column;
                }
                
                .sample-modal-header h2 {
                    font-size: 24px;
                }
            }
            </style>
        `;
        
        // Добавляем стили в head
        document.head.insertAdjacentHTML('beforeend', styles);
    }
};

// Инициализация при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    SamplesViewer.init();
    console.log('✅ Samples Viewer ready');
});

// Экспорт для глобального доступа
window.samplesViewer = SamplesViewer;