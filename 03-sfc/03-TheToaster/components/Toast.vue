<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
const DELAY = 5000;

export default {
  name: 'Toast',

  model: {
    prop: 'id',
    event: 'stale',
  },

  props: {
    id: {
      type: Number,
    },
  },

  created() {
    setTimeout(() => {
      this.$emit('stale', this.id);
    }, DELAY);
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
