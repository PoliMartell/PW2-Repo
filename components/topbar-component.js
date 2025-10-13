// Componente de barra superior
const TopbarComponent = {
  template: `
    <div class="topbar">
      <search-component 
        :placeholder="searchPlaceholder"
        :model-value="searchValue"
        @update:model-value="$emit('update:search', $event)"
      />
      <div class="quick-actions">
        <button 
          v-for="action in quickActions" 
          :key="action.name"
          class="action-btn"
          :title="action.title"
          @click="$emit('action-click', action.name)"
        >
          <i :class="action.icon"></i>
        </button>
      </div>
    </div>
  `,
  props: {
    searchPlaceholder: {
      type: String,
      default: 'Buscar...'
    },
    quickActions: {
      type: Array,
      default: () => [
        { name: 'notifications', icon: 'fas fa-bell', title: 'Notificaciones' },
        { name: 'settings', icon: 'fas fa-cog', title: 'Configuración' }
      ]
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  emits: ['action-click', 'update:search']
};