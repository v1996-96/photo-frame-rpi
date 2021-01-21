const { is, has } = require('ramda');

function Message(type, payload) {
    return { type, payload };
}

function ErrorMessage(message) {
    return Message('error', message);
}

function isMessage(obj) {
    return is(Object, obj) && has('type', obj) && has('payload', obj);
}

module.exports = {
    isMessage,
    Message,
    ErrorMessage,
};
