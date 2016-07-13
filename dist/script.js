'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _socketIoClient = require('socket.io-client');

var _socketIoClient2 = _interopRequireDefault(_socketIoClient);

function createSocketIODriver(socket) {
    if (typeof socket === 'string') {
        socket = (0, _socketIoClient2['default'])(socket);
    }

    function get(eventName) {
        return _rx2['default'].Observable.create(function (observer) {
            var sub = socket.on(eventName, function (message) {
                observer.onNext(message);
            });
            return function dispose() {
                sub.dispose();
            };
        });
    }

    function publish(messageType, message) {
        socket.emit(messageType, message);
    }

    return function socketIODriver(events$) {
        events$.forEach(function (event) {
            return publish(event.messageType, event.message);
        });
        return {
            get: get,
            dispose: socket.destroy.bind(socket)
        };
    };
}

exports['default'] = { createSocketIODriver: createSocketIODriver };
module.exports = exports['default'];
