<template>
  <div class="toast" :class="markup.class">
    <app-icon :icon="markup.icon" />
    <span>
      <slot>{{ message }}</slot>
    </span>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'AppToast',

  components: { AppIcon },

  props: {
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error'].includes(value),
    },

    message: {
      type: String,
    },
  },

  computed: {
    markup() {
      const toastTypesMarkup = {
        success: {
          class: 'toast_success',
          icon: 'check-circle',
        },

        error: {
          class: 'toast_error',
          icon: 'alert-circle',
        },
      };

      return toastTypesMarkup[this.type];
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
