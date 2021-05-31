const { getSolutionPath } = require('taskbook-test-utils');
const ContentTabs = require(getSolutionPath('components/ContentTabs')).default;
import { shallowMount, mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import VueRouter from 'vue-router';

describe('spa/ContentTabs', () => {
  describe('ContentTabs', () => {
    const TABS = [
      { to: '/a', text: 'a' },
      { to: '/b', text: 'b' },
    ];

    it('ContentTabs должен иметь параметр tabs', () => {
      const wrapper = shallowMount(ContentTabs, {
        propsData: { tabs: [] },
      });
      expect(wrapper.vm.$options.props.tabs).toBeTruthy();
    });

    it('ContentTabs должен рендерить список ссылок из tabs', () => {
      const wrapper = shallowMount(ContentTabs, {
        propsData: { tabs: TABS },
        stubs: { RouterLink: RouterLinkStub },
      });
      const links = wrapper.findAllComponents(RouterLinkStub).wrappers;
      const linksData = links.map((link) => ({ to: link.props('to'), text: link.text() }));
      expect(linksData).toEqual(TABS);
    });

    it('Активная вкладка должна иметь класс content-tabs__tab_active', async () => {
      const localVue = createLocalVue();
      localVue.use(VueRouter);
      const router = new VueRouter({
        routes: [{ path: '/a' }, { path: '/b' }],
      });
      const wrapper = mount(ContentTabs, {
        propsData: { tabs: TABS },
        localVue,
        router,
      });
      await router.replace('/b');
      const links = wrapper.findAll('a').wrappers;
      expect(links.map((link) => link.classes('content-tabs__tab_active'))).toEqual([false, true]);
    });
  });
});
