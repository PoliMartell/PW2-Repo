// Funcionalidades del modal (separado para mantenerlo simple)
const enciclopedia = {
    openPlayerModal(player) {
        const modal = document.getElementById('playerModal');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = this.generateModalContent(player);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Cargar datos existentes
        this.loadComments(player.id);
        const userRating = this.getRating(player.id);
        if (userRating > 0) {
            this.setRating(player.id, userRating);
        }
        
        // Agregar event listener para cerrar modal
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => this.closeModal();
        
        // Cerrar al hacer click fuera
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        };
    },
    
    closeModal() {
        const modal = document.getElementById('playerModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    },
    
    generateModalContent(player) {
        return `
            <div class="player-card-header">
                <div class="player-card-image">
                    <img src="${player.image}" alt="${player.name}">
                </div>
                <div class="player-card-info">
                    <h2 class="player-card-name">${player.name}</h2>
                    <p class="player-card-position">${this.getPositionName(player.position)}</p>
                    <div class="player-card-meta">
                        <div class="meta-item">
                            <span class="meta-label">Equipo</span>
                            <span class="meta-value">${this.getTeamName(player.team)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">País</span>
                            <span class="meta-value">${this.getCountryName(player.country)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Edad</span>
                            <span class="meta-value">${player.age} años</span>
                        </div>
                    </div>
                    <div class="player-card-actions">
                        <button class="action-btn" onclick="enciclopedia.toggleFavorite('${player.id}')">
                            <i class="fas fa-star"></i> Favorito
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-share"></i> Compartir
                        </button>
                    </div>
                </div>
            </div>
            <div class="player-card-body">
                <div class="player-card-section">
                    <h3>Estadísticas</h3>
                    <div class="stats-grid">
                        ${Object.entries(player.stats).map(([stat, value]) => `
                            <div class="stat-item">
                                <span class="stat-label">${this.capitalizeFirst(stat)}</span>
                                <span class="stat-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="player-card-section">
                    <h3>Habilidades</h3>
                    <div class="skills-grid">
                        ${player.skills.map(skill => `
                            <div class="skill-item">
                                <i class="fas fa-check skill-icon"></i>
                                <span>${skill}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <h3>Logros</h3>
                    <div class="achievements-grid">
                        ${player.achievements.map(achievement => `
                            <div class="achievement-item">
                                <i class="fas fa-trophy achievement-icon"></i>
                                <span>${achievement}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="player-card-section" style="padding: 0 2rem 2rem;">
                <h3>Descripción</h3>
                <p class="player-card-description">${player.description}</p>
                
                <h3>Información Adicional</h3>
                <div class="player-card-info" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <p><strong>Nombre completo:</strong> ${player.fullName}</p>
                    <p><strong>Altura:</strong> ${player.height}</p>
                    <p><strong>Peso:</strong> ${player.weight}</p>
                    <p><strong>Pie preferido:</strong> ${player.preferredFoot}</p>
                </div>
            </div>

            <!-- SECCIÓN MEJORADA: COMENTARIOS Y CALIFICACIONES -->
            <div class="player-card-section comments-section">
                <div class="section-header">
                    <h3><i class="fas fa-comments"></i> Calificaciones y Comentarios</h3>
                    <div class="section-divider"></div>
                </div>
                
                <!-- Sistema de calificación mejorado -->
                <div class="rating-section">
                    <div class="rating-header">
                        <h4>¿Cómo calificas a ${player.name}?</h4>
                        <div class="rating-display">
                            <span class="rating-text" id="currentRating-${player.id}">Sin calificar</span>
                            <span class="average-rating" id="averageRating-${player.id}"></span>
                        </div>
                    </div>
                    <div class="rating-stars" id="ratingStars-${player.id}">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <span class="star" data-rating="${star}" onclick="enciclopedia.setRating('${player.id}', ${star})">
                                <i class="far fa-star"></i>
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Formulario de comentarios mejorado -->
                <div class="comments-form">
                    <div class="form-header">
                        <h4><i class="fas fa-edit"></i> Dejar un comentario</h4>
                        <span class="char-counter" id="charCounter-${player.id}">0/500</span>
                    </div>
                    <div class="input-container">
                        <textarea 
                            id="commentInput-${player.id}" 
                            placeholder="Comparte tu opinión sobre este jugador... ¿Qué te parece su rendimiento? ¿Cuál es su mejor cualidad?"
                            rows="4"
                            maxlength="500"
                            oninput="enciclopedia.updateCharCounter('${player.id}')"
                        ></textarea>
                        <div class="input-actions">
                            <button 
                                class="comment-btn" 
                                onclick="enciclopedia.submitComment('${player.id}')"
                            >
                                <i class="fas fa-paper-plane"></i> Publicar Comentario
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Lista de comentarios mejorada -->
                <div class="comments-list-section">
                    <div class="comments-header">
                        <h4><i class="fas fa-users"></i> Opiniones de la comunidad</h4>
                        <span class="comments-count" id="commentsCount-${player.id}">0 comentarios</span>
                    </div>
                    <div class="comments-list" id="commentsList-${player.id}">
                        <div class="no-comments">
                            <i class="fas fa-comment-slash"></i>
                            <p>Sé el primero en comentar sobre este jugador</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Sistema de notificaciones Toast
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(toast);
        
        // Animación de entrada
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto-remover después de 4 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle',
            favorite: 'fa-star'
        };
        return icons[type] || 'fa-info-circle';
    },

    // Nueva función para el contador de caracteres - CORREGIDA
    updateCharCounter(playerId) {
        const textarea = document.getElementById(`commentInput-${playerId}`);
        const counter = document.getElementById(`charCounter-${playerId}`);
        
        if (!textarea || !counter) return;
        
        const count = textarea.value.length;
        counter.textContent = `${count}/500`;
        
        if (count > 450) {
            counter.style.color = 'var(--rojo)';
        } else if (count > 300) {
            counter.style.color = 'var(--dorado)';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.6)';
        }
    },

    // Modificar loadComments - CORREGIDA
    loadComments(playerId) {
        const commentsList = document.getElementById(`commentsList-${playerId}`);
        const commentsCount = document.getElementById(`commentsCount-${playerId}`); // CORREGIDO: playerId en lugar de player.id
        
        if (!commentsList || !commentsCount) return;
        
        const comments = JSON.parse(localStorage.getItem('playerComments')) || {};
        const playerComments = comments[playerId] || [];
        
        commentsCount.textContent = `${playerComments.length} comentario${playerComments.length !== 1 ? 's' : ''}`;
        
        if (playerComments.length === 0) {
            commentsList.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comment-slash"></i>
                    <p>Sé el primero en comentar sobre este jugador</p>
                </div>
            `;
            return;
        }
        
        commentsList.innerHTML = playerComments.map(comment => `
            <div class="comment-item">
                <div class="comment-avatar">
                    ${comment.userAvatar || '👤'}
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <div class="comment-user">
                            <strong>${comment.user}</strong>
                            <span class="comment-badge">Fan</span>
                        </div>
                        <span class="comment-time">${comment.timestamp}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                    <div class="comment-actions">
                        <button class="comment-like" onclick="enciclopedia.likeComment('${playerId}', ${comment.id})">
                            <i class="far fa-thumbs-up"></i> Me gusta
                        </button>
                        <button class="comment-reply" onclick="enciclopedia.replyToComment('${playerId}', ${comment.id})">
                            <i class="far fa-comment"></i> Responder
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Modificar las funciones existentes para usar toasts
    setRating(playerId, rating) {
        const stars = document.querySelectorAll(`#ratingStars-${playerId} .star`);
        const currentRatingEl = document.getElementById(`currentRating-${playerId}`);
        
        if (!stars.length || !currentRatingEl) return;
        
        // Actualizar estrellas visualmente
        stars.forEach((star, index) => {
            const icon = star.querySelector('i');
            if (index < rating) {
                icon.className = 'fas fa-star';
                star.classList.add('selected');
            } else {
                icon.className = 'far fa-star';
                star.classList.remove('selected');
            }
        });
        
        currentRatingEl.textContent = `Tu calificación: ${rating}/5`;
        this.saveRating(playerId, rating);
        this.updateAverageRating(playerId);
        
        // Mostrar toast de confirmación
        this.showToast(`¡Calificación de ${rating} estrellas guardada!`, 'success');
    },

    submitComment(playerId) {
        const commentInput = document.getElementById(`commentInput-${playerId}`);
        if (!commentInput) return;
        
        const comment = commentInput.value.trim();
        
        if (!comment) {
            this.showToast('Por favor escribe un comentario', 'warning');
            return;
        }

        if (comment.length < 5) {
            this.showToast('El comentario debe tener al menos 5 caracteres', 'warning');
            return;
        }

        this.saveComment(playerId, comment);
        commentInput.value = '';
        this.loadComments(playerId);
        
        // Mostrar toast de confirmación
        this.showToast('¡Comentario publicado exitosamente!', 'success');
    },

    saveComment(playerId, comment) {
        let comments = JSON.parse(localStorage.getItem('playerComments')) || {};
        if (!comments[playerId]) {
            comments[playerId] = [];
        }
        
        const newComment = {
            id: Date.now(),
            text: comment,
            timestamp: new Date().toLocaleString('es-ES'),
            user: this.getCurrentUser() || 'Usuario Fan',
            userAvatar: this.getCurrentUserAvatar() || '👤'
        };
        
        comments[playerId].unshift(newComment);
        localStorage.setItem('playerComments', JSON.stringify(comments));
    },

    saveRating(playerId, rating) {
        let ratings = JSON.parse(localStorage.getItem('playerRatings')) || {};
        ratings[playerId] = rating;
        localStorage.setItem('playerRatings', JSON.stringify(ratings));
    },

    getRating(playerId) {
        const ratings = JSON.parse(localStorage.getItem('playerRatings')) || {};
        return ratings[playerId] || 0;
    },

    updateAverageRating(playerId) {
        // En una app real, aquí obtendrías el promedio de todos los usuarios
        const userRating = this.getRating(playerId);
        const averageEl = document.getElementById(`averageRating-${playerId}`);
        
        if (averageEl && userRating > 0) {
            averageEl.textContent = `(Tu calificación: ${userRating}/5)`;
        }
    },

    toggleFavorite(playerId) {
        let favorites = JSON.parse(localStorage.getItem('favoritePlayers')) || [];
        const playerName = this.getPlayerName(playerId); // Función segura
        const index = favorites.indexOf(playerId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            this.showToast(`❌ ${playerName} removido de favoritos`, 'favorite');
        } else {
            favorites.push(playerId);
            this.showToast(`⭐ ${playerName} agregado a favoritos`, 'favorite');
        }
        
        localStorage.setItem('favoritePlayers', JSON.stringify(favorites));
    },

    // Función segura para obtener nombre del jugador
    getPlayerName(playerId) {
        const playerNames = {
            'messi': 'Lionel Messi',
            'cristiano': 'Cristiano Ronaldo', 
            'mbappe': 'Kylian Mbappé',
            'neymar': 'Neymar Jr',
            'modric': 'Luka Modrić'
        };
        return playerNames[playerId] || 'Jugador';
    },

    getCurrentUser() {
        // En una app real, obtendrías el usuario actual de tu sistema de autenticación
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user ? user.username : 'Usuario Fan';
    },

    getCurrentUserAvatar() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user ? user.avatar : '👤';
    },

    likeComment(playerId, commentId) {
        this.showToast('¡Me gusta agregado!', 'info');
    },

    replyToComment(playerId, commentId) {
        this.showToast('Función de respuesta próximamente', 'info');
    },

    // Métodos de utilidad existentes
    getTeamName(teamId) {
        const teams = {
            'psg': 'PSG',
            'real-madrid': 'Real Madrid',
            'barcelona': 'Barcelona',
            'manchester-city': 'Manchester City',
            'liverpool': 'Liverpool'
        };
        return teams[teamId] || teamId;
    },
    
    getCountryName(countryId) {
        const countries = {
            'argentina': 'Argentina',
            'portugal': 'Portugal',
            'francia': 'Francia',
            'brasil': 'Brasil',
            'croacia': 'Croacia',
            'españa': 'España'
        };
        return countries[countryId] || countryId;
    },
    
    getPositionName(positionId) {
        const positions = {
            'portero': 'Portero',
            'defensa': 'Defensa',
            'medio': 'Mediocampista',
            'delantero': 'Delantero'
        };
        return positions[positionId] || positionId;
    },
    
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

// Hacer disponible globalmente
window.enciclopedia = enciclopedia;