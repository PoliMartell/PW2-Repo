// Layout principal que incluye ambos sidebars y topbar
const LayoutComponent = {
  template: `
    <div class="dashboard">
      <sidebar-main 
        :menu-items="menuItems"
        @logout="handleLogout"
      />
      
      <main class="main">
        <topbar-component 
          :search-placeholder="topbar.searchPlaceholder"
          :quick-actions="topbar.actions"
          :search-value="searchValue"
          @action-click="handleTopbarAction"
          @update:search="handleSearch"
        />
        <slot></slot>
      </main>
      
      <profile-sidebar 
        :user="user"
        :stats="stats"
        :actions="actions"
        @action-click="handleAction"
      />
    </div>
  `,
  props: {
    menuItems: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => ({})
    },
    stats: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    topbar: {
      type: Object,
      default: () => ({
        searchPlaceholder: 'Buscar...',
        actions: [
          { name: 'notifications', icon: 'fas fa-bell', title: 'Notificaciones' },
          { name: 'settings', icon: 'fas fa-cog', title: 'Configuración' }
        ]
      })
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  emits: ['logout', 'action-click', 'topbar-action', 'search'],
  methods: {
    handleLogout() {
      this.$emit('logout');
    },
    handleAction(action) {
      this.$emit('action-click', action);
    },
    handleTopbarAction(action) {
      this.$emit('topbar-action', action);
    },
    handleSearch(value) {
      this.$emit('search', value);
    }
  }
};