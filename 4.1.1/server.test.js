const { app, investory } = require('./server');
const fetch = require('isomorphic-fetch');
const apiRoot = 'http://localhost:3000';

afterAll(() => app.close());
afterEach(() => investory.clear());

describe('add item to cart', () => {
	test('adding available item', async () => {
		investory.set('cheesecake', 1);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{ method: 'POST' }
		);
		expect(response.status).toEqual(200);
		expect(await response.json()).toEqual(['cheesecake']);
		expect(investory.get('cheesecake')).toEqual(0);
	});
	test('adding unavailable item', async () => {
		investory.set('cheesecake', 0);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{
				method: 'POST',
			}
		);
		expect(response.status).toEqual(404);
	});
});

describe('remove item from cart', () => {
	test('removing available item', async () => {
		investory.set('cheesecake', 1);
		const response = await fetch(
			`${apiRoot}/carts/test_user/items/cheesecake`,
			{ method: 'POST' }
		);
		expect(response.status).toEqual(200);
		expect(await response.json()).toEqual(['cheesecake']);
		expect(investory.get('cheesecake')).toEqual(0);
	});
});

describe('get cart', () => {
	test('correct response', async () => {
		investory.set('cheesecake', 1);
		const response = await fetch(`${apiRoot}/carts/test_user/items`, {
			method: 'GET',
		});
		expect(response.status).toEqual(200);
		expect(await response.json()).toEqual(['cheesecake']);
	});
});
