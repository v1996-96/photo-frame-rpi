const isRoot = require('is-root');
const ipc = require('node-ipc');
const pigpioHandlers = require('./pigpio').setup();
const { ErrorMessage, isMessage } = require('./message');

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !isRoot()) {
    console.error('You should run rpi process as root!');
    process.exit(1);
}

ipc.config.id = 'photo-frame-rpi';
ipc.config.retry = 1500;

ipc.serve(() => {
    const handlers = {
        ...pigpioHandlers,
    };

    ipc.server.on('message', (data, socket) => {
        if (data.type && handlers[data.type]) {
            const action = handlers[data.type](data.payload);

            if (isMessage(action)) {
                ipc.server.emit(socket, 'message', action);
            }
        } else {
            ipc.server.emit(socket, 'message', ErrorMessage('Handler not found'));
        }
    });
});

ipc.server.start();
