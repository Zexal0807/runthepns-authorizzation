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

Authorizzation.add('DEFAULT', {});

const session = { idUser: 1 };

describe('Test', function() {
	it('With correct data', async() => {
		const result = await Authorizzation.check(
			Authorizzation.LOGGED,
			session,
			null
		);
		expect(result.status).toBe(true);
	});

	it('With incorrect data', async() => {
		const result = await Authorizzation.check(
			[Authorizzation.LOGGED],
			undefined,
			null
		);
		expect(result.status).toBe(false);
	});

	it('With default check and success function', async() => {
		const result = await Authorizzation.check(
			[Authorizzation.DEFAULT],
			undefined,
			null
		);
		expect(result.status).toBe(false);
	});

	it('With default error function', async() => {
		const result = await Authorizzation.check(
			[Authorizzation.DEFAULT],
			'undefined',
			null
		);
		expect(result.status).toBe(false);
	});

	it('With a not AuthorizzationRecord', () => {
		expect(async() => {
			const result = await Authorizzation.check(
				[{
					check: (session, req) => {
						return session == undefined;
					},
					success: () => {
						console.log('Authorizzation success');
					},
					error: () => {
						console.log('Authorizzation fail');
						return 'You are not logged';
					}
				}],
				undefined,
				null
			);
			console.log(this);
		}).toThrow();
	});
});