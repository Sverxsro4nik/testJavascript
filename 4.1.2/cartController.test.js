const { inventory } = require('./inventoryController');
const { carts, addItemToCart } = require('./cartController');
const fs = require('fs');

afterEach(() => inventory.clear());
afterEach(() => carts.clear());

describe('addItemToCart', () => {
	beforeEach(() => {
		fs.writeFileSync('log.txt', '');
	});

	test('adding unavailable item to cart', () => {
		carts.set('test_user', []);
		inventory.set('cheesecake', 0);
		try {
			addItemToCart('test_user', 'cheesecake');
		} catch (err) {
			const expectedError = new Error('cheesecake is unavailable');
			expectedError.code = 400;
			expect(err).toEqual(expectedError);
		}

		expect(carts.get('test_user')).toEqual([]);
		expect.assertions(2);
	});

	test('logging added items', () => {
		carts.set('test_user', []);
		inventory.set('cheesecake', 1);
		addItemToCart('test_user', 'cheesecake');
		expect(fs.readFileSync('log.txt', 'utf-8')).toEqual(
			"cheesecake added to test_user's cart\n"
		);
	});
});
