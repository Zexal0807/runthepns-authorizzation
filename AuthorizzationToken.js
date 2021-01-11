module.exports = class AuthorizzationToken {

	option = {
		mustBeLogged: false,
		mustBeNotLogged: false,

		mustBeAthlete: false,
		mustBeCoach: false,
		mustBeProfessional: false

	};

	constructor(obj = {}) {
		Object.keys(obj).forEach(k => {
			this.option[k] = obj[k];
		});
	}
}