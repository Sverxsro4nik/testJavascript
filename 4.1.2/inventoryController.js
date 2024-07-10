const inventory = new Map();

const removeInventory = item => {
	if (!inventory.has(item) || !inventory.get(item) > 0) {
		const error = new Error(`${item} is unavailable`);
		error.code = 400;
		throw error;
	}

	inventory.set(item, inventory.get(item) - 1);
};

module.exports = { inventory, removeInventory };
