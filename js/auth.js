// Funciones globales para autenticación
window.authUtils = {
    // Validación de email
    isValidEmail: (email) => {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validación de contraseña
    validatePassword: (password) => {
        if (!password || password.length < 6) {
            return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
        }
        return { isValid: true, message: '' };
    },
    
    // Sistema de Toast Messages
    showToast: (message, type = 'info', duration = 5000) => {
        try {
            let toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                toastContainer.className = 'toast-container';
                document.body.appendChild(toastContainer);
            }
            
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            const getToastIcon = (type) => {
                const icons = {
                    success: 'fa-check-circle',
                    error: 'fa-exclamation-circle',
                    warning: 'fa-exclamation-triangle',
                    info: 'fa-info-circle'
                };
                return icons[type] || 'fa-info-circle';
            };
            
            toast.innerHTML = `
                <div class="toast-icon">
                    <i class="fas ${getToastIcon(type)}"></i>
                </div>
                <div class="toast-content">${message}</div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="toast-progress"></div>
            `;
            
            // Agregar evento al botón de cerrar
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', function() {
                toast.classList.remove('show');
                toast.classList.add('hiding');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 400);
            });
            
            toastContainer.appendChild(toast);
            
            // Animación de entrada
            setTimeout(() => toast.classList.add('show'), 100);
            
            // Auto-remover después del tiempo especificado
            if (duration > 0) {
                setTimeout(() => {
                    toast.classList.remove('show');
                    toast.classList.add('hiding');
                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.parentNode.removeChild(toast);
                        }
                    }, 400);
                }, duration);
            }
            
            return toast;
        } catch (error) {
            console.error('Error showing toast:', error);
            // Fallback simple
            const fallbackTypes = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };
            alert(`${fallbackTypes[type] || ''} ${message}`);
        }
    }
};

// Inicializar toast container cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
});