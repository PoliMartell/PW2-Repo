// Funcionalidades compartidas para autenticación
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que el componente auth esté disponible
    if (!customElements.get('auth-component')) {
        customElements.define('auth-component', class extends HTMLElement {
            constructor() {
                super();
            }

            // Método para mostrar notificaciones
            showNotification(message, isError = false) {
                const notification = document.createElement('div');
                notification.className = `notification ${isError ? 'error' : 'success'}`;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    background: ${isError ? '#E5253B' : '#009739'};
                    color: white;
                    font-weight: 500;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
                    transform: translateX(100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 1000;
                `;
                notification.innerHTML = `
                    <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
                    ${message}
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                    notification.style.opacity = '1';
                }, 100);
                
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }

            // Validación de email
            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            // Validación de contraseña
            validatePassword(password) {
                if (password.length < 6) {
                    return { isValid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
                }
                return { isValid: true, message: '' };
            }
        });
    }
});