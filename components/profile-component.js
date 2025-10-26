// Sidebar derecho (perfil del usuario)
const ProfileComponent = {
  template: `
    <aside class="profile">
      <div class="user">
        <img :src="user.avatar" :alt="user.username" class="avatar">
        <h3>{{ user.username }}</h3>
        <p>Nivel {{ user.level }}</p>
      </div>

      <div class="profile-stats">
        <!-- Igual que en el HTML estático: etiquetas <p> con <strong> y <span> -->
        <p v-for="stat in stats" :key="stat.label">
          <strong>{{ stat.label }}:</strong>
          <span>{{ stat.value }}</span>
        </p>
      </div>

      <div class="profile-actions">
        <!-- Renderizamos siempre botones para mantener el mismo diseño. Si la acción tiene link, navegamos en el click; si no, emitimos evento. -->
        <button
          v-for="action in actions"
          :key="action.name"
          class="profile-btn"
          @click="handleAction(action)">
          <i :class="action.icon"></i>
          {{ action.name }}
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
  methods: {
    handleAction(action) {
      if (action && action.link) {
        // Navegar a la ruta indicada (mantener comportamiento de enlace pero con botón para diseño)
        window.location.href = action.link;
        return;
      }
      // Emitir el nombre de la acción para que la página lo maneje
      this.$emit('action-click', action && action.name ? action.name : action);
    }
  },
  emits: ['action-click']
};