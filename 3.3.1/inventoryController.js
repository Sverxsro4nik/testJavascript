const { logInfo, logError } = require('./logger');

const inventory = new Map();

const addToInventory = (item, n) => {
	if (typeof n !== 'number') {
		logError({ n }, 'quantity must be a number');
		throw new Error('quantity must be a number');
	}
	const currentQuantity = inventory.get(item) || 0;
	const newQuantity = currentQuantity + n;
	inventory.set(item, newQuantity);
	logInfo(
		{ item, n, memory: process.memoryUsage().rss },
		'item added to inventory'
	);
	return newQuantity;
};

const getInventory = () => {
	const contentArray = Array.from(inventory.entries());
	const contents = contentArray.reduce((acc, [name, quantity]) => {
		return { ...acc, [name]: quantity };
	}, {});
	logInfo({ contents }, 'inventory contents fetched');
	return { ...contents, generatedAt: Date.now(new Date().setFullYear(3000)) };
};

module.exports = {
	inventory,
	addToInventory,
	getInventory,
};
