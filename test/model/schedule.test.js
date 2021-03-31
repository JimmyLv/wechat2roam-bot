const Schedule = require('../../src/model/schedule');
const Calendar = require('../../src/model/calendar');
const Storage = require('../../src/model/storage');
const storage = new Storage();


describe('Schedule', () => {
	it('should book failed given invalid date', () => {
		const calendar = new Calendar('2021-1-1');
		const schedule = new Schedule(calendar);
		expect(schedule.book('0329', 'Seaborn')).toBe(false);
	});

	it('should book with date and user', () => {
		storage.clear();
		const calendar = new Calendar('2021-1-1');
		const schedule = new Schedule(calendar);
		schedule.book('0101', 'Seaborn');
		expect(schedule.toString()).toContain(`#排期接龙`);
		expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn`);
		schedule.book('0101', 'Diven');
		expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn\n  - Diven`);
	});

	it('should book with index and user', () => {
		storage.clear();
		const calendar = new Calendar('2021-1-1');
		const schedule = new Schedule(calendar);
		schedule.book('1', 'Seaborn');
		expect(schedule.toString()).toContain(`#排期接龙`);
		expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn`);
		schedule.book('1', 'Diven');
		expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn\n  - Diven`);
	});

	it('should list 5 coming events', () => {
		const calendar = new Calendar('2021-1-1');
		const schedule = new Schedule(calendar);
		expect(schedule.toString()).toContain('1. 0101');
		expect(schedule.toString()).toContain('2. 0103');
		expect(schedule.toString()).toContain('3. 0105');
		expect(schedule.toString()).toContain('4. 0107');
		expect(schedule.toString()).toContain('5. 0109');
	});

	it('should update events when travel to new date', () => {
		const schedule = new Schedule(new Calendar('2021-1-1'));
		let text = schedule.toString();
		expect(text).toContain('0101');
		expect(text).toContain('0103');
		expect(text).toContain('0105');
		expect(text).toContain('0107');
		expect(text).toContain('0109');

		schedule.travelTo(new Calendar('2021-1-3'));
		text = schedule.toString();
		expect(text).not.toContain('0101');
		expect(text).toContain('0103');
		expect(text).toContain('0103');
		expect(text).toContain('0105');
		expect(text).toContain('0107');
		expect(text).toContain('0109');
		expect(text).toContain('0111');
	});

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

	it('should get traveled events from old eventsData success when next day restart', function () {
		const storage = new Storage();
		storage.clear();
		const calendar = new Calendar('2021-1-1');
		const schedule = new Schedule(calendar);
		schedule.book('0101', 'Seaborn');
		schedule.book('0103', 'huisheng.jin');

		const newCalendar = new Calendar('2021-1-2');
		const newSchedule = new Schedule(newCalendar);
		let text = newSchedule.toString();
		expect(text).not.toContain('Seaborn');
		expect(text).toContain('huisheng.jin');
		expect(text).toContain('2. 0105');
		expect(text).toContain('3. 0107');
		expect(text).toContain('4. 0109');
		expect(text).toContain('5. 0111');
	});

});
