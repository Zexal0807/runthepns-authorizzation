module.exports = class AuthorizzationRecord {
	constructor({ check, success, error }) {
		this.check = check;
		this.success = success;
		this.error = error;
	}
};