<template>
  <div class="toasts">
    <app-toast v-for="toast in toasts" :key="toast.id" :type="toast.type">
      {{ toast.message }}
    </app-toast>
  </div>
</template>

<script>
import AppToast from './AppToast';

const DELAY = 5000;

export default {
  name: 'TheToaster',

  components: { AppToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    error(message) {
      this.show('error', message);
    },

    success(message) {
      this.show('success', message);
    },

    show(type, message) {
      const toast = { type, message };

      toast.id = setTimeout(() => {
        const idToDelete = this.toasts.indexOf(toast);
        if (idToDelete !== -1) {
          this.toasts.splice(this.toasts.indexOf(toast), 1);
        }
      }, DELAY);

      this.toasts.push(toast);
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
