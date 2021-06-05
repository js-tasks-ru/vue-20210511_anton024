<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

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

.page.page_meetup-forms {
  padding: 70px 0;
}

@media all and (max-width: 992px) {
  .page.page_meetup-forms {
    padding: 48px 0;
  }
}
</style>
