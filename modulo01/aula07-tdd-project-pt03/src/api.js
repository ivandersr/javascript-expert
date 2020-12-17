const http = require('http');
const CarService = require('./services/carService');

const carsDatabase = require('../database/cars.json');
const carService = new CarService(carsDatabase);

const routes = {
  '/cars:get': async (request, response) => {
    const { customer, category, days } = request.url.query;
    const randomCar = await carService.rent(customer, category, days);
    response.write(randomCar);
    return response.end();
  },

  default: (request, response) => {
    response.write('Car Rental Service');
    return response.end();
  }
}

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  return chosen(request, response);
}

const api =
  http.createServer(handler)
    .listen(3333, '127.0.0.1', () => console.log('App running at', 3333));

module.exports = api;