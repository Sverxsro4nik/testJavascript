const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const carts = new Map();
const investory = new Map();

router.get('/carts/:username/items', ctx => {
	const cart = carts.get(ctx.params.username);
	cart ? (ctx.body = cart) : (ctx.status = 404);
});

router.post('/carts/:username/items/:item', ctx => {
	const { username, item } = ctx.params;
	if (!investory.get(item)) {
		ctx.status = 404;
		return;
	}
	investory.set(item, investory.get(item) - 1);
	const newItems = carts.get(username) || [].concat(item);
	carts.set(username, newItems);
	ctx.body = newItems;
});

router.delete('/carts/:username/items/:item', ctx => {
	const { username, item } = ctx.params;
	const newItems = carts.get(username).filter(i => i !== item);
	carts.set(username, newItems);
	ctx.body = newItems;
});

app.use(router.routes());

module.exports = { app: app.listen(3000), investory };
