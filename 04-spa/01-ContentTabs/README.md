# ContentTabs

Требуется заменить ссылку на `<router-link>` и добавить цикл `v-for`. Для класса активной ссылки требуется параметр `active-class`.

В качестве ключа цикла можно использовать назначение ссылки.

```html
<template>
  <div class="content-tabs">
    <div class="content-tabs__nav">
      <router-link
        v-for="tab in tabs"
        :key="tab.to.name || tab.to"
        :to="tab.to"
        class="content-tabs__tab"
        active-class="content-tabs__tab_active"
      >
        {{ tab.text }}
      </router-link>
    </div>
    <div class="content-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentTabs',

  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
```
