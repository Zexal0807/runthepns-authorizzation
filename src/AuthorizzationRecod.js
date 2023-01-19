module.exports = class AuthorizzationRecord {
	check = (session, req) => {
		return session == undefined;
	};
	success = () => {
		// console.log('Authorizzation success');
	};
	error = () => {
		// console.log('Authorizzation fail');
		return 'You are not logged';
	};

	constructor({ check, success, error }) {
		this.check = check || this.check;
		this.success = success || this.success;
		this.error = error || this.error;
	}
};