const { app } = require('./server');
const { carts, addItemToCart } = require('./cartController');
const { inventory } = require('./inventoryController');
const fetch = require('isomorphic-fetch');
const apiRoot = 'http://localhost:3000';

afterAll(() => app.close());
afterEach(() => inventory.clear());

describe('add item to cart', () => {
	test('adding available item', async () => {
		inventory.set('cheesecake', 1);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{ method: 'POST' }
		);
		expect(response.status).toEqual(200);
		expect(await response.json()).toEqual(['cheesecake']);
		expect(inventory.get('cheesecake')).toEqual(0);
	});
	test('adding unavailable item', async () => {
		inventory.set('cheesecake', 0);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{
				method: 'POST',
			}
		);
		expect(response.status).toEqual(400);
	});
});

describe('remove item from cart', () => {
	test('removing available item', async () => {
		inventory.set('cheesecake', 1);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{ method: 'DELETE' }
		);
		expect(response.status).toEqual(200);
	});
});

describe('get cart', () => {
	test('correct response', async () => {
		inventory.set('cheesecake', 1);
		const response = await fetch(`${apiRoot}/carts/test_user/items`, {
			method: 'GET',
		});
		expect(response.status).toEqual(200);
	});
});
