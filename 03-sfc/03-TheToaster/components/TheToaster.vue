<template>
  <div class="toasts">
    <toast v-for="toast in toasts" :id="toast.id" :key="toast.id" @stale="removeStale($event)">
      <div class="toast" :class="{ toast_success: toast.success, toast_error: !toast.success }">
        <app-icon :icon="toast.icon" />
        <span>{{ toast.message }}</span>
      </div>
    </toast>
  </div>
</template>

<script>
import AppIcon from './AppIcon';
import Toast from './Toast';

export default {
  name: 'TheToaster',

  components: { AppIcon, Toast },

  data() {
    return {
      toasts: [],
      count: 0,
    };
  },

  methods: {
    error(message) {
      this.toasts.push({ message: message, success: false, icon: 'alert-circle', id: this.count++ });
    },

    success(message) {
      this.toasts.push({ message: message, success: true, icon: 'check-circle', id: this.count++ });
    },

    removeStale(id) {
      this.toasts = this.toasts.filter((toast) => toast['id'] !== id);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
