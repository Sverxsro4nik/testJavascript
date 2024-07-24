const { inventory, removeFromInventory } = require('./inventoryController');

beforeEach(() => {
	inventory.set('cheesecake', 0);
});

describe('removeInventory error logic', () => {
	test('removeInventory', () => {
		try {
			removeFromInventory('cheesecake');
		} catch (error) {
			expect(error.message).toEqual('cheesecake is unavailable');
		}
	});
});

describe('removeInventory success logic', () => {
	beforeEach(() => {
		inventory.set('cheesecake', 1);
	});
	test('removeInventory', () => {
		removeFromInventory('cheesecake');
		expect(inventory.get('cheesecake')).toEqual(0);
	});
});

afterEach(() => inventory.clear());
