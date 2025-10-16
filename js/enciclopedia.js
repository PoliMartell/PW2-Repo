// Datos de jugadores
const playersData = [
    {
        id: "messi",
        name: "Lionel Messi",
        team: "psg",
        country: "argentina",
        position: "delantero",
        rating: 93,
        image: "https://i.pinimg.com/736x/f0/ee/49/f0ee4946471fcaef678fa207553920d7.jpg",
        fullName: "Lionel Andrés Messi",
        age: 36,
        height: "170 cm",
        weight: "72 kg",
        preferredFoot: "Izquierdo",
        description: "Considerado uno de los mejores futbolistas de todos los tiempos. Ganador de 8 Balones de Oro y múltiples títulos con el FC Barcelona y la selección argentina.",
        stats: {
            velocidad: 85,
            regate: 95,
            tiro: 92,
            defensa: 38,
            pase: 91,
            fisico: 65
        },
        skills: ["Regate excepcional", "Visión de juego", "Tiro preciso", "Control del balón"],
        achievements: ["8x Balón de Oro", "4x Champions League", "10x Liga Española", "Copa del Mundo 2022"]
    },
    {
        id: "cristiano",
        name: "Cristiano Ronaldo",
        team: "real-madrid", 
        country: "portugal",
        position: "delantero",
        rating: 92,
        image: "https://i.pinimg.com/736x/97/8d/fe/978dfe2eed24660a344f07c8784065c8.jpg",
        fullName: "Cristiano Ronaldo dos Santos Aveiro",
        age: 39,
        height: "187 cm",
        weight: "83 kg",
        preferredFoot: "Derecho",
        description: "Uno de los goleadores más prolíficos de la historia del fútbol. Conocido por su ética de trabajo, capacidad atlética y mentalidad ganadora.",
        stats: {
            velocidad: 89,
            regate: 88,
            tiro: 93,
            defensa: 34,
            pase: 82,
            fisico: 78
        },
        skills: ["Salto y juego aéreo", "Tiro potente", "Velocidad", "Fuerza física"],
        achievements: ["5x Balón de Oro", "5x Champions League", "7x Ligas de diferentes países", "Eurocopa 2016"]
    },
    {
        id: "mbappe",
        name: "Kylian Mbappé",
        team: "psg",
        country: "francia", 
        position: "delantero",
        rating: 91,
        image: "https://i.pinimg.com/736x/12/6b/a1/126ba187a5ac47712556da6bea570429.jpg",
        fullName: "Kylian Mbappé Lottin",
        age: 25,
        height: "178 cm",
        weight: "73 kg",
        preferredFoot: "Derecho",
        description: "Joven prodigio del fútbol mundial conocido por su explosiva velocidad y capacidad goleadora. Campeón del mundo con Francia en 2018.",
        stats: {
            velocidad: 97,
            regate: 92,
            tiro: 88,
            defensa: 36,
            pase: 80,
            fisico: 76
        },
        skills: ["Velocidad explosiva", "Definición", "Regate en velocidad", "Desmarques"],
        achievements: ["Copa del Mundo 2018", "5x Ligue 1", "Máximo goleador del Mundial 2022"]
    },
    {
        id: "neymar",
        name: "Neymar Jr",
        team: "psg",
        country: "brasil",
        position: "delantero", 
        rating: 89,
        image: "https://i.pinimg.com/736x/cd/b0/d7/cdb0d72d2a556da27688275141f01b5c.jpg",
        fullName: "Neymar da Silva Santos Júnior",
        age: 32,
        height: "175 cm",
        weight: "68 kg",
        preferredFoot: "Derecho",
        description: "Jugador técnico y creativo, conocido por su habilidad para el regate y la asistencia. Una de las mayores estrellas del fútbol brasileño.",
        stats: {
            velocidad: 90,
            regate: 94,
            tiro: 84,
            defensa: 32,
            pase: 86,
            fisico: 62
        },
        skills: ["Regate creativo", "Asistencias", "Control de balón", "Faltas"],
        achievements: ["Champions League 2015", "Copa Libertadores", "Medalla de Oro Olímpica 2016"]
    },
    {
        id: "modric",
        name: "Luka Modrić",
        team: "real-madrid",
        country: "croacia",
        position: "medio",
        rating: 88,
        image: "https://i.pinimg.com/736x/c7/5b/63/c75b63a6b5d5bd3ccba540c723f37d6d.jpg",
        fullName: "Luka Modrić",
        age: 38,
        height: "172 cm", 
        weight: "66 kg",
        preferredFoot: "Derecho",
        description: "Mediocampista elegante y visionario, ganador del Balón de Oro 2018. Conocido por su control del juego y precisión en los pases.",
        stats: {
            velocidad: 74,
            regate: 89,
            tiro: 76,
            defensa: 72,
            pase: 91,
            fisico: 68
        },
        skills: ["Visión de juego", "Pases largos", "Control del ritmo", "Técnica"],
        achievements: ["Balón de Oro 2018", "5x Champions League", "Subcampeón del Mundo 2018"]
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeEnciclopedia();
    setupEventListeners();
});

function initializeEnciclopedia() {
    renderPlayersCards();
    updateResultsCounter();
}

