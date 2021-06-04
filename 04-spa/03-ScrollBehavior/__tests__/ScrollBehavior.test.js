const { getSolutionPath } = require('taskbook-test-utils');
const { router } = require(getSolutionPath('router/index.js'));

const scrollBehavior = router.options.scrollBehavior;

function createRoute(record = {}, subrecord) {
  const route = {
    name: 'name',
    meta: record.meta ?? {},
    path: '/',
    hash: record.hash,
    query: {},
    params: {},
    fullPath: '/',
    matched: subrecord ? [subrecord] : [],
  };
  route.matched.push(route);
  return route;
}

describe('spa/ScrollBehavior', () => {
  describe('ScrollBehavior', () => {
    it('По умолчанию страница прокручивается вверх', async () => {
      const to = createRoute();
      const from = createRoute();
      expect(scrollBehavior(to, from)).toMatchObject({ x: 0, y: 0 });
    });

    it('При переходе назад с savedPosition не изменяется положение прокрутки', async () => {
      const to = createRoute();
      const from = createRoute();
      const savedPosition = { x: 1, y: 2 };
      expect(scrollBehavior(to, from, savedPosition)).toMatchObject(savedPosition);
    });

    it('При наличии hash в маршруте прокручивается к нему', async () => {
      const hash = 'hash';
      const to = createRoute({ hash });
      const from = createRoute();
      expect(scrollBehavior(to, from)).toMatchObject({ selector: hash });
    });

    it('Если переход происходит между маршрутами, содержащими истинное meta свойство saveScrollPosition, положение прокрутки не должно меняться', async () => {
      const to = createRoute({ meta: { saveScrollPosition: true } });
      const from = createRoute({ meta: { saveScrollPosition: true } });
      expect(scrollBehavior(to, from)).toBe(false);
    });

    it('Если переход происходит между маршрутами, где только один содержит saveScrollPosition, остаётся поведение по умолчанию', async () => {
      const to = createRoute({ meta: { saveScrollPosition: true } });
      const from = createRoute();
      expect(scrollBehavior(to, from)).toMatchObject({ x: 0, y: 0 });
    });

    it('Если переход происходит между маршрутами, содержащими в цепочке маршрутов истинное meta свойство saveScrollPosition, положение прокрутки не должно меняться', async () => {
      const to = createRoute({}, { meta: { saveScrollPosition: true } });
      const from = createRoute({}, { meta: { saveScrollPosition: true } });
      expect(scrollBehavior(to, from)).toBe(false);
    });
  });
});
