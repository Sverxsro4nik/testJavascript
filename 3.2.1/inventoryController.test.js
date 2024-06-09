const { inventory, addToInventory } = require('./inventoryController');

beforeEach(() => {
	inventory.set('cheesecake', 0);
});

test('cancels operation for invalid quantity', () => {
	expect(() => addToInventory('cheesecake', 'not a number')).toThrow();
	expect(inventory.get('cheesecake')).toEqual(0);
	expect(Array.from(inventory.entries())).toHaveLength(1);
});
