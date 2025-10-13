// Componente de búsqueda reutilizable
const SearchComponent = {
  template: `
    <div class="search-container">
      <i class="fas fa-search"></i>
      <input 
        type="text" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
  `,
  props: {
    placeholder: {
      type: String,
      default: 'Buscar...'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
};