const mainRoute = require('./main/main');
const motocycleRoute = require('./motocycle/motocycle');
const signUpRoute = require('./users/sign-up-route');
const products = require('./products/products');

const router = {
  '/signup': signUpRoute,
  '/motocycle': motocycleRoute,
  '/products': products,
  'default': mainRoute,
};

module.exports = router;
