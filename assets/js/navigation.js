/**
 * ========================================
 * NAVIGATION.JS - Gerenciamento de Navegação
 * ========================================
 * Controla o menu, navegação suave e comportamento do header
 */

import { smoothScrollTo, getScrollTop, throttle, toggleClass } from './utils.js';

/**
 * Classe responsável pela navegação
 */
class Navigation {
    constructor() {
        // Elementos DOM
        this.header = document.getElementById('header');
        this.nav = document.getElementById('nav');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navLinks = document.querySelectorAll('.nav-link');

        // Estado
        this.isMenuOpen = false;
        this.lastScrollTop = 0;
        this.headerHeight = 80;

        // Inicializar
        this.init();
    }

    /**
     * Inicializa todos os event listeners
     */
    init() {
        this.setupEventListeners();
        this.log('Navigation initialized');
    }

    /**
     * Configura todos os event listeners
     */
    setupEventListeners() {
        // Mobile toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Links de navegação
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll behavior com throttle
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));

        // Fechar menu ao redimensionar
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen &&
                !this.nav.contains(e.target) &&
                !this.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Lida com cliques nos links de navegação
     * @param {Event} e - Evento de clique
     */
    handleNavClick(e) {
        const href = e.target.getAttribute('href');

        // Se for link interno (começa com #)
        if (href && href.startsWith('#')) {
            e.preventDefault();

            // Remove active de todos os links
            this.navLinks.forEach(link => link.classList.remove('active'));

            // Adiciona active ao link clicado
            e.target.classList.add('active');

            // Scroll suave para a seção
            smoothScrollTo(href, this.headerHeight);

            // Fecha menu mobile se estiver aberto
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            }

            this.log(`Navigation to ${href}`);
        }
    }

    /**
     * Lida com o scroll da página
     */
    handleScroll() {
        const scrollTop = getScrollTop();

        // Adiciona classe 'scrolled' ao header após 50px
        if (scrollTop > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Atualiza link ativo baseado na posição
        this.updateActiveLink();

        this.lastScrollTop = scrollTop;
    }

    /**
     * Atualiza o link ativo baseado na seção visível
     */
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollTop = getScrollTop();

        sections.forEach(section => {
            const sectionTop = section.offsetTop - this.headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                // Remove active de todos
                this.navLinks.forEach(link => link.classList.remove('active'));

                // Adiciona active ao link correspondente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    /**
     * Toggle do menu mobile
     */
    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /**
     * Abre o menu mobile
     */
    openMobileMenu() {
        this.nav.classList.add('active');
        this.mobileToggle.classList.add('active');
        this.isMenuOpen = true;

        // Previne scroll do body
        document.body.style.overflow = 'hidden';

        this.log('Mobile menu opened');
    }

    /**
     * Fecha o menu mobile
     */
    closeMobileMenu() {
        this.nav.classList.remove('active');
        this.mobileToggle.classList.remove('active');
        this.isMenuOpen = false;

        // Restaura scroll do body
        document.body.style.overflow = '';

        this.log('Mobile menu closed');
    }

    /**
     * Log helper
     * @param {String} message - Mensagem
     */
    log(message) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`[Navigation] ${message}`);
        }
    }
}

// Exporta instância
export default Navigation;
