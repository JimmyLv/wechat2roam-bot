const fs = require('fs')
const path = require('path')
const jsonFile = path.resolve(__dirname, './db.json')

class Storager {
	constructor() {
	}

	set(key, value = '') {
		fs.readFile(jsonFile, (err, data) => {
			const json = data ? JSON.parse(data) : {}
			json[key] = value
			fs.writeFile(jsonFile, JSON.stringify(json), err => {
				console.log('写入成功')
			})
		})
	}

	get(key) {
		let data = fs.readFileSync(jsonFile,'utf-8');
		const json = data ? JSON.parse(data) : {}
		console.log(json[key]);
		return json[key];
	}
}

module.exports = Storager;
