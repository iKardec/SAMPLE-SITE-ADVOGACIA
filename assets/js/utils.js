/**
 * ========================================
 * UTILS.JS - Funções Utilitárias
 * ========================================
 * Funções auxiliares reutilizáveis em todo o projeto
 */

/**
 * Debounce - Limita a execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {Number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce aplicado
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle - Limita a frequência de execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {Number} limit - Limite de tempo em ms
 * @returns {Function} - Função com throttle aplicado
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Verifica se um elemento está visível na viewport
 * @param {HTMLElement} element - Elemento a ser verificado
 * @param {Number} offset - Offset adicional em pixels
 * @returns {Boolean} - True se visível
 */
export function isInViewport(element, offset = 0) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight - offset) && ((rect.top + rect.height) >= offset);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
  return vertInView && horInView;
}

/**
 * Detecta se o dispositivo é mobile
 * @returns {Boolean} - True se for mobile
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 768;
}

/**
 * Obtém a altura do scroll da página
 * @returns {Number} - Posição do scroll em pixels
 */
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Scroll suave para um elemento
 * @param {String|HTMLElement} target - Seletor ou elemento alvo
 * @param {Number} offset - Offset do topo em pixels
 */
export function smoothScrollTo(target, offset = 0) {
  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target;
    
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Adiciona classe com delay
 * @param {HTMLElement} element - Elemento
 * @param {String} className - Nome da classe
 * @param {Number} delay - Delay em ms
 */
export function addClassWithDelay(element, className, delay = 0) {
  setTimeout(() => {
    element.classList.add(className);
  }, delay);
}

/**
 * Remove classe com delay
 * @param {HTMLElement} element - Elemento
 * @param {String} className - Nome da classe
 * @param {Number} delay - Delay em ms
 */
export function removeClassWithDelay(element, className, delay = 0) {
  setTimeout(() => {
    element.classList.remove(className);
  }, delay);
}

/**
 * Toggle de classe
 * @param {HTMLElement} element - Elemento
 * @param {String} className - Nome da classe
 */
export function toggleClass(element, className) {
  if (!element) return;
  element.classList.toggle(className);
}

/**
 * Valida email
 * @param {String} email - Email a ser validado
 * @returns {Boolean} - True se válido
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida telefone brasileiro
 * @param {String} phone - Telefone a ser validado
 * @returns {Boolean} - True se válido
 */
export function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

/**
 * Formata telefone
 * @param {String} phone - Telefone a ser formatado
 * @returns {String} - Telefone formatado
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}

/**
 * Mascara de telefone em tempo real
 * @param {HTMLInputElement} input - Input de telefone
 */
export function phoneMask(input) {
  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    e.target.value = formatPhone(value);
  });
}

/**
 * Anima número (counter)
 * @param {HTMLElement} element - Elemento com o número
 * @param {Number} target - Número alvo
 * @param {Number} duration - Duração da animação em ms
 */
export function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    element.textContent = Math.floor(current);
  }, 16);
}

/**
 * Obtém parâmetro da URL
 * @param {String} param - Nome do parâmetro
 * @returns {String|null} - Valor do parâmetro
 */
export function getUrlParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Cria elemento HTML a partir de string
 * @param {String} htmlString - String HTML
 * @returns {HTMLElement} - Elemento criado
 */
export function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

/**
 * Delay/Sleep
 * @param {Number} ms - Tempo em milissegundos
 * @returns {Promise} - Promise que resolve após o delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Log customizado para debug (apenas em desenvolvimento)
 * @param {String} message - Mensagem
 * @param {Any} data - Dados adicionais
 */
export function log(message, data = null) {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`[KARDEC] ${message}`, data || '');
  }
}
