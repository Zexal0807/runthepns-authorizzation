module.exports = class AuthorizzationToken {

    option = {
        mustBeLogged: true,
        mustBeNotLogged: false,
        canBeNotLogged: false,

        mustBeAthlete: false,
        mustBeCoach: false,
        mustBeProfessional: false

    };

    constructor(obj = {}) {
        Object.keys(obj).forEach(k => {
            this.option.k = obj.k;
        });
    }
}