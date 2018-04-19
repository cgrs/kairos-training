function aleatorio(min, max) {
  if (!(typeof min === 'number' && (typeof min === typeof max)))
    throw new Error('min and max should be numbers');
  if (min > max) [min, max] = [max, min]; // swap min and max in case min is greater than max
  /* min = min ^ max;
  max = max ^ min;
  min = min ^ max; */
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
