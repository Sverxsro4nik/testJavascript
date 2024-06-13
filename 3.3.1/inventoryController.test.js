jest.mock('./logger', () => ({
	logInfo: jest.fn(),
	logError: jest.fn(),
}));
