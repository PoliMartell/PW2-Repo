// Sidebar derecho (perfil del usuario)
const ProfileComponent = {
  template: `
    <aside class="profile">
      <div class="user">
        <img :src="user.avatar" :alt="user.name" class="avatar">
        <h3>{{ user.username }}</h3>
        <p>Nivel {{ user.level }}</p>
      </div>
      <div class="profile-stats">
        <p v-for="stat in stats" :key="stat.label">
          <strong>{{ stat.label }}:</strong> <span>{{ stat.value }}</span>
        </p>
      </div>
      <div class="profile-actions">
        <button 
          v-for="action in actions" 
          :key="action.name"
          class="profile-btn"
          @click="$emit('action-click', action.name)"
        >
          <i :class="action.icon"></i> {{ action.name }}
        </button>
      </div>
    </aside>
  `,
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({})
    },
    stats: {
      type: Array,
      required: true,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['action-click']
};