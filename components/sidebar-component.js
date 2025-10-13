// Sidebar izquierdo (menú de navegación)
const SidebarComponent = {
  template: `
    <aside class="sidebar" aria-label="Navegación principal">
      <h2 class="logo">Fanscore</h2>
      <nav aria-label="Navegación principal">
        <a 
          v-for="item in menuItems" 
          :key="item.name"
          :href="item.link" 
          :class="{ active: item.active }"
          :aria-current="item.active ? 'page' : null"
        >
          <i :class="item.icon"></i> {{ item.name }}
        </a>
      </nav>
      <a href="#" class="logout" @click.prevent="$emit('logout')">
        <i class="fas fa-sign-out-alt"></i> Cerrar sesión
      </a>
    </aside>
  `,
  props: {
    menuItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['logout']
};