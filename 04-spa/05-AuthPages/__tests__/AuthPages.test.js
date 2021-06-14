import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils';
import VueRouter from 'vue-router';
import flushPromises from 'flush-promises';
const { getSolutionPath } = require('taskbook-test-utils');
const { routes } = require(getSolutionPath('router/index.js'));
const LoginPage = require(getSolutionPath('views/LoginPage')).default;
const RegisterPage = require(getSolutionPath('views/RegisterPage')).default;
const data = require(getSolutionPath('data'));

global.alert = jest.fn();

describe('spa/AuthPages', () => {
  const EMAIL = 'demo@email';
  const FULLNAME = 'Demo Organizer';
  const PASSWORD = 'password';

  const ERROR_LOGIN_RESPONSE = {
    statusCode: 403,
    message: 'Неверные учетные данные',
    error: 'Forbidden',
  };

  const ERROR_REGISTER_RESPONSE = {
    statusCode: 400,
    message: 'Пользователь с таким Email уже существует',
    error: 'Bad Request',
  };

  const SUCCESS_RESPONSE = {
    id: 2,
    fullname: FULLNAME,
    email: EMAIL,
  };

  describe('LoginPage', () => {
    let wrapper;
    let emailInput;
    let passwordInput;
    let form;

    beforeEach(() => {
      global.alert = jest.fn();

      wrapper = mount(LoginPage, {
        localVue: createLocalVue(),
        stubs: { RouterLink: RouterLinkStub },
        mocks: {
          $router: {
            push: () => {},
          },
          $route: {
            query: {},
          },
        },
      });
      const inputs = wrapper.findAll('input').wrappers;
      emailInput = inputs[0];
      passwordInput = inputs[1];
      form = wrapper.find('form');
    });

    it('LoginPage должен выводить "Требуется ввести Email" при сабмите без введённого email', async () => {
      await form.trigger('submit');
      jest.spyOn(data, 'login');
      expect(data.login).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Требуется ввести Email');
    });

    it('LoginPage должен выводить "Требуется ввести пароль" при сабмите c email, но без введённого пароля', async () => {
      await emailInput.setValue(EMAIL);
      jest.spyOn(data, 'login');
      await form.trigger('submit');
      expect(data.login).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Требуется ввести пароль');
    });

    it('LoginPage должен выводить сообщение об ошибке при сабмите с неверными данными', async () => {
      jest.spyOn(data, 'login').mockResolvedValueOnce(ERROR_LOGIN_RESPONSE);
      await emailInput.setValue(EMAIL);
      await passwordInput.setValue(PASSWORD);
      await form.trigger('submit');
      await flushPromises();
      expect(data.login).toHaveBeenCalledWith(EMAIL, PASSWORD);
      expect(global.alert).toHaveBeenCalledWith(ERROR_LOGIN_RESPONSE.message);
    });

    it('LoginPage должен выводить полное имя при сабмите с верными данными', async () => {
      jest.spyOn(data, 'login').mockResolvedValueOnce(SUCCESS_RESPONSE);
      await emailInput.setValue(EMAIL);
      await passwordInput.setValue(PASSWORD);
      await form.trigger('submit');
      await flushPromises();
      expect(data.login).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(SUCCESS_RESPONSE.fullname);
    });
  });

  describe('RegisterPage', () => {
    let wrapper;
    let emailInput;
    let fullnameInput;
    let passwordInput;
    let password2Input;
    let agreeInput;
    let form;

    beforeEach(() => {
      global.alert = jest.fn();

      wrapper = mount(RegisterPage, {
        localVue: createLocalVue(),
        stubs: { RouterLink: RouterLinkStub },
        mocks: {
          $router: {
            push: () => {},
          },
        },
      });
      const inputs = wrapper.findAll('input').wrappers;
      emailInput = inputs[0];
      fullnameInput = inputs[1];
      passwordInput = inputs[2];
      password2Input = inputs[3];
      agreeInput = inputs[4];
      form = wrapper.find('form');
    });

    afterEach(async () => {
      await wrapper.destroy();
    });

    it('RegisterPage должен выводить "Требуется ввести Email" при сабмите без введённого email', async () => {
      await form.trigger('submit');
      expect(global.alert).toHaveBeenCalledWith('Требуется ввести Email');
    });

    it('RegisterPage должен выводить "Требуется ввести полное имя" при сабмите без полного имени', async () => {
      await emailInput.setValue(EMAIL);
      await form.trigger('submit');
      expect(global.alert).toHaveBeenCalledWith('Требуется ввести полное имя');
    });

    it('RegisterPage должен выводить "Требуется ввести пароль" при сабмите без пароля', async () => {
      await emailInput.setValue(EMAIL);
      await fullnameInput.setValue(FULLNAME);
      await form.trigger('submit');
      expect(global.alert).toHaveBeenCalledWith('Требуется ввести пароль');
    });

    it('RegisterPage должен выводить "Пароли не совпадают" при сабмите с несовпадающими паролями', async () => {
      await emailInput.setValue(EMAIL);
      await fullnameInput.setValue(FULLNAME);
      await passwordInput.setValue(PASSWORD);
      await password2Input.setValue(PASSWORD + '2');
      await form.trigger('submit');
      expect(global.alert).toHaveBeenCalledWith('Пароли не совпадают');
    });

    it('RegisterPage должен выводить "Требуется согласиться с условиями" при сабмите без согласия', async () => {
      await emailInput.setValue(EMAIL);
      await fullnameInput.setValue(FULLNAME);
      await passwordInput.setValue(PASSWORD);
      await password2Input.setValue(PASSWORD);
      jest.spyOn(data, 'register');
      await form.trigger('submit');
      await flushPromises();
      expect(data.register).not.toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Требуется согласиться с условиями');
    });

    it('RegisterPage должен выводить сообщение ошибки при неуспешной регистрации', async () => {
      jest.spyOn(data, 'register').mockResolvedValueOnce(ERROR_REGISTER_RESPONSE);
      await emailInput.setValue(EMAIL);
      await fullnameInput.setValue(FULLNAME);
      await passwordInput.setValue(PASSWORD);
      await password2Input.setValue(PASSWORD);
      await agreeInput.setChecked(true);
      await form.trigger('submit');
      await flushPromises();
      expect(data.register).toHaveBeenCalledWith(EMAIL, FULLNAME, PASSWORD);
      expect(global.alert).toHaveBeenCalledWith(ERROR_REGISTER_RESPONSE.message);
    });

    it('RegisterPage должен выводить ID пользователя при успешной регистрации', async () => {
      jest.spyOn(data, 'register').mockResolvedValueOnce(SUCCESS_RESPONSE);
      await emailInput.setValue(EMAIL);
      await fullnameInput.setValue(FULLNAME);
      await passwordInput.setValue(PASSWORD);
      await password2Input.setValue(PASSWORD);
      await agreeInput.setChecked(true);
      await form.trigger('submit');
      await flushPromises();
      expect(data.register).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith(SUCCESS_RESPONSE.id);
    });
  });

  describe('With Router', () => {
    let localVue;
    let router;

    beforeEach(() => {
      localVue = createLocalVue();
      localVue.use(VueRouter);
      router = new VueRouter({ routes });
    });

    it('LoginPage должен рендериться на странице /login', async () => {
      const wrapper = mount(
        { template: '<router-view />' },
        {
          localVue,
          router,
        },
      );
      await router.replace('/login');
      expect(wrapper.findComponent(LoginPage).exists()).toBe(true);
    });

    it('RegisterPage должен рендериться на странице /register', async () => {
      const wrapper = mount(
        { template: '<router-view />' },
        {
          localVue,
          router,
        },
      );
      await router.replace('/register');
      expect(wrapper.findComponent(RegisterPage).exists()).toBe(true);
    });

    it('LoginPage не должен перенаправлять при неуспешной авторизации', async () => {
      jest.spyOn(data, 'login').mockResolvedValueOnce(ERROR_LOGIN_RESPONSE);
      await router.replace({ path: '/login', query: { from: '/register' } }).catch(() => {});
      const old_path = router.currentRoute.fullPath;
      const wrapper = mount(LoginPage, {
        localVue,
        router,
      });
      const inputs = wrapper.findAll('input').wrappers;
      await inputs[0].setValue(EMAIL);
      await inputs[1].setValue(PASSWORD);
      wrapper.find('form').trigger('submit');
      await flushPromises();
      expect(router.currentRoute.fullPath).toBe(old_path);
    });

    it('LoginPage должен перенаправлять на главную страницу при успешной авторизации, если отсутствует query параметр from', async () => {
      jest.spyOn(data, 'login').mockResolvedValueOnce(SUCCESS_RESPONSE);
      await router.replace({ path: '/login' }).catch(() => {});
      const wrapper = mount(LoginPage, {
        localVue,
        router,
      });
      const inputs = wrapper.findAll('input').wrappers;
      await inputs[0].setValue(EMAIL);
      await inputs[1].setValue(PASSWORD);
      wrapper.find('form').trigger('submit');
      await flushPromises();
      expect(router.currentRoute.path).toBe('/');
    });

    it('LoginPage должен перенаправлять на маршрут из query параметра from при успешной авторизации', async () => {
      const wrapper = mount(LoginPage, {
        localVue,
        router,
      });
      jest.spyOn(data, 'login').mockResolvedValueOnce(SUCCESS_RESPONSE);
      await router.replace({ path: '/login', query: { from: '/register' } }).catch(() => {});
      const inputs = wrapper.findAll('input').wrappers;
      await inputs[0].setValue(EMAIL);
      await inputs[1].setValue(PASSWORD);
      wrapper.find('form').trigger('submit');
      await flushPromises();
      expect(router.currentRoute.path).toBe('/register');
    });

    it('RegisterPage не должен перенаправлять при неуспешной регистрации', async () => {
      const wrapper = mount(RegisterPage, {
        localVue,
        router,
      });
      jest.spyOn(data, 'register').mockResolvedValueOnce(ERROR_REGISTER_RESPONSE);
      await router.push('/register').catch(() => {});
      const inputs = wrapper.findAll('input').wrappers;
      await inputs[0].setValue(EMAIL);
      await inputs[1].setValue(FULLNAME);
      await inputs[2].setValue(PASSWORD);
      await inputs[3].setValue(PASSWORD);
      await inputs[4].setChecked(true);
      wrapper.find('form').trigger('submit');
      await flushPromises();
      expect(router.currentRoute.path).toBe('/register');
    });

    it('RegisterPage должен перенаправлять на страницу входа при успешной регистрации', async () => {
      const wrapper = mount(RegisterPage, {
        localVue,
        router,
      });
      const SUCCESS_RESPONSE = {
        id: 6,
        fullname: 'Demo Organizer',
        email: 'demo@email.me',
      };
      jest.spyOn(data, 'register').mockResolvedValueOnce(SUCCESS_RESPONSE);
      await router.push('/register').catch(() => {});
      const inputs = wrapper.findAll('input').wrappers;
      await inputs[0].setValue(EMAIL);
      await inputs[1].setValue(FULLNAME);
      await inputs[2].setValue(PASSWORD);
      await inputs[3].setValue(PASSWORD);
      await inputs[4].setChecked(true);
      wrapper.find('form').trigger('submit');
      await flushPromises();
      expect(router.currentRoute.path).toBe('/login');
    });
  });
});
