/**
 * ========================================
 * MAIN.JS - Inicialização Principal
 * ========================================
 * Arquivo principal que orquestra todos os módulos
 */

import Navigation from './navigation.js';
import Animations from './animations.js';
import ContactForm from './form.js';
import { log } from './utils.js';

/**
 * Classe principal da aplicação
 */
class App {
    constructor() {
        // Instâncias dos módulos
        this.navigation = null;
        this.animations = null;
        this.contactForm = null;

        // Inicializar quando DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    /**
     * Inicializa a aplicação
     */
    init() {
        log('🚀 Initializing Kardec Advocacia Portfolio...');

        // Inicializa módulos
        this.initModules();

        // Configurações adicionais
        this.setupAdditionalFeatures();

        log('✅ Application initialized successfully!');
    }

    /**
     * Inicializa todos os módulos
     */
    initModules() {
        // Navegação
        this.navigation = new Navigation();

        // Animações
        this.animations = new Animations();

        // Formulário de contato
        this.contactForm = new ContactForm();

        log('All modules initialized');
    }

    /**
     * Configura funcionalidades adicionais
     */
    setupAdditionalFeatures() {
        // Previne comportamento padrão de links vazios
        this.preventEmptyLinks();

        // Adiciona ano atual no footer
        this.updateCopyrightYear();

        // Lazy loading de imagens
        this.setupLazyLoading();

        // Smooth scroll para todos os links com #
        this.setupSmoothScroll();

        log('Additional features configured');
    }

    /**
     * Previne comportamento padrão de links vazios (#)
     */
    preventEmptyLinks() {
        const emptyLinks = document.querySelectorAll('a[href="#"]');

        emptyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
    }

    /**
     * Atualiza o ano do copyright automaticamente
     */
    updateCopyrightYear() {
        const yearElement = document.querySelector('.footer-bottom p');

        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
        }
    }

    /**
     * Configura lazy loading de imagens
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antigos
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    /**
     * Configura smooth scroll global
     */
    setupSmoothScroll() {
        // Já é tratado no navigation.js, mas podemos adicionar comportamento extra aqui
        log('Smooth scroll configured');
    }

    /**
     * Detecta modo dark (preparação futura)
     */
    detectDarkMode() {
        // Detecta preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            log('Dark mode preferred by system');
            // Adicionar classe dark-mode quando implementar
        }
    }

    /**
     * Performance monitoring (desenvolvimento)
     */
    monitorPerformance() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;

                console.log('📊 Performance Metrics:');
                console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);
                console.log(`🔌 Connection Time: ${connectTime}ms`);
            });
        }
    }
}

// Inicializa a aplicação
const app = new App();

// Exporta para uso global se necessário
window.KardecApp = app;

// Performance monitoring
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}
