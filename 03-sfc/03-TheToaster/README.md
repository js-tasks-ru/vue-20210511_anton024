# TheToaster

## Компонент AppToast

Создадим для тоста отдельный компонент с параметрами `type` с типом тоста и `message` - с сообщением. Для сообщения можно предоставить как слот, так и входной параметр.  Этот компонент будет выводить один тост. В него также нужно перенести часть стилей.

```html
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
```

## Хранение тостов

Следующее, что требуется сделать — добавить компоненту свойство в состоянии (`data`), например, `toasts`, в котором будет храниться список текущих тостов.

Именно этот список будет определять состояние компонента и будет выводиться в шаблоне.

Хранить в списке понадобится не только текст сообщения, но и его тип.
 
## Методы success, error

Осталось только реализовать собственно методы добавления тостов. Эти методы довольно простые. Требуется добавить новый тост в список тостов. 

Тут же можно используя `setTimeout` установить таймер на удаление этого тоста через 5 секунд.

## key списка тостов

Мы пока плохо знаем, что делает `key`. Но, если вы читали Style Guide, или используете линтер (возможно, встроенные в вашу среду разработки), то могли видеть ошибки об отсутствии `key` на элементе с директивой `v-for`.

Нет какого-либо естественного идентификатора у тоста. Можно создать случайный, счётчик, либо использовать, например, идентификатор его таймера.

## Решение

```html
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
          // Теоретически должно работать удаление просто первого тоста, например, методом unshift
          // Но это не очевидно, такое решение пришлось бы прокомментировать.
          // А можно просто найти нужный тост и удалить.
          // Такое решение ещё и универсальное, и будет работать, 
          // даже если в будущем мы захотим сделать тосты с разными таймерами
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
```
