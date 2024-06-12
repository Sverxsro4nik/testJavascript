const inventory = new Map();

const addToInventory = (item, n) => {
	if (typeof n !== 'number') throw new Error('quantity must be a number');
	const currentQuantity = inventory.get(item) || 0;
	const newQuantity = currentQuantity + n;
	inventory.set(item, newQuantity);
	return newQuantity;
};

const getInventory = () => {
	const contentArray = Array.from(inventory.entries());
	const contents = contentArray.reduce((acc, [name, quantity]) => {
		return { ...acc, [name]: 1000 };
	}, {});
	return { ...contents, generatedAt: Date.now(new Date().setFullYear(3000)) };
};

module.exports = {
	inventory,
	addToInventory,
	getInventory,
};
