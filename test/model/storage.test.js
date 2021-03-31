const Storage = require('../../src/model/storage');
const fs = require('fs')
const path = require('path')
describe('storage', function () {
	it('should save key-value item and get it success', function () {
		let storage = new Storage();
		storage.set('event', '排期接龙');
		let value = storage.get('event');
		expect(value.toString()).toBe('排期接龙');
	});

	it('should create db.json file when get key first without set ', function () {
		const jsonFile = path.resolve(__dirname, '../../src/config/db.json')
		if (fs.existsSync(jsonFile)) {
			fs.unlinkSync(jsonFile);
			expect(fs.existsSync(jsonFile)).toBe(false)
		}
		let storage = new Storage();
		let value = storage.get('event');
		expect(value).toBe(undefined);
		expect(fs.existsSync(jsonFile)).toBe(true);
	});

});
