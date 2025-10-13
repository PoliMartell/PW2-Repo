// Componente de banner reutilizable
const BannerComponent = {
  template: `
    <div class="banner" :class="customClass">
      <div class="banner-text">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <button 
          v-if="buttonText" 
          @click="$emit('button-click')"
          :disabled="buttonDisabled"
          :class="buttonClass"
        >
          <i v-if="buttonIcon" :class="buttonIcon"></i> 
          {{ buttonText }}
        </button>
      </div>
    </div>
  `,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: ''
    },
    buttonIcon: {
      type: String,
      default: ''
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    },
    buttonClass: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    gradient: {
      type: String,
      default: 'default'
    }
  },
  emits: ['button-click']
};