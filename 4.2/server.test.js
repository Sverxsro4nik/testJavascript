const { app } = require('./server');
const { carts, addItemToCart } = require('./cartController');
const { inventory } = require('./inventoryController');
const fetch = require('isomorphic-fetch');
const request = require('supertest');
const apiRoot = 'http://localhost:3000';

afterAll(() => app.close());
afterEach(() => inventory.clear());

describe('add item to cart', () => {
	test('adding available item', async () => {
		inventory.set('cheesecake', 3);
		const response = await request(apiRoot)
			.post('/carts/test_user/items/cheesecake')
			.send({ item: 'cheesecake', quantity: 3 })
			.expect(200)
			.expect('Content-Type', /json/);
		const newItems = ['cheesecake', 'cheesecake', 'cheesecake'];
		expect(response.body).toEqual(newItems);
		expect(inventory.get('cheesecake')).toEqual(0);
		expect(carts.get('test_user')).toEqual(['cheesecake', 'cheesecake']);
	});
	test.skip('adding unavailable item', async () => {
		inventory.set('cheesecake', 0);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{
				method: 'POST',
			}
		);
		expect(response.status).toEqual(500);
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
