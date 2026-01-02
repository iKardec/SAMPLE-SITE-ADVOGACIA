/**
 * ========================================
 * ANIMATIONS.JS - Animações e Efeitos
 * ========================================
 * Controla animações de scroll, counters e efeitos visuais
 */

import { isInViewport, animateCounter } from './utils.js';

/**
 * Classe responsável pelas animações
 */
class Animations {
    constructor() {
        // Elementos
        this.animatedElements = document.querySelectorAll('.fade-in');
        this.counterElements = document.querySelectorAll('.stat-number');

        // Estado
        this.countersAnimated = false;

        // Inicializar
        this.init();
    }

    /**
     * Inicializa as animações
     */
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.log('Animations initialized');
    }

    /**
     * Configura o Intersection Observer para animações
     */
    setupIntersectionObserver() {
        // Configuração do observer
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        // Callback do observer
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona classe de animação
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';

                    // Para de observar após animar
                    observer.unobserve(entry.target);
                }
            });
        };

        // Cria o observer
        const observer = new IntersectionObserver(callback, options);

        // Observa elementos com fade-in
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Observa cards de áreas
        const areaCards = document.querySelectorAll('.area-card');
        areaCards.forEach((card, index) => {
            observer.observe(card);
            // Stagger effect
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Observa membros da equipe
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            observer.observe(member);
            member.style.animationDelay = `${index * 0.15}s`;
        });
    }

    /**
     * Configura animações no scroll
     */
    setupScrollAnimations() {
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });

        // Executa uma vez no load
        this.handleScrollAnimations();
    }

    /**
     * Lida com animações durante o scroll
     */
    handleScrollAnimations() {
        // Anima contadores quando a seção About estiver visível
        if (!this.countersAnimated) {
            const aboutSection = document.querySelector('.about');

            if (aboutSection && isInViewport(aboutSection, 200)) {
                this.animateCounters();
                this.countersAnimated = true;
            }
        }
    }

    /**
     * Anima os contadores de estatísticas
     */
    animateCounters() {
        this.counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));

            if (target) {
                // Usa a função do utils.js
                animateCounter(counter, target, 2000);

                this.log(`Counter animated to ${target}`);
            }
        });
    }

    /**
     * Animação de parallax no hero (opcional)
     */
    initParallax() {
        const heroSection = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg img');

        if (!heroSection || !heroBg) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const parallaxSpeed = 0.5;

            heroBg.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        });

        this.log('Parallax initialized');
    }

    /**
     * Adiciona animação de hover nos cards
     */
    initCardAnimations() {
        const cards = document.querySelectorAll('.card, .area-card, .team-member');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)';
            });
        });
    }

    /**
     * Animação de revelação para elementos
     * @param {String} selector - Seletor CSS
     * @param {String} animationClass - Classe de animação
     */
    revealOnScroll(selector, animationClass = 'fade-in') {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => observer.observe(element));
    }

    /**
     * Log helper
     * @param {String} message - Mensagem
     */
    log(message) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`[Animations] ${message}`);
        }
    }
}

// Exporta classe
export default Animations;
