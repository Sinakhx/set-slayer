import SmartSet from '../lib/setSlayer';

describe("A suite for the Set-Slayer's SmartSet API", () => {
    it('should create a new SmartSet instance', () => {
        expect(new SmartSet()).toBeInstanceOf(SmartSet);
    });
});
