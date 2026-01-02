/**
 * ═══════════════════════════════════════════════════════════
 * KARDEC ADVOCACIA - JavaScript Principal
 * ═══════════════════════════════════════════════════════════
 * Arquivo consolidado com todas as funcionalidades
 * Compatível com abertura direta do arquivo (sem servidor)
 * ═══════════════════════════════════════════════════════════
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════
    // UTILS - Funções Utilitárias
    // ═══════════════════════════════════════════════════════

    /**
     * Debounce - Limita a execução de uma função
     */
    function debounce(func, wait) {
        wait = wait || 300;
        let timeout;
        return function() {
            const args = arguments;
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    /**
     * Throttle - Limita a frequência de execução
     */
    function throttle(func, limit) {
        limit = limit || 300;
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    /**
     * Verifica se elemento está na viewport
     */
    function isInViewport(element, offset) {
        offset = offset || 0;
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (rect.top <= windowHeight - offset) && ((rect.top + rect.height) >= offset);
    }

    /**
     * Detecta se é mobile
     */
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || window.innerWidth < 768;
    }

    /**
     * Obtém posição do scroll
     */
    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    /**
     * Scroll suave para elemento
     */
    function smoothScrollTo(target, offset) {
        offset = offset || 0;
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Valida email
     */
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida telefone
     */
    function isValidPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }

    /**
     * Máscara de telefone
     */
    function phoneMask(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 3) {
                value = value.slice(0, 3) + ') ' + value.slice(3);
            }
            if (value.length > 10) {
                value = value.slice(0, 10) + '-' + value.slice(10);
            }
            
            e.target.value = value;
        });
    }

    /**
     * Anima contador
     */
    function animateCounter(element, target, duration) {
        duration = duration || 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    /**
     * Log para desenvolvimento
     */
    function log(message, data) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('[KARDEC] ' + message, data || '');
        }
    }


    // ═══════════════════════════════════════════════════════
    // NAVIGATION - Gerenciamento de Navegação
    // ═══════════════════════════════════════════════════════

    var Navigation = {
        // DOM Elements
        header: null,
        nav: null,
        mobileToggle: null,
        navLinks: null,
        navItems: null,
        
        // State
        isMenuOpen: false,
        headerHeight: 70,
        scrollPosition: 0,

        /**
         * Initialize navigation
         */
        init: function() {
            this.header = document.getElementById('header');
            this.nav = document.getElementById('nav');
            this.mobileToggle = document.getElementById('mobileToggle');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.navItems = document.querySelectorAll('.nav-list li');

            if (this.header && this.nav && this.mobileToggle) {
                this.setupEventListeners();
                this.setupAccessibility();
                log('Navigation initialized');
            } else {
                log('Navigation elements not found', 'warn');
            }
        },

        /**
         * Setup all event listeners
         */
        setupEventListeners: function() {
            var self = this;

            // Mobile toggle click
            this.mobileToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.toggleMobileMenu();
            });

            // Mobile toggle keyboard support
            this.mobileToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    self.toggleMobileMenu();
                }
                if (e.key === 'Escape' && self.isMenuOpen) {
                    self.closeMobileMenu();
                    self.mobileToggle.focus();
                }
            });

            // Nav links click
            this.navLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    self.handleNavClick(e);
                });
            });

            // Escape key to close menu
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && self.isMenuOpen) {
                    self.closeMobileMenu();
                    self.mobileToggle.focus();
                }
            });

            // Scroll handler (throttled)
            window.addEventListener('scroll', throttle(function() {
                self.handleScroll();
            }, 100));

            // Resize handler
            window.addEventListener('resize', debounce(function() {
                if (window.innerWidth > 1023 && self.isMenuOpen) {
                    self.closeMobileMenu();
                }
            }, 150));

            // Click outside to close
            document.addEventListener('click', function(e) {
                if (self.isMenuOpen) {
                    var isClickInsideNav = self.nav.contains(e.target);
                    var isClickOnToggle = self.mobileToggle.contains(e.target);
                    
                    if (!isClickInsideNav && !isClickOnToggle) {
                        self.closeMobileMenu();
                    }
                }
            });

            // Prevent scroll propagation on nav
            this.nav.addEventListener('touchmove', function(e) {
                if (self.isMenuOpen) {
                    e.stopPropagation();
                }
            }, { passive: true });
        },

        /**
         * Setup accessibility attributes
         */
        setupAccessibility: function() {
            this.mobileToggle.setAttribute('role', 'button');
            this.mobileToggle.setAttribute('tabindex', '0');
            this.mobileToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            this.mobileToggle.setAttribute('aria-expanded', 'false');
            this.mobileToggle.setAttribute('aria-controls', 'nav');
            
            this.nav.setAttribute('role', 'navigation');
            this.nav.setAttribute('aria-label', 'Menu principal');
        },

        /**
         * Handle nav link click
         */
        handleNavClick: function(e) {
            var href = e.currentTarget.getAttribute('href');
            var self = this;

            if (href && href.startsWith('#')) {
                e.preventDefault();

                // Update active state
                this.navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    link.setAttribute('aria-current', 'false');
                });

                e.currentTarget.classList.add('active');
                e.currentTarget.setAttribute('aria-current', 'page');

                // Close menu first, then scroll (better UX)
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                    // Small delay to let menu close animation start
                    setTimeout(function() {
                        smoothScrollTo(href, self.headerHeight);
                    }, 150);
                } else {
                    smoothScrollTo(href, this.headerHeight);
                }
            }
        },

        /**
         * Handle scroll events
         */
        handleScroll: function() {
            var scrollTop = getScrollTop();

            // Header shadow on scroll
            if (scrollTop > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }

            // Update active link based on scroll position
            if (!this.isMenuOpen) {
                this.updateActiveLink();
            }
        },

        /**
         * Update active navigation link based on scroll position
         */
        updateActiveLink: function() {
            var sections = document.querySelectorAll('section[id]');
            var scrollTop = getScrollTop();
            var self = this;

            sections.forEach(function(section) {
                var sectionTop = section.offsetTop - self.headerHeight - 100;
                var sectionBottom = sectionTop + section.offsetHeight;
                var sectionId = section.getAttribute('id');

                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    self.navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        link.setAttribute('aria-current', 'false');
                    });

                    var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
                    if (activeLink) {
                        activeLink.classList.add('active');
                        activeLink.setAttribute('aria-current', 'page');
                    }
                }
            });
        },

        /**
         * Toggle mobile menu
         */
        toggleMobileMenu: function() {
            if (this.isMenuOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        },

        /**
         * Open mobile menu
         */
        openMobileMenu: function() {
            // Save scroll position
            this.scrollPosition = window.pageYOffset;
            
            // Update state
            this.isMenuOpen = true;
            
            // Update DOM
            this.nav.classList.add('active');
            this.mobileToggle.classList.add('active');
            document.body.classList.add('menu-open');
            document.body.style.top = -this.scrollPosition + 'px';
            
            // Update accessibility
            this.mobileToggle.setAttribute('aria-expanded', 'true');
            this.mobileToggle.setAttribute('aria-label', 'Fechar menu de navegação');
            
            // Focus first nav link for accessibility
            var self = this;
            setTimeout(function() {
                var firstLink = self.nav.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            }, 300);
            
            log('Mobile menu opened');
        },

        /**
         * Close mobile menu
         */
        closeMobileMenu: function() {
            // Update state
            this.isMenuOpen = false;
            
            // Update DOM
            this.nav.classList.remove('active');
            this.mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            
            // Restore scroll position
            window.scrollTo(0, this.scrollPosition);
            
            // Update accessibility
            this.mobileToggle.setAttribute('aria-expanded', 'false');
            this.mobileToggle.setAttribute('aria-label', 'Abrir menu de navegação');
            
            log('Mobile menu closed');
        }
    };


    // ═══════════════════════════════════════════════════════
    // ANIMATIONS - Animações e Efeitos
    // ═══════════════════════════════════════════════════════

    var Animations = {
        countersAnimated: false,

        init: function() {
            this.setupIntersectionObserver();
            this.setupCounterAnimation();
            log('Animations initialized');
        },

        setupIntersectionObserver: function() {
            var options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            var callback = function(entries, observer) {
                entries.forEach(function(entry, index) {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            };

            var observer = new IntersectionObserver(callback, options);

            // Fade in elements
            var fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(function(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });

            // Cards
            var cards = document.querySelectorAll('.area-card, .team-member, .stat-item');
            cards.forEach(function(card, index) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.transitionDelay = (index * 0.1) + 's';
                observer.observe(card);
            });
        },

        setupCounterAnimation: function() {
            var self = this;
            var counters = document.querySelectorAll('.stat-number');
            
            if (counters.length === 0) return;

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting && !self.countersAnimated) {
                        self.countersAnimated = true;
                        counters.forEach(function(counter) {
                            var target = parseInt(counter.getAttribute('data-target')) || 0;
                            animateCounter(counter, target, 2000);
                        });
                    }
                });
            }, { threshold: 0.5 });

            var aboutStats = document.querySelector('.about-stats');
            if (aboutStats) {
                observer.observe(aboutStats);
            }
        }
    };


    // ═══════════════════════════════════════════════════════
    // CONTACT FORM - Formulário de Contato
    // ═══════════════════════════════════════════════════════

    var ContactForm = {
        form: null,
        submitButton: null,
        whatsappButton: null,
        successMessage: null,
        isSubmitting: false,

        // Configuração WhatsApp
        whatsappNumber: '5511999999999',

        init: function() {
            this.form = document.getElementById('contactForm');
            if (!this.form) return;

            this.submitButton = this.form.querySelector('button[type="submit"]');
            this.whatsappButton = document.getElementById('whatsappSubmit');
            this.successMessage = document.getElementById('formSuccess');

            this.setupEventListeners();
            this.setupPhoneMask();
            log('Contact form initialized');
        },

        setupEventListeners: function() {
            var self = this;

            // Submit form
            this.form.addEventListener('submit', function(e) {
                self.handleSubmit(e);
            });

            // WhatsApp button
            if (this.whatsappButton) {
                this.whatsappButton.addEventListener('click', function(e) {
                    self.handleWhatsAppSubmit(e);
                });
            }

            // Validação em tempo real
            var inputs = this.form.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(function(input) {
                input.addEventListener('blur', function() {
                    self.validateField(input);
                });
                input.addEventListener('input', function() {
                    self.clearError(input.parentElement);
                });
            });

            var select = this.form.querySelector('.form-select');
            if (select) {
                select.addEventListener('change', function() {
                    self.clearError(select.parentElement);
                });
            }
        },

        setupPhoneMask: function() {
            var phoneInput = document.getElementById('phone');
            if (phoneInput) {
                phoneMask(phoneInput);
            }
        },

        handleSubmit: function(e) {
            e.preventDefault();
            if (this.isSubmitting) return;

            if (!this.validateForm()) return;

            var consent = document.getElementById('consent');
            if (!consent.checked) {
                alert('Por favor, aceite a política de privacidade para continuar.');
                consent.focus();
                return;
            }

            this.submitForm();
        },

        handleWhatsAppSubmit: function(e) {
            e.preventDefault();

            if (!this.validateForm()) return;

            var consent = document.getElementById('consent');
            if (!consent.checked) {
                alert('Por favor, aceite a política de privacidade para continuar.');
                consent.focus();
                return;
            }

            this.sendToWhatsApp();
        },

        validateForm: function() {
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var phone = document.getElementById('phone');
            var subject = document.getElementById('subject');
            var message = document.getElementById('message');

            var valid = true;

            if (name.value.trim().length < 3) {
                this.showError(name.parentElement, 'Por favor, insira seu nome completo');
                valid = false;
            }

            if (!isValidEmail(email.value.trim())) {
                this.showError(email.parentElement, 'Por favor, insira um e-mail válido');
                valid = false;
            }

            if (!isValidPhone(phone.value.trim())) {
                this.showError(phone.parentElement, 'Por favor, insira um telefone válido');
                valid = false;
            }

            if (!subject.value) {
                this.showError(subject.parentElement, 'Por favor, selecione uma área');
                valid = false;
            }

            if (message.value.trim().length < 10) {
                this.showError(message.parentElement, 'Por favor, escreva uma mensagem');
                valid = false;
            }

            return valid;
        },

        validateField: function(input) {
            var value = input.value.trim();
            var type = input.type;
            var id = input.id;

            if (id === 'name' && value.length < 3) {
                this.showError(input.parentElement, 'Por favor, insira seu nome completo');
            } else if (id === 'email' && !isValidEmail(value)) {
                this.showError(input.parentElement, 'Por favor, insira um e-mail válido');
            } else if (id === 'phone' && !isValidPhone(value)) {
                this.showError(input.parentElement, 'Por favor, insira um telefone válido');
            } else if (id === 'message' && value.length < 10) {
                this.showError(input.parentElement, 'Por favor, escreva uma mensagem');
            }
        },

        showError: function(formGroup, message) {
            formGroup.classList.add('error');
            var errorEl = formGroup.querySelector('.form-error');
            if (errorEl) {
                errorEl.textContent = message;
            }
        },

        clearError: function(formGroup) {
            formGroup.classList.remove('error');
        },

        submitForm: function() {
            var self = this;
            this.isSubmitting = true;

            var originalText = this.submitButton.innerHTML;
            this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            this.submitButton.disabled = true;

            // Simula envio (substituir por integração real)
            setTimeout(function() {
                self.showSuccessMessage();
                self.resetForm();
                
                self.submitButton.innerHTML = originalText;
                self.submitButton.disabled = false;
                self.isSubmitting = false;
            }, 2000);
        },

        sendToWhatsApp: function() {
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var subject = document.getElementById('subject');
            var subjectText = subject.options[subject.selectedIndex].text;
            var message = document.getElementById('message').value.trim();

            var whatsappMessage = 
                '🏛️ *KARDEC ADVOCACIA - Novo Contato*\n\n' +
                '📋 *Dados do Cliente:*\n' +
                '━━━━━━━━━━━━━━━━━━\n' +
                '👤 *Nome:* ' + name + '\n' +
                '📧 *E-mail:* ' + email + '\n' +
                '📱 *Telefone:* ' + phone + '\n' +
                '⚖️ *Área de Interesse:* ' + subjectText + '\n\n' +
                '💬 *Mensagem:*\n' +
                '━━━━━━━━━━━━━━━━━━\n' +
                message + '\n\n' +
                '━━━━━━━━━━━━━━━━━━\n' +
                '_Enviado pelo site Kardec Advocacia_';

            var encodedMessage = encodeURIComponent(whatsappMessage);
            var whatsappUrl = 'https://wa.me/' + this.whatsappNumber + '?text=' + encodedMessage;

            window.open(whatsappUrl, '_blank');
            this.showSuccessMessage();
        },

        showSuccessMessage: function() {
            var self = this;
            this.successMessage.classList.add('show');

            setTimeout(function() {
                self.successMessage.classList.remove('show');
            }, 5000);
        },

        resetForm: function() {
            this.form.reset();
            var formGroups = this.form.querySelectorAll('.form-group');
            var self = this;
            formGroups.forEach(function(group) {
                self.clearError(group);
            });
        }
    };


    // ═══════════════════════════════════════════════════════
    // APP - Inicialização Principal
    // ═══════════════════════════════════════════════════════

    var App = {
        init: function() {
            log('🚀 Initializing Kardec Advocacia...');

            // Força tema claro como padrão imediato
            this.forceDefaultTheme();

            // Inicializa módulos
            Navigation.init();
            Animations.init();
            ContactForm.init();

            // Funcionalidades adicionais
            this.hidePageLoader();
            this.setupScrollToTop();
            this.setupThemeToggle();
            this.setupHeroOrbs();
            this.updateCopyrightYear();
            this.preventEmptyLinks();

            log('✅ Application initialized!');
        },

        /**
         * Força tema claro como padrão absoluto
         */
        forceDefaultTheme: function() {
            var html = document.documentElement;
            var saved = localStorage.getItem('kardec-theme');
            // Se não há preferência salva, garante tema claro
            if (!saved) {
                html.setAttribute('data-theme', 'light');
            } else {
                html.setAttribute('data-theme', saved);
            }
        },

        /**
         * Esconde o loader após carregamento
         */
        hidePageLoader: function() {
            var loader = document.getElementById('pageLoader');
            if (!loader) return;
            
            // Aguarda um pouco para a animação completar
            setTimeout(function() {
                loader.classList.add('loaded');
                // Remove do DOM após animação
                setTimeout(function() {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 600);
            }, 1200);
        },

        /**
         * Efeito interativo nos orbs do hero (desktop only)
         */
        setupHeroOrbs: function() {
            var heroOrbs = document.getElementById('heroOrbs');
            var hero = document.querySelector('.hero');
            
            if (!heroOrbs || !hero || isMobile()) return;
            
            // Parallax suave com movimento do mouse
            hero.addEventListener('mousemove', function(e) {
                var rect = hero.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                
                var orbs = heroOrbs.querySelectorAll('.hero-orb');
                orbs.forEach(function(orb, index) {
                    var speed = (index + 1) * 15;
                    var rotateSpeed = (index + 1) * 5;
                    orb.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px) rotate(' + (x * rotateSpeed) + 'deg)';
                });
            });
            
            // Reset ao sair
            hero.addEventListener('mouseleave', function() {
                var orbs = heroOrbs.querySelectorAll('.hero-orb');
                orbs.forEach(function(orb) {
                    orb.style.transform = '';
                });
            });
        },

        /**
         * Toggle de tema claro/escuro (simplificado)
         */
        setupThemeToggle: function() {
            var btn = document.getElementById('themeToggle');
            var html = document.documentElement;
            
            if (!btn) return;
            
            btn.addEventListener('click', function() {
                var current = html.getAttribute('data-theme') || 'light';
                var next = current === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', next);
                localStorage.setItem('kardec-theme', next);
                
                log('🎨 Theme: ' + next);
            });
        },

        setupScrollToTop: function() {
            var scrollTopBtn = document.getElementById('scrollTop');
            if (!scrollTopBtn) return;

            window.addEventListener('scroll', throttle(function() {
                if (window.scrollY > 400) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }, 100));

            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },

        updateCopyrightYear: function() {
            var yearElement = document.querySelector('.footer-bottom p');
            if (yearElement) {
                var currentYear = new Date().getFullYear();
                yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
            }
        },

        preventEmptyLinks: function() {
            var emptyLinks = document.querySelectorAll('a[href="#"]');
            emptyLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                });
            });
        }
    };


    // ═══════════════════════════════════════════════════════
    // INICIALIZAÇÃO
    // ═══════════════════════════════════════════════════════

    // Aguarda DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            App.init();
        });
    } else {
        App.init();
    }

    // Expõe para debug
    window.KardecApp = App;

})();
