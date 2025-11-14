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

// ========================================================
// >>> MÓDULO DE SERVICIO DE AUTENTICACIÓN GLOBAL (AUTHSERVICE) <<<
// Esto almacena la sesión para toda la aplicación.
// ========================================================
const userSession = {
    isAuthenticated: false,
    userId: null,
    username: 'Invitado',
    level: 0,
    avatar: 'https://i.pinimg.com/736x/22/20/56/2220563187a6e72782c5e9ead2287ec5.jpg', // URL de avatar por defecto
    cromosObtenidos: 0,
    progresoAlbum: 0,
    sobresDisponibles: 0
};

const loadSession = (userData) => {
    if (userData) {
        // Asignar los datos del usuario después de un login exitoso o carga de datos
        userSession.isAuthenticated = true;
        userSession.userId = userData.id || userData.userId || localStorage.getItem('currentUserId');
        userSession.username = userData.username || userData.nombre; 
        userSession.level = userData.level || userData.nivel || 1;
        userSession.avatar = userData.avatarURL || userData.avatar || userSession.avatar; // Usa la URL real
        
        // Cargar estadísticas si vienen en la data
        userSession.cromosObtenidos = userData.cromosObtenidos || 0;
        userSession.progresoAlbum = userData.progresoAlbum || 0;
        userSession.sobresDisponibles = userData.sobresDisponibles || 0;

        // Almacenar el ID en localStorage para persistencia
        if (userSession.userId) {
            localStorage.setItem('currentUserId', userSession.userId);
        }
    } else {
        // Limpiar la sesión (usado al cerrar sesión)
        userSession.isAuthenticated = false;
        userSession.userId = null;
        localStorage.removeItem('currentUserId');
        // Redireccionar al login si es necesario
    }
};

const checkSession = () => {
    // Si la sesión no está activa en memoria, intenta cargarla desde localStorage
    if (!userSession.isAuthenticated) {
        const userId = localStorage.getItem('currentUserId');
        if (userId) {
            userSession.userId = userId;
            userSession.isAuthenticated = true; // Al menos sabemos que hay un ID
            return true;
        }
    }
    return userSession.isAuthenticated;
};

// Exportar las funciones y el estado al objeto window
window.AuthService = {
    session: userSession,
    loadSession,
    checkSession
};
// ========================================================
// >>> FIN MÓDULO DE SERVICIO DE AUTENTICACIÓN GLOBAL <<<
// ========================================================



// Inicializar toast container cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
});