// 
const UserProfileComponent = {
  template: `
    <div class="profile-container">
      <!-- Encabezado Perfil -->
      <section class="profile-header">
        <div class="avatar">
          <img :src="user.avatar" :alt="'Foto de perfil de ' + user.name">
          <button class="edit-avatar" aria-label="Editar avatar" @click="editAvatar">
            <i class="fas fa-camera"></i>
          </button>
        </div>
        <div class="user-info">
          <h1>{{ user.name }}</h1>
          <p class="username">{{ user.username }}</p>
          <p class="user-bio">{{ user.bio }}</p>
          
          <div class="user-stats-mini">
            <div class="stat-mini" v-for="stat in user.miniStats" :key="stat.label">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
          
          <button class="edit-btn" @click="editProfile">
            <i class="fas fa-edit"></i> Editar perfil
          </button>
        </div>
      </section>

      <!-- Grid de información -->
      <div class="profile-grid">
        <!-- Información personal -->
        <section class="profile-card">
          <h2><i class="fas fa-user"></i> Información personal</h2>
          <div class="profile-details">
            <div class="detail-item" v-for="detail in user.details" :key="detail.label">
              <i :class="detail.icon"></i>
              <div class="detail-content">
                <strong>{{ detail.label }}</strong>
                <span>{{ detail.value }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Estadísticas -->
        <section class="profile-card">
          <h2><i class="fas fa-chart-line"></i> Estadísticas</h2>
          <div class="stats-grid">
            <div class="stat-item" v-for="stat in user.stats" :key="stat.label">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
          
          <!-- Barra de progreso -->
          <div class="progress-container">
            <div class="progress-info">
              <span>Progreso del álbum {{ user.currentAlbum }}</span>
              <span>{{ user.progress }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: user.progress + '%' }"></div>
            </div>
          </div>
        </section>

        <!-- Logros -->
        <section class="profile-card">
          <h2><i class="fas fa-trophy"></i> Logros</h2>
          <div class="badges-container">
            <div class="badge" :class="badge.type" v-for="badge in user.badges" :key="badge.name">
              <i :class="badge.icon"></i>
              <span>{{ badge.name }}</span>
            </div>
          </div>
        </section>

        <!-- Actividad reciente -->
        <section class="profile-card">
          <h2><i class="fas fa-history"></i> Actividad reciente</h2>
          <div class="activity-feed">
            <div class="activity-item" v-for="activity in user.activities" :key="activity.id">
              <div class="activity-icon">
                <i :class="activity.icon"></i>
              </div>
              <div class="activity-content">
                <p v-html="activity.content"></p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: 'Carlos Rodríguez',
        username: '@carlos_futbolero',
        bio: '🔥 Coleccionista apasionado | Liga MX ⚽',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        currentAlbum: 'Liga MX 2024',
        progress: 94,
        miniStats: [
          { value: '328', label: 'Cromos' },
          { value: '94%', label: 'Completado' },
          { value: '156', label: 'Intercambios' }
        ],
        details: [
          { icon: 'fas fa-user', label: 'Nombre completo', value: 'Carlos Rodríguez Martínez' },
          { icon: 'fas fa-envelope', label: 'Email', value: 'carlos.futbol@email.com' },
          { icon: 'fas fa-calendar', label: 'Fecha de nacimiento', value: '15/08/1995' },
          { icon: 'fas fa-map-marker-alt', label: 'Ubicación', value: 'Guadalajara, México' },
          { icon: 'fas fa-futbol', label: 'Equipo favorito', value: 'Chivas Rayadas del Guadalajara' }
        ],
        stats: [
          { value: '94%', label: 'Álbum completado' },
          { value: '328', label: 'Cromos únicos' },
          { value: '47', label: 'Cromos repetidos' },
          { value: '156', label: 'Intercambios' }
        ],
        badges: [
          { name: 'Coleccionista Oro', icon: 'fas fa-crown', type: 'gold' },
          { name: 'Top 50 Mundial', icon: 'fas fa-medal', type: 'silver' },
          { name: 'Intercambiador Activo', icon: 'fas fa-bolt', type: 'bronze' },
          { name: 'Primer Álbum', icon: 'fas fa-star', type: '' }
        ],
        activities: [
          { 
            id: 1,
            icon: 'fas fa-exchange-alt',
            content: 'Intercambiaste <strong>Julián Quiñones</strong> por <strong>Rodolfo Pizarro</strong>',
            time: 'Hace 2 horas'
          },
          { 
            id: 2,
            icon: 'fas fa-gem',
            content: '¡Nuevo cromo raro! <strong>André-Pierre Gignac</strong>',
            time: 'Hace 5 horas'
          },
          { 
            id: 3,
            icon: 'fas fa-award',
            content: 'Logro desbloqueado: <strong>Coleccionista Oro</strong>',
            time: 'Ayer'
          }
        ]
      })
    }
  },
  emits: ['edit-avatar', 'edit-profile'],
  methods: {
    editAvatar() {
      this.$emit('edit-avatar', this.user);
    },
    editProfile() {
      this.$emit('edit-profile', this.user);
    }
  },
  mounted() {
    // Inicializar efectos después de que el componente se monte
    this.$nextTick(() => {
      this.initProfileEffects();
    });
  },
  methods: {
    editAvatar() {
      this.$emit('edit-avatar', this.user);
    },
    editProfile() {
      this.$emit('edit-profile', this.user);
    },
    initProfileEffects() {
      // Efectos de hover para estadísticas
      const statItems = this.$el.querySelectorAll('.stat-item');
      statItems.forEach((item) => {
        item.addEventListener('mouseenter', this.handleStatHover);
        item.addEventListener('mouseleave', this.handleStatLeave);
      });

      // Animación de la barra de progreso
      this.animateProgressBar();
    },
    handleStatHover(e) {
      e.target.style.transform = 'translateY(-8px) scale(1.05)';
      e.target.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.3)';
    },
    handleStatLeave(e) {
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.boxShadow = 'none';
    },
    animateProgressBar() {
      const progressFill = this.$el.querySelector('.progress-fill');
      if (progressFill) {
        setTimeout(() => {
          progressFill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 500);
      }
    }
  },
  beforeUnmount() {
    // Limpiar event listeners
    const statItems = this.$el.querySelectorAll('.stat-item');
    statItems.forEach((item) => {
      item.removeEventListener('mouseenter', this.handleStatHover);
      item.removeEventListener('mouseleave', this.handleStatLeave);
    });
  }
};