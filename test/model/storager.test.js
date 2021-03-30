const Storager = require('../../src/model/storager');
const fs = require('fs')
const path = require('path')
describe('storage', function () {
	it('should save key-value item and get it success', function () {
		let storager = new Storager();
		storager.set('event', '排期接龙');
		let value = storager.get('event');
		expect(value.toString()).toBe('排期接龙');
	});

	it('should create db.json file when get key first without set ', function () {
		const jsonFile = path.resolve(__dirname, '../../src/config/db.json')
		if (fs.existsSync(jsonFile)) {
			fs.unlinkSync(jsonFile);
			expect(fs.existsSync(jsonFile)).toBe(false)
		}
		let storager = new Storager();
		let value = storager.get('event');
		expect(value).toBe(undefined);
		expect(fs.existsSync(jsonFile)).toBe(true);
	});

});
