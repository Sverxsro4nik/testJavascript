const { removeFromInventory } = require('./inventoryController');
const logger = require('./logger');

const carts = new Map();

const addItemToCart = (username, item) => {
	removeFromInventory(item);
	const newItems = (carts.get(username) || []).concat(item);
	if (compliesToItemLimit(newItems)) {
		carts.set(username, newItems);
		logger.log(`${item} added to ${username}'s cart`);
	}

	return newItems;
};

const compliesToItemLimit = cart => {
	const unitsPerItem = cart.reduce((itemMap, itemName) => {
		const quantity = itemMap[itemName] || 0;
		return { ...itemMap, [itemName]: quantity + 1 };
	}, {});
	return Object.values(unitsPerItem).every(quantity => quantity < 3);
};

module.exports = { carts, addItemToCart, compliesToItemLimit };
