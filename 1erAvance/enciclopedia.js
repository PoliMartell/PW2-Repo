document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const teamFilter = document.getElementById('teamFilter');
    const countryFilter = document.getElementById('countryFilter');
    const positionFilter = document.getElementById('positionFilter');
    const resetButton = document.getElementById('resetFilters');
    const resetSearchButton = document.getElementById('resetSearch');
    const playersCount = document.getElementById('playersCount');
    const noResults = document.getElementById('noResults');
    const playersContainer = document.getElementById('playersContainer');
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('playerModal');
    const closeModal = document.querySelector('.close');

    const playersData = {
        messi: {
            name: "Lionel Messi",
            team: "PSG",
            country: "Argentina",
            position: "Delantero",
            overall: 93,
            attack: 94,
            dribbling: 92,
            pace: 85,
            physical: 75,
            defense: 45,
            description: "Considerado uno de los mejores jugadores de todos los tiempos. Ha ganado 7 Balones de Oro y múltiples títulos con el FC Barcelona y la selección argentina."
        },
        cristiano: {
            name: "Cristiano Ronaldo",
            team: "Real Madrid",
            country: "Portugal",
            position: "Delantero",
            overall: 92,
            attack: 93,
            dribbling: 88,
            pace: 89,
            physical: 85,
            defense: 40,
            description: "Uno de los goleadores más prolíficos en la historia del fútbol. Ha ganado 5 Balones de Oro y ha triunfado en Inglaterra, España e Italia."
        },
        mbappe: {
            name: "Kylian Mbappé",
            team: "PSG",
            country: "Francia",
            position: "Delantero",
            overall: 91,
            attack: 92,
            dribbling: 90,
            pace: 96,
            physical: 80,
            defense: 42,
            description: "Joven talento francés que ya ha ganado una Copa del Mundo. Conocido por su velocidad excepcional y capacidad goleadora."
        },
        neymar: {
            name: "Neymar Jr",
            team: "PSG",
            country: "Brasil",
            position: "Delantero",
            overall: 89,
            attack: 90,
            dribbling: 93,
            pace: 90,
            physical: 65,
            defense: 38,
            description: "Uno de los jugadores más habilidosos del mundo. Destaca por su regate, visión de juego y capacidad para desequilibrar defensas."
        },
        modric: {
            name: "Luka Modrić",
            team: "Real Madrid",
            country: "Croacia",
            position: "Mediocampista",
            overall: 88,
            attack: 82,
            dribbling: 87,
            pace: 75,
            physical: 70,
            defense: 72,
            passing: 89,
            description: "Mediocentro de gran calidad técnica y visión de juego. Ganador del Balón de Oro 2018 y clave en el éxito del Real Madrid."
        }
    };

    // Almacenar comentarios por jugador
    const playerComments = {};

    // Filtrar jugadores
    function filterPlayers() {
        const searchText = searchInput.value.toLowerCase();
        const teamValue = teamFilter.value;
        const countryValue = countryFilter.value;
        const positionValue = positionFilter.value;

        let visibleCount = 0;

        cards.forEach(card => {
            const playerName = card.querySelector('h3').textContent.toLowerCase();
            const playerTeam = card.getAttribute('data-team');
            const playerCountry = card.getAttribute('data-country');
            const playerPosition = card.getAttribute('data-position');

            const matchesSearch = playerName.includes(searchText);
            const matchesTeam = !teamValue || playerTeam === teamValue;
            const matchesCountry = !countryValue || playerCountry === countryValue;
            const matchesPosition = !positionValue || playerPosition === positionValue;

            if (matchesSearch && matchesTeam && matchesCountry && matchesPosition) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        playersCount.textContent = visibleCount;
        noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
        
        // Animación para mostrar resultados
        if (visibleCount > 0) {
            const visibleCards = document.querySelectorAll('.card:not([style*="display: none"])');
            visibleCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 50);
                }, index * 100);
            });
        }
    }

    // Event listeners para filtros
    searchInput.addEventListener('input', filterPlayers);
    searchButton.addEventListener('click', filterPlayers);
    teamFilter.addEventListener('change', filterPlayers);
    countryFilter.addEventListener('change', filterPlayers);
    positionFilter.addEventListener('change', filterPlayers);

    resetButton.addEventListener('click', function () {
        searchInput.value = '';
        teamFilter.value = '';
        countryFilter.value = '';
        positionFilter.value = '';
        filterPlayers();
        
        // Efecto visual al resetear
        this.classList.add('resetting');
        setTimeout(() => {
            this.classList.remove('resetting');
        }, 500);
    });

    if (resetSearchButton) {
        resetSearchButton.addEventListener('click', function () {
            searchInput.value = '';
            filterPlayers();
        });
    }

    // --- Modal mejorado ---
    function openPlayerModal(playerData, imageSrc) {
    const modalBody = document.getElementById('modal-body');
    const playerId = Object.keys(playersData).find(key => playersData[key].name === playerData.name);
    
    // Cargar comentarios existentes si los hay
    const comments = playerComments[playerId] || [];
    const commentsHTML = comments.map(comment => `<p>💬 ${comment}</p>`).join('');
    
    modalBody.innerHTML = `
        <div class="player-card-header">
            <div class="player-card-image">
                <img src="${imageSrc}" alt="${playerData.name}">
            </div>
            <div class="player-card-info">
                <h2 class="player-card-name">${playerData.name}</h2>
                <p class="player-card-position">${playerData.position} | #10</p>
                
                <div class="player-card-meta">
                    <div class="meta-item">
                        <span class="meta-label">País</span>
                        <span class="meta-value">${playerData.country}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Club</span>
                        <span class="meta-value">${playerData.team}</span>
                    </div>
                </div>
                
                <div class="player-card-actions">
                    <button class="action-btn"><i class="fas fa-plus"></i> Seguir</button>
                    <button class="action-btn"><i class="fas fa-share-alt"></i> Compartir</button>
                </div>
            </div>
        </div>
        
        <div class="player-card-body">
            <div class="player-card-section">
                <h3>Estadísticas</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Velocidad</span>
                        <span class="stat-value">${playerData.pace}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Regate</span>
                        <span class="stat-value">${playerData.dribbling}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Tiro</span>
                        <span class="stat-value">${playerData.attack}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Pases</span>
                        <span class="stat-value">${playerData.passing || 80}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Defensa</span>
                        <span class="stat-value">${playerData.defense}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Físico</span>
                        <span class="stat-value">${playerData.physical}</span>
                    </div>
                </div>
            </div>
            
            <div class="player-card-section">
                <h3>Habilidades Especiales</h3>
                <div class="skills-grid">
                    <div class="skill-item">
                        <span>Velocidad explosiva</span>
                    </div>
                    <div class="skill-item">
                        <span>Definición</span>
                    </div>
                </div>
            </div>
            
            <div class="player-card-section">
                <h3>Logros Destacados</h3>
                <div class="achievements-grid">
                    <div class="achievement-item">
                        <span>Copa Mundial 2018</span>
                    </div>
                    <div class="achievement-item">
                        <span class="achievement-icon">⭐</span>
                        <span>5 Ligas Francesas</span>
                    </div>
                    <div class="achievement-item">
                        <span class="achievement-icon">⭐</span>
                        <span>Máximo goleador Ligue 1 (4 veces)</span>
                    </div>
                    <div class="achievement-item">
                        <span class="achievement-icon">⭐</span>
                        <span>Joven del año FIFA 2018</span>
                    </div>
                </div>
            </div>
            
            <div class="player-card-section">
                <h3>Biografía</h3>
                <div class="player-card-description"><p>${playerData.description}</p></div>
            </div>
            
                <h3 style="margin-top: 1.5rem;">Calificación</h3>
                <div class="rating-stars">
                    <span data-star="1">★</span>
                    <span data-star="2">★</span>
                    <span data-star="3">★</span>
                    <span data-star="4">★</span>
                    <span data-star="5">★</span>
                </div>
            <textarea id="commentBox" placeholder="Escribe tu comentario..." rows="3"></textarea>
                <button id="submitComment" class="comment-btn">Enviar comentario</button>
                <div id="commentsList" class="comments-list">${commentsHTML}</div>
        </div>
    `;

    // Resto del código para manejar estrellas y comentarios...
    modal.style.display = 'block';
    document.body.style.overflow = "hidden";

    // Interacción de estrellas
    const stars = modalBody.querySelectorAll('.rating-stars span');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-star'));
            currentRating = rating;
            stars.forEach(s => {
                s.classList.toggle('selected', parseInt(s.getAttribute('data-star')) <= rating);
            });
        });
        
        star.addEventListener('mouseover', () => {
            const hoverRating = parseInt(star.getAttribute('data-star'));
            stars.forEach(s => {
                s.classList.toggle('hover', parseInt(s.getAttribute('data-star')) <= hoverRating);
            });
        });
        
        star.addEventListener('mouseout', () => {
            stars.forEach(s => {
                s.classList.remove('hover');
                s.classList.toggle('selected', parseInt(s.getAttribute('data-star')) <= currentRating);
            });
        });
    });

    // Comentarios
    const commentsList = modalBody.querySelector('#commentsList');
    const submitComment = modalBody.querySelector('#submitComment');
    const commentBox = modalBody.querySelector('#commentBox');
    
    submitComment.addEventListener('click', () => {
        const text = commentBox.value.trim();
        if (text) {
            // Guardar comentario
            if (!playerComments[playerId]) {
                playerComments[playerId] = [];
            }
            playerComments[playerId].push(text);
            
            // Mostrar comentario
            const p = document.createElement('p');
            p.textContent = "💬 " + text;
            commentsList.appendChild(p);
            commentBox.value = '';
            
            // Efecto visual
            p.style.opacity = '0';
            p.style.transform = 'translateY(10px)';
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
                p.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }, 10);
        }
    });
    
    // Enviar comentario con Enter
    commentBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitComment.click();
        }
    });
}

    function closePlayerModal() {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('closing');
            document.body.style.overflow = "auto";
        }, 300);
    }

    cards.forEach(card => {
        card.addEventListener('click', function () {
            const playerId = this.getAttribute('data-player');
            const playerData = playersData[playerId];
            if (playerData) {
                // Efecto de clic en la tarjeta
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    openPlayerModal(playerData, this.querySelector('img').src);
                }, 200);
            }
        });
    });

    closeModal.addEventListener('click', closePlayerModal);
    window.addEventListener('click', e => { if (e.target === modal) closePlayerModal(); });
    window.addEventListener('keydown', e => { if (e.key === "Escape" && modal.style.display === 'block') closePlayerModal(); });

    // Efecto de carga inicial
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 300);
});