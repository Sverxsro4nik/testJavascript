const {
	addToInventory,
	inventory,
	getInventory,
} = require('./inventoryController');
const logger = require('./logger');

beforeEach(() => inventory.clear());
beforeAll(() => jest.spyOn(logger, 'logInfo').mockImplementation(jest.fn()));
afterEach(() => logger.logInfo.mockClear());

describe('addToInventory', () => {
	beforeEach(() => {
		jest
			.spyOn(process, 'memoryUsage')
			.mockReturnValueOnce({ rss: 1, heapTotal: 0, heapUsed: 0, external: 0 })
			.mockReturnValueOnce({ rss: 1, heapTotal: 0, heapUsed: 0, external: 0 })
			.mockReturnValueOnce({ rss: 3, heapTotal: 0, heapUsed: 0, external: 0 });
	});
	test('logging new items', async () => {
		jest.spyOn(logger, 'logInfo');
		addToInventory('cheesecake', 5);
		expect(logger.logInfo).toHaveBeenCalledTimes(1);
		const firstCallArgs = logger.logInfo.mock.calls[0];
		const [firstArg, secondArg] = firstCallArgs;
		expect(firstArg).toEqual({ item: 'cheesecake', n: 5, memory: 1 });
		expect(secondArg).toEqual('item added to inventory');
	});
});

describe('getInventory', () => {
	test('getInventory', () => {
		inventory.set('cheesecake', 2);
		getInventory('cheesecake', 2);
		expect(logger.logInfo).toHaveBeenCalledTimes(1);
		expect(logger.logInfo.mock.calls).toHaveLength(1);
		const firstCallArgs = logger.logInfo.mock.calls[0];
		const [firstArg, secondArg] = firstCallArgs;
		expect(firstArg).toEqual({ contents: { cheesecake: 2 } });
		expect(secondArg).toEqual('inventory contents fetched');
	});
});
