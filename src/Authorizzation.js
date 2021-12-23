const AuthorizzationRecord = require('./AuthorizzationRecod');

module.exports = new(class Authorizzation {
	add(name, options) {
		this[name] = new AuthorizzationRecord(options);
	}

	check(requiredAuthorizzationRecord, session, req) {
		if (!Array.isArray(requiredAuthorizzationRecord)) {
			requiredAuthorizzationRecord = [requiredAuthorizzationRecord];
		}
		if (
			requiredAuthorizzationRecord.filter(
				(record) => !(record instanceof AuthorizzationRecord)
			).length != 0
		) {
			console.error(
				'Error : some required Authorizzation are not an AuthorizzationRecord'
			);
		}

		var ret = {
			status: true,
			errors: []
		};

		requiredAuthorizzationRecord.forEach((record) => {
			if (record.check(session, req)) {
				record.success();
			} else {
				ret.status = false;
				var err = record.error();
				if (err != null) {
					ret.errors.push(err);
				}
			}
		});

		return ret;
	}
})();