<template>
  <button
    :style="buttonStyles"
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
    buttonStyles() {
      const colors = {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40'
      };

      const sizeStyles = {
        small: {
          padding: '0.25rem 0.5rem',
          fontSize: '0.875rem'
        },
        medium: {
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        },
        large: {
          padding: '0.75rem 1.5rem',
          fontSize: '1.25rem'
        }
      };

      const style = this.style === 'outlined'
        ? {
            background: 'none',
            border: `1px solid ${colors[this.color]}`,
            color: colors[this.color]
          }
        : {
            background: colors[this.color],
            border: 'none',
            color: '#fff'
          };

      return {
        ...style,
        ...sizeStyles[this.size],
        cursor: this.disabled ? 'not-allowed' : 'pointer',
        opacity: this.disabled ? 0.65 : 1,
        borderRadius: '0.25rem'
      };
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

