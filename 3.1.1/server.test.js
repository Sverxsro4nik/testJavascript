const { app, investory, carts } = require('./server');
const fetch = require('isomorphic-fetch');

const apiRoot = 'http://localhost:3000';
const addItem = (username, item) =>
	fetch(`${apiRoot}/carts/${username}/items/${item}`, {
		method: 'POST',
	});

describe('addItem', () => {
	beforeEach(() => {
		carts.clear();
	});
	beforeEach(() => {
		investory.set('cheesecake', 1);
	});
	test('correct response', async () => {
		const addItemResponse = await addItem('Dmitriy', 'cheesecake');
		expect(addItemResponse.status).toEqual(200);
		expect(await addItemResponse.json()).toEqual(['cheesecake']);
	});
	test('inventory update', async () => {
		await addItem('Dmitriy', 'cheesecake');
		expect(investory.get('cheesecake')).toEqual(0);
	});
	test('cart update', async () => {
		await addItem('Dmitriy', 'cheesecake');
		expect(carts.get('Dmitriy')).toEqual(['cheesecake']);
	});
	test('soldout item', async () => {
		investory.set('cheesecake', 0);
		const addItemResponse = await addItem('Dmitriy', 'cheesecake');
		expect(addItemResponse.status).toEqual(404);
	});
});
afterAll(() => app.close());
