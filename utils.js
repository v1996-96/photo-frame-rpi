function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

module.exports = {
  clamp
}