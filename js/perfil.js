// perfil.js - Lógica específica de la página de perfil

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏆 Página de perfil cargada correctamente');
    
    // Inicializar efectos visuales
    initHoverEffects();
    initProgressBarAnimation();
    initButtonInteractions();
    initAchievementEffects();
    initActivityFeedInteractions();
    initResponsiveBehavior();
});

/**
 * Efectos hover para elementos interactivos
 */
function initHoverEffects() {
    // Efectos para estadísticas
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.3)';
            this.style.background = 'rgba(255, 255, 255, 0.12)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // Efectos para tarjetas de perfil
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Efectos para badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.3)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Animación de la barra de progreso
 */
function initProgressBarAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Resetear ancho para la animación
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
            const targetWidth = progressFill.getAttribute('style')?.match(/width: (\d+)%/)?.[1] || '94';
            progressFill.style.width = targetWidth + '%';
            
            // Efecto de confeti al completar (simulado)
            if (parseInt(targetWidth) >= 90) {
                setTimeout(() => {
                    console.log('🎉 ¡Álbum casi completado!');
                }, 2000);
            }
        }, 800);
    }
}

/**
 * Interacciones con botones
 */
function initButtonInteractions() {
    // Botón editar avatar
    const editAvatarBtn = document.querySelector('.edit-avatar');
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('📸 Función de cambiar avatar en desarrollo', 'info');
            
            // Efecto visual temporal
            this.style.background = 'var(--verde)';
            setTimeout(() => {
                this.style.background = 'var(--gradiente-dorado)';
            }, 300);
        });
    }

    // Botón editar perfil
    const editProfileBtn = document.querySelector('.edit-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('✏️ Editor de perfil en desarrollo', 'info');
            
            // Efecto de pulso
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }
}

/**
 * Efectos para logros y achievements
 */
function initAchievementEffects() {
    const achievementItems = document.querySelectorAll('.badge');
    
    achievementItems.forEach((badge, index) => {
        // Animación escalonada al cargar
        setTimeout(() => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            badge.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
        
        // Efecto especial al hacer hover en logros dorados
        if (badge.classList.contains('gold')) {
            badge.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.boxShadow = 'none';
            });
        }
    });
}

/**
 * Interacciones con el feed de actividad
 */
function initActivityFeedInteractions() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach((item, index) => {
        // Animación de entrada escalonada
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 150);
        }, index * 150);
        
        // Interacción de click para expandir detalles
        item.addEventListener('click', function() {
            const activityText = this.querySelector('.activity-content p');
            if (activityText) {
                // Simular expansión de detalles
                this.classList.toggle('expanded');
                if (this.classList.contains('expanded')) {
                    activityText.style.maxHeight = 'none';
                    showNotification('📋 Mostrando detalles completos de la actividad', 'info');
                } else {
                    activityText.style.maxHeight = 'none';
                }
            }
        });
    });
}

/**
 * Comportamiento responsive
 */
function initResponsiveBehavior() {
    // Ajustar layout en resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            adjustLayoutForScreenSize();
        }, 250);
    });
    
    // Ajustar inicialmente
    adjustLayoutForScreenSize();
}

/**
 * Ajustar layout según tamaño de pantalla
 */
function adjustLayoutForScreenSize() {
    const screenWidth = window.innerWidth;
    const profileGrid = document.querySelector('.profile-grid');
    const statsGrid = document.querySelector('.stats-grid');
    
    if (screenWidth <= 768) {
        // Optimizar para móviles
        if (statsGrid) {
            statsGrid.style.gap = '0.5rem';
        }
        if (profileGrid) {
            profileGrid.style.gap = '1rem';
        }
    } else {
        // Restaurar valores desktop
        if (statsGrid) {
            statsGrid.style.gap = '1rem';
        }
        if (profileGrid) {
            profileGrid.style.gap = '1.5rem';
        }
    }
}

/**
 * Mostrar notificaciones al usuario
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gris-oscuro);
        color: var(--blanco);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        border-left: 4px solid var(--dorado);
        box-shadow: var(--sombra);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Botón cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--blanco);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 4000);
    
    document.body.appendChild(notification);
}

/**
 * Simular carga de datos del usuario
 */
function simulateUserDataLoad() {
    console.log('📊 Cargando datos del usuario...');
    
    // Simular delay de carga
    setTimeout(() => {
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length > 0) {
            console.log('✅ Datos del usuario cargados correctamente');
        }
    }, 1000);
}

/**
 * Efectos de scroll suave
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Contador animado para estadísticas (opcional)
 */
function initAnimatedCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 segundos
        const steps = 60;
        const stepValue = finalValue / steps;
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '');
            }
        }, duration / steps);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏆 Página de perfil cargada correctamente');
    
    // Inicializar todas las funcionalidades
    initHoverEffects();
    initProgressBarAnimation();
    initButtonInteractions();
    initAchievementEffects();
    initActivityFeedInteractions();
    initResponsiveBehavior();
    initSmoothScrolling();
    simulateUserDataLoad();
    
    // Opcional: Descomentar para activar contadores animados
    // initAnimatedCounters();
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Exportar funciones para uso global (si es necesario)
window.ProfileManager = {
    showNotification,
    simulateUserDataLoad,
    initAnimatedCounters
};