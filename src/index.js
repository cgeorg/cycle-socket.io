import xs from 'xstream';

export function makeSocketIODriver(socket) {
    function get(eventName, { multiArgs = false } = {}) {
        return xs.create({
            start(listener) {
                this.eventListener = multiArgs
                    ? (...args) => listener.next(args)
                    : arg => listener.next(arg);

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
        events$.addListener({
            next: event => publish(event.messageType, event.message),
            error: () => {},
            complete: () => {}
        });

        return {
            get,
            dispose: socket.destroy.bind(socket)
        }
    };
}
