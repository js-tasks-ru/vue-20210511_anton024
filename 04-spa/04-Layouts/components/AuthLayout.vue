<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page {
  text-align: center;
  text-decoration: none;
}

.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
