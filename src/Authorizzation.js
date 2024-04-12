const AuthorizzationRecord = require('./AuthorizzationRecod');

class Authorizzation {
	add(name, options) {
			this[name] = new AuthorizzationRecord(options);
		}
		// rar = requiredAuthorizzationRecords
	check(rar, session, req) {
		if (!Array.isArray(rar)) {
			rar = [rar];
		}
		if (
			rar.filter(
				(record) => !(record instanceof AuthorizzationRecord)
			).length != 0
		) {
			throw new Error(
				'Error : some required Authorizzation are not an AuthorizzationRecord'
			);
		}

		var ret = {
			status: rar.length == 0 ? true : false,
			errors: []
		};

		rar.forEach((record) => {
			if (record.check(session, req)) {
				record.success();
				ret.status = true;
			} else {
				var err = record.error();
				ret.errors.push(err);
			}
		});

		return ret;
	}
}

module.exports = new Authorizzation();