function renderPlayersCards() {
    const container = document.getElementById('playersContainer');
    container.innerHTML = '';

    playersData.forEach(player => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-player', player.id);
        card.setAttribute('data-team', player.team);
        card.setAttribute('data-country', player.country);
        card.setAttribute('data-position', player.position);

        card.innerHTML = `
            <div class="card-badge">${player.rating}</div>
            <div class="card-image">
                <img src="${player.image}" alt="${player.name}" loading="lazy">
                <div class="card-overlay">
                    <div class="card-team">${getTeamName(player.team)}</div>
                    <div class="card-country">${getCountryName(player.country)}</div>
                </div>
            </div>
            <div class="card-content">
                <h3>${player.name}</h3>
                <p class="card-position">${getPositionName(player.position)}</p>
            </div>
        `;

        card.addEventListener('click', () => openPlayerModal(player));
        container.appendChild(card);
    });
}

function getTeamName(teamId) {
    const teams = {
        'psg': 'PSG',
        'real-madrid': 'Real Madrid',
        'barcelona': 'Barcelona',
        'manchester-city': 'Manchester City',
        'liverpool': 'Liverpool'
    };
    return teams[teamId] || teamId;
}

function getCountryName(countryId) {
    const countries = {
        'argentina': 'Argentina',
        'portugal': 'Portugal',
        'francia': 'Francia',
        'brasil': 'Brasil',
        'croacia': 'Croacia',
        'españa': 'España'
    };
    return countries[countryId] || countryId;
}

function getPositionName(positionId) {
    const positions = {
        'portero': 'Portero',
        'defensa': 'Defensa',
        'medio': 'Mediocampista',
        'delantero': 'Delantero'
    };
    return positions[positionId] || positionId;
}

function setupEventListeners() {
    // Filtros
    const teamFilter = document.getElementById('teamFilter');
    const countryFilter = document.getElementById('countryFilter');
    const positionFilter = document.getElementById('positionFilter');
    const resetFilters = document.getElementById('resetFilters');
    const resetSearch = document.getElementById('resetSearch');

    [teamFilter, countryFilter, positionFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    resetFilters.addEventListener('click', () => {
        teamFilter.value = '';
        countryFilter.value = '';
        positionFilter.value = '';
        applyFilters();
    });

    if (resetSearch) {
        resetSearch.addEventListener('click', () => {
            teamFilter.value = '';
            countryFilter.value = '';
            positionFilter.value = '';
            applyFilters();
        });
    }

    // Modal
    const modal = document.getElementById('playerModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function applyFilters() {
    const teamFilter = document.getElementById('teamFilter').value;
    const countryFilter = document.getElementById('countryFilter').value;
    const positionFilter = document.getElementById('positionFilter').value;

    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        const team = card.getAttribute('data-team');
        const country = card.getAttribute('data-country');
        const position = card.getAttribute('data-position');

        const teamMatch = !teamFilter || team === teamFilter;
        const countryMatch = !countryFilter || country === countryFilter;
        const positionMatch = !positionFilter || position === positionFilter;

        if (teamMatch && countryMatch && positionMatch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    updateResultsCounter(visibleCount);
    toggleNoResultsMessage(visibleCount === 0);
}

function updateResultsCounter(count) {
    const total = playersData.length;
    const visible = count !== undefined ? count : total;
    
    let counter = document.querySelector('.results-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'results-counter';
        const filtersContainer = document.querySelector('.filters-container');
        filtersContainer.appendChild(counter);
    }
    
    counter.innerHTML = `Mostrando <span>${visible}</span> de <span>${total}</span> jugadores`;
}

function toggleNoResultsMessage(show) {
    const noResults = document.getElementById('noResults');
    const container = document.getElementById('playersContainer');
    
    if (show) {
        container.style.display = 'none';
        noResults.style.display = 'flex';
    } else {
        container.style.display = 'grid';
        noResults.style.display = 'none';
    }
}

function openPlayerModal(player) {
    const modal = document.getElementById('playerModal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="player-card-header">
            <div class="player-card-image">
                <img src="${player.image}" alt="${player.name}">
            </div>
            <div class="player-card-info">
                <h2 class="player-card-name">${player.name}</h2>
                <p class="player-card-position">${getPositionName(player.position)}</p>
                <div class="player-card-meta">
                    <div class="meta-item">
                        <span class="meta-label">Equipo</span>
                        <span class="meta-value">${getTeamName(player.team)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">País</span>
                        <span class="meta-value">${getCountryName(player.country)}</span>
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
                    <div class="stat-item">
                        <span class="stat-label">Velocidad</span>
                        <span class="stat-value">${player.stats.velocidad}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Regate</span>
                        <span class="stat-value">${player.stats.regate}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Tiro</span>
                        <span class="stat-value">${player.stats.tiro}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Defensa</span>
                        <span class="stat-value">${player.stats.defensa}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Pase</span>
                        <span class="stat-value">${player.stats.pase}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Físico</span>
                        <span class="stat-value">${player.stats.fisico}</span>
                    </div>
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

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('playerModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Exportar funciones para uso global
window.enciclopedia = {
    applyFilters,
    openPlayerModal,
    closeModal
};