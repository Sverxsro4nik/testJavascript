const Koa = require('koa');
const Router = require('koa-router');
const { inventory } = require('./inventoryController');
const { carts, addItemToCart } = require('./cartController');

const app = new Koa();
const router = new Router();

router.get('/carts/:username/items', ctx => {
	const cart = carts.get(ctx.params.username);
	cart ? (ctx.body = cart) : (ctx.status = 404);
});

router.post('/carts/:username/items/:item', ctx => {
	try {
		const { username, item } = ctx.params;
		const newItems = addItemToCart(username, item);
		ctx.body = newItems;
	} catch (error) {
		ctx.body = { message: error.message };
		ctx.status = error.code || 500;
		return;
	}
});

router.delete('/carts/:username/items/:item', ctx => {
	const { username, item } = ctx.params;
	const newItems = carts.get(username).filter(i => i !== item);
	carts.set(username, newItems);
	ctx.body = newItems;
});

app.use(router.routes());

module.exports = { app: app.listen(3000) };
