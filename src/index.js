import xs from 'xstream';

export function makeSocketIODriver(socket) {
    function get(eventName) {
        return xs.create({
            start(listener) {
                this.eventListener = (message) => {
                    listener.next(message);
                };

                socket.on(eventName, this.eventListener);
            },
            stop() {
                socket.removeListener(eventName, this.eventListener);
            },
            eventListener: null,
        });
    }

    function publish(messageType, message) {
        socket.emit(messageType, message);
    }

    return function socketIODriver(events$) {
        events$.map(event => publish(event.messageType, event.message));
        return {
            get,
            dispose: socket.destroy.bind(socket)
        }
    };
}
