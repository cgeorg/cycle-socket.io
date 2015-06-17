# Cycle-Socket.IO

A [Cycle](https://github.com/staltz/cycle) driver for applications using [Socket.IO](http://socket.io/)

##Usage

``` javascript
import Cycle from 'cyclejs';
import SocketIO from 'cycle-socket.io';

var computer = function ({socketIO, dom}) {
    const vtree$ = render(dom);

    const incomingMessages$ = socketIO.get('messageType');
    const outgoingMessages$ = stream$.map( eventData => {
      {
        messageType: 'someEvent',
        message: eventData
      }
    });
    
    return {dom: vtree$, socketIO: outgoingMessages$}
};

var socketIODriver = SocketIO.createSocketIODriver(window.location.origin);
var domDriver = Cycle.makeDOMDriver(document.body);
Cycle.run(computer, {
    dom: domDriver,
    socketIO: socketIODriver
});
```