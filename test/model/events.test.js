const Calendar = require('../../src/model/calendar');
const Schedule = require('../../src/model/schedule');
const Storage = require('../../src/model/storage');
describe('Events', function () {
	it('should get old eventsData success when restart', function () {
		const storage = new Storage();
		storage.clear();
		const calendar = new Calendar('2021-1-1');
		const schedule = new Schedule(calendar);
		schedule.book('0101', 'Seaborn');

		const newSchedule = new Schedule(calendar);
		let text = newSchedule.toString();
		expect(text).toContain('Seaborn');
		expect(text).toContain('2. 0103');
		expect(text).toContain('3. 0105');
		expect(text).toContain('4. 0107');
		expect(text).toContain('5. 0109');
	});

});
