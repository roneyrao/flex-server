require('babel-polyfill');

import http from 'http';
import createLogger from './debug';
import createListener from './listener';
import { normalize } from './options-helper';

export default class Server {
  constructor(options) {
    options = options || {};
    this.logger = createLogger(options.debug);
    normalize(options, this.logger);
    this.options = options;
    this.listener = createListener(this.options, this.logger);
  }
  start() {
    this.server = http.createServer(this.listener);
    this.server.listen(this.options.port);
    this.logger.info(`Server listening on port ${this.options.port}`);
  }
  stop() {
    if (this.server.listening) {
      this.server.close();
      this.logger.info('Server stopped');
    }
  }
}