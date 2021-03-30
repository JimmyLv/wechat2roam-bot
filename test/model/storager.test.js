const Storager = require('../../src/model/storager');
describe('storage', function () {
	it('should save key-value item and get it success', function () {
		let storager = new Storager();
		storager.set('event', '排期接龙');
		storager.set('event1', '排期接龙');
		let item = storager.get('event');
		expect(item).toBe('排期接龙');
	});
});
