<template>
  <div class="wrapper bg-grey">
    <the-header></the-header>
    <slot></slot>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
  name: 'BaseLayout',

  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
