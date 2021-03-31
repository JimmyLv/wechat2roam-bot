const Schedule = require("../../src/model/schedule");
const Calendar = require("../../src/model/calendar");
const Storager = require("../../src/model/storager");
const storager = new Storager();


describe("Schedule", () => {
  it("should book failed given invalid date", () => {
    const calendar = new Calendar("2021-1-1");
    const schedule = new Schedule(calendar);
    expect(schedule.book("0329", "Seaborn")).toBe(false);
  });

  it("should book with date and user", () => {
    storager.clear();
    const calendar = new Calendar("2021-1-1");
    const schedule = new Schedule(calendar);
    schedule.book("0101", "Seaborn");
    expect(schedule.toString()).toContain(`#排期接龙`);
    expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn`);
    schedule.book("0101", "Diven");
    expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn\n  - Diven`);
  });

  it("should book with index and user", () => {
    storager.clear();
    const calendar = new Calendar("2021-1-1");
    const schedule = new Schedule(calendar);
    schedule.book("1", "Seaborn");
    expect(schedule.toString()).toContain(`#排期接龙`);
    expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn`);
    schedule.book("1", "Diven");
    expect(schedule.toString()).toContain(`1. 0101\n  - Seaborn\n  - Diven`);
  });

  it("should list 5 coming events", () => {
    const calendar = new Calendar("2021-1-1");
    const schedule = new Schedule(calendar);
    expect(schedule.toString()).toContain("1. 0101");
    expect(schedule.toString()).toContain("2. 0103");
    expect(schedule.toString()).toContain("3. 0105");
    expect(schedule.toString()).toContain("4. 0107");
    expect(schedule.toString()).toContain("5. 0109");
  });

  it("should update events when travel to new date", () => {
    const schedule = new Schedule(new Calendar("2021-1-1"));
    let text = schedule.toString();
    expect(text).toContain("0101");
    expect(text).toContain("0103");
    expect(text).toContain("0105");
    expect(text).toContain("0107");
    expect(text).toContain("0109");

    schedule.travelTo(new Calendar("2021-1-3"));
    text = schedule.toString();
    expect(text).not.toContain("0101");
    expect(text).toContain("0103");
    expect(text).toContain("0103");
    expect(text).toContain("0105");
    expect(text).toContain("0107");
    expect(text).toContain("0109");
    expect(text).toContain("0111");
  });
});
