/**
 * ========================================
 * FORM.JS - Validação e Envio de Formulário
 * ========================================
 * Gerencia validação em tempo real e envio do formulário de contato
 */

import { isValidEmail, isValidPhone, phoneMask, sleep } from './utils.js';

/**
 * Classe responsável pelo formulário de contato
 */
class ContactForm {
    constructor() {
        // Elementos DOM
        this.form = document.getElementById('contactForm');
        this.formGroups = document.querySelectorAll('.form-group');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.successMessage = document.getElementById('formSuccess');

        // Campos
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.subjectSelect = document.getElementById('subject');
        this.messageTextarea = document.getElementById('message');
        this.consentCheckbox = document.getElementById('consent');

        // Estado
        this.isSubmitting = false;

        // Inicializar
        if (this.form) {
            this.init();
        }
    }

    /**
     * Inicializa o formulário
     */
    init() {
        this.setupEventListeners();
        this.setupPhoneMask();
        this.log('Contact form initialized');
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Submit do formulário
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validação em tempo real
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.phoneInput.addEventListener('blur', () => this.validatePhone());
        this.subjectSelect.addEventListener('change', () => this.validateSubject());
        this.messageTextarea.addEventListener('blur', () => this.validateMessage());

        // Remove erro ao começar a digitar
        [this.nameInput, this.emailInput, this.phoneInput, this.messageTextarea].forEach(input => {
            input.addEventListener('input', () => {
                this.clearError(input.parentElement);
            });
        });

        this.subjectSelect.addEventListener('change', () => {
            this.clearError(this.subjectSelect.parentElement);
        });
    }

    /**
     * Configura máscara de telefone
     */
    setupPhoneMask() {
        if (this.phoneInput) {
            phoneMask(this.phoneInput);
        }
    }

    /**
     * Lida com o envio do formulário
     * @param {Event} e - Evento de submit
     */
    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) return;

        // Valida todos os campos
        const isValid = this.validateForm();

        if (!isValid) {
            this.log('Form validation failed');
            return;
        }

        // Verifica consentimento
        if (!this.consentCheckbox.checked) {
            alert('Por favor, aceite a política de privacidade para continuar.');
            return;
        }

        // Envia o formulário
        await this.submitForm();
    }

    /**
     * Valida o formulário completo
     * @returns {Boolean} - True se válido
     */
    validateForm() {
        const nameValid = this.validateName();
        const emailValid = this.validateEmail();
        const phoneValid = this.validatePhone();
        const subjectValid = this.validateSubject();
        const messageValid = this.validateMessage();

        return nameValid && emailValid && phoneValid && subjectValid && messageValid;
    }

    /**
     * Valida o campo nome
     * @returns {Boolean} - True se válido
     */
    validateName() {
        const value = this.nameInput.value.trim();

        if (value.length < 3) {
            this.showError(this.nameInput.parentElement, 'Por favor, insira seu nome completo');
            return false;
        }

        this.clearError(this.nameInput.parentElement);
        return true;
    }

    /**
     * Valida o campo email
     * @returns {Boolean} - True se válido
     */
    validateEmail() {
        const value = this.emailInput.value.trim();

        if (!isValidEmail(value)) {
            this.showError(this.emailInput.parentElement, 'Por favor, insira um e-mail válido');
            return false;
        }

        this.clearError(this.emailInput.parentElement);
        return true;
    }

    /**
     * Valida o campo telefone
     * @returns {Boolean} - True se válido
     */
    validatePhone() {
        const value = this.phoneInput.value.trim();

        if (!isValidPhone(value)) {
            this.showError(this.phoneInput.parentElement, 'Por favor, insira um telefone válido');
            return false;
        }

        this.clearError(this.phoneInput.parentElement);
        return true;
    }

    /**
     * Valida o campo assunto
     * @returns {Boolean} - True se válido
     */
    validateSubject() {
        const value = this.subjectSelect.value;

        if (!value) {
            this.showError(this.subjectSelect.parentElement, 'Por favor, selecione uma área');
            return false;
        }

        this.clearError(this.subjectSelect.parentElement);
        return true;
    }

    /**
     * Valida o campo mensagem
     * @returns {Boolean} - True se válido
     */
    validateMessage() {
        const value = this.messageTextarea.value.trim();

        if (value.length < 10) {
            this.showError(this.messageTextarea.parentElement, 'Por favor, escreva uma mensagem com pelo menos 10 caracteres');
            return false;
        }

        this.clearError(this.messageTextarea.parentElement);
        return true;
    }

    /**
     * Mostra erro em um campo
     * @param {HTMLElement} formGroup - Grupo do formulário
     * @param {String} message - Mensagem de erro (opcional)
     */
    showError(formGroup, message = null) {
        formGroup.classList.add('error');

        if (message) {
            const errorElement = formGroup.querySelector('.form-error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
    }

    /**
     * Limpa erro de um campo
     * @param {HTMLElement} formGroup - Grupo do formulário
     */
    clearError(formGroup) {
        formGroup.classList.remove('error');
    }

    /**
     * Envia o formulário
     */
    async submitForm() {
        this.isSubmitting = true;

        // Adiciona loading ao botão
        const originalText = this.submitButton.innerHTML;
        this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        this.submitButton.disabled = true;

        // Coleta dados do formulário
        const formData = {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim(),
            subject: this.subjectSelect.value,
            message: this.messageTextarea.value.trim(),
            timestamp: new Date().toISOString()
        };

        this.log('Submitting form', formData);

        // Simula envio (substituir por integração real)
        await sleep(2000);

        try {
            // AQUI VOCÊ DEVE INTEGRAR COM SEU BACKEND
            // Exemplo:
            // const response = await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });
            // 
            // if (!response.ok) throw new Error('Erro ao enviar');

            // Sucesso
            this.showSuccessMessage();
            this.resetForm();

            this.log('Form submitted successfully');

        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por telefone.');
        } finally {
            // Restaura botão
            this.submitButton.innerHTML = originalText;
            this.submitButton.disabled = false;
            this.isSubmitting = false;
        }
    }

    /**
     * Mostra mensagem de sucesso
     */
    showSuccessMessage() {
        this.successMessage.classList.add('show');

        // Esconde após 5 segundos
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);
    }

    /**
     * Reseta o formulário
     */
    resetForm() {
        this.form.reset();
        this.formGroups.forEach(group => this.clearError(group));
    }

    /**
     * Log helper
     * @param {String} message - Mensagem
     * @param {Any} data - Dados adicionais
     */
    log(message, data = null) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`[ContactForm] ${message}`, data || '');
        }
    }
}

// Exporta classe
export default ContactForm;
