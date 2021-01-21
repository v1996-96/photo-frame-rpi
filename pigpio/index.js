const isPi = require('detect-rpi');
const { Gpio } = isPi() ? require('pigpio') : require('./mock');
const { clamp } = require('../utils');

const RANGE = 1000;
const backlight = new Gpio(18, { mode: Gpio.OUTPUT });

backlight.pwmFrequency(1000);
backlight.pwmRange(RANGE);

const setBacklightHandler = (value) => {
    backlight.pwmWrite(clamp(value, 0, RANGE));
};

const setup = () => ({
    setBacklight: setBacklightHandler,
});

module.exports = {
    setBacklightHandler,
    setup,
};
