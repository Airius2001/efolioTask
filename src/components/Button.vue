<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    style: {
      type: String,
      default: 'filled',
      validator: (value) => ['outlined', 'filled'].includes(value)
    }
  },
  computed: {
    buttonClasses() {
      return [
        'btn',
        `btn-${this.color}`,
        `btn-${this.size}`,
        this.style === 'outlined' ? 'btn-outline' : ''
      ].join(' ');
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.onClick(event);
      }
    }
  }
}
</script>

<style scoped>
.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}

.btn-outline {
  background: none;
  border: 1px solid currentColor;
}
</style>
