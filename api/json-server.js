// api/json-server.js
import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('./db.json'); // Your database file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default (req, res) => {
  server(req, res);
};
