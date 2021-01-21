const isPi = require('detect-rpi');
const { clamp } = require('../utils');

const isGPIOAvailable = process.env.NODE_ENV === 'production' && isPi();
const { Gpio } = isGPIOAvailable ? require('pigpio') : require('./mock');
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
