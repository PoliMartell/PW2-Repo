// Funcionalidades del modal (separado para mantenerlo simple)
const enciclopedia = {
    openPlayerModal(player) {
        const modal = document.getElementById('playerModal');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = this.generateModalContent(player);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
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
                        <button class="action-btn">
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
        `;
    },
    
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