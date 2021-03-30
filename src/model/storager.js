const fs = require('fs')
const path = require('path')
const jsonFile = path.resolve(__dirname, '../config/db.json')

class Storager {
	constructor() {
		this.createFileIfNotExist();
	}

	set(key, value = '') {
		const json = this.readDb();
		json[key] = value;
		this.saveDb(json);
	}

	get(key) {
		const json = this.readDb();
		return json[key];
	}

	createFileIfNotExist() {
		if (!fs.existsSync(jsonFile)) {
			fs.writeFileSync(jsonFile, JSON.stringify({}))
		}
	}

	readDb() {
		let data = fs.readFileSync(jsonFile, 'utf-8');
		return JSON.parse(data.toString());
	}

	saveDb(json) {
		fs.writeFileSync(jsonFile, JSON.stringify(json));
	}

}

module.exports = Storager;
