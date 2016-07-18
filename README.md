# Cycle-Socket.IO

A [Cycle](https://github.com/staltz/cycle) driver for applications using [Socket.IO](http://socket.io/)

##Usage

``` javascript
import io from 'socket.io-client';
import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeSocketIODriver} from 'cycle-socket.io';

function main({socketIO, dom}) {
    const vtree$ = render(dom);

    const incomingMessages$ = socketIO.get('messageType');
    const outgoingMessages$ = stream$.map(eventData => ({
      messageType: 'someEvent',
      message: eventData,
    }));
    
    return {dom: vtree$, socketIO: outgoingMessages$}
};

var socketIODriver = makeSocketIODriver(io(window.location.origin));
var domDriver = makeDOMDriver(document.body);
run(main, {
    dom: domDriver,
    socketIO: socketIODriver
});
```

##API

### makeSocketIODriver(socket)

Creates a socket.io driver which uses the provided socket to listen to and emit events.

Note:

If the socket.io event listener gets more than one argument, it will be passed as an array to the stream handlers:

```js
socket.on('foo', (val1, val2) => { /* ... */ });

function main({ socketIO }) {
  const incomingMessages$ = socketIO.get('foo').map(([val1, val2]) => { /* ... */ });
  // ...
}
```
