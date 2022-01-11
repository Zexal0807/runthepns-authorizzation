const assert = require('assert');

const Authorizzation = require('./../index');

Authorizzation.add('LOGGED', {
	check: (session) => {
		return session != undefined && Object.keys(session).length != 0;
	},
	success: () => {
		console.log('Success');
	},
	error: () => {
		console.log('Failed');
		return { status: 'Failed', msg: 'You must be logged in', code: 'A4' };
	}
});

describe('Test', function () {
	it('With correct data', async () => {
		const result = await Authorizzation.check(
			[Authorizzation.LOGGED],
			{ idUser: 1 },
			null
		);
		assert.equal(result.status, true);
	});
	it('With incorrect data', async () => {
		const result = await Authorizzation.check(
			[Authorizzation.LOGGED],
			undefined,
			null
		);
		assert.equal(result.status, false);
	});
});
