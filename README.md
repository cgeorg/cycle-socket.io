# Cycle-Socket.IO

A [Cycle](https://github.com/staltz/cycle) driver for applications using [Socket.IO](http://socket.io/)

##Usage

``` javascript
import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
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
var domDriver = makeDOMDriver(document.body);
Cycle.run(computer, {
    dom: domDriver,
    socketIO: socketIODriver
});
```

##API

### createSocketIODriver(socket|url)

Creates a socket.io driver which uses the provided socket, or initializes a socket to the given url if a string is passed
