const AuthorizzationToken = require("./AuthorizzationToken");

module.exports = class Authorizzation {

    static NOT_LOGGED = new AuthorizzationToken({
        mustBeNotLogged: true
    });

    static LOGGED = new AuthorizzationToken({
        mustBeLogged: true
    });

    static LOGGED_AS_ATHLETE = new AuthorizzationToken({
        mustBeLogged: true,
        mustBeAthlete: true
    });

    static LOGGED_AS_COACH = new AuthorizzationToken({
        mustBeLogged: true,
        mustBeCoach: true
    });

    static LOGGED_AS_PROFESSIONAL = new AuthorizzationToken({
        mustBeLogged: true,
        mustBeProfessional: true
    });

    static merge(arr) {
        for (let i = 2; i < arr.length; i++) {
            Object.assign(arr[0], arr[i]);
        }
        return arr[0];
    }

    static execute(requiredToken, session) {
        return {
            status: true,
            errors: []
        }
    }

}