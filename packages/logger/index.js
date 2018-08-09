'use strict';

/**
 * @namespace logger
 */

var util = require('util');
var id = 0;

/**
 * @memberof logger
 * @constructor
 * @param {String} name - the logger name
 */
function Logger(name) {
  if (!name) {
    name = 'syst';
  }
  if (name.length > 4) {
    name = name.slice(0, 4); 
  }

  // map for 1/2/3
  switch (name.length) {
    case 1: name = ` :${name} `; break;
    case 2: name = ` ${name} `; break;
    case 3: name = `:${name}`; break;
  }
  this.name = name;
}

function createLoggerFunction(level) {
  return function() {
    var now = new Date();
    var line = `[${now}] <${this.name}> :: ` + util.format.apply(this, arguments);
    console[level](line);
  };
}

/**
 * log level: log
 */
Logger.prototype.log = createLoggerFunction('info');

/**
 * log level: info
 */
Logger.prototype.info = createLoggerFunction('info');

/**
 * log level: warn
 */
Logger.prototype.warn = createLoggerFunction('warn');

/**
 * log level: error
 */
Logger.prototype.error = createLoggerFunction('error');

/**
 * @example
 * var logger = require('logger')('some tag');
 * logger.log('test');
 *
 * @memberof logger
 * @function logger
 * @param {String} name - the log tag
 */
module.exports = function(name) {
  var logger = new Logger(name);
  // aliyun log?
  return logger;
};