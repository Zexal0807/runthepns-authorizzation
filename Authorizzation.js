module.exports = new class Authorizzation {

	add(name, obj) {
		obj = this.castObject(obj);
		this[name] = obj;
	}

	castObject(obj) {
		var defaultObj = {
			check: (session) => { return session != undefined; },
			success: () => {},
			error: () => { return null; }
		};
		return Object.assign(defaultObj, obj);
	}


	check(requiredConfig, session) {
		if (!Array.isArray(requiredConfig)) {
			requiredConfig = [requiredConfig];
		}

		var ret = {
			status: true,
			errors: []
		}

		requiredConfig.forEach(el => {
			if (el.check(session)) {
				el.success();
			} else {
				ret.status = false;
				var err = el.error();
				if (err != null) {
					ret.errors.push(err);
				}
			}
		});

		return ret;
	}
}