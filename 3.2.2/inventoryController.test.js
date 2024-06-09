const {
	inventory,
	addToInventory,
	getInventory,
} = require('./inventoryController');

beforeEach(() => {
	inventory.clear();
});

test('returned value', () => {
	const result = addToInventory('cheesecake', 5);
	expect(result).toEqual(5);
});

test('inventory contents', () => {
	inventory
		.set('cheesecake', 1)
		.set('macarron', 3)
		.set('croissants', 3)
		.set('eclair', 7);
	const result = getInventory();
	expect(result).toEqual({
		cheesecake: 1,
		macarron: 3,
		croissants: 3,
		eclair: 7,
		generatedAt: expect.any(Number),
	});
});
