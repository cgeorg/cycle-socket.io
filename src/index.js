import Rx from 'rx';
import io from 'socket.io-client';

function createSocketIODriver(socket) {
    if (typeof socket === 'string') {
        socket = io(socket);
    }

    function get(eventName) {
        return Rx.Observable.create(observer => {
            const sub = socket.on(eventName, function (message) {
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
        events$.forEach(event => publish(event.messageType, event.message));
        return {
            get,
            dispose: socket.destroy.bind(socket)
        }
    };
}

export default {createSocketIODriver};
