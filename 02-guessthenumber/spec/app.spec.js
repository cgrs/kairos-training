describe('app', () => {
  let error = new Error('min and max should be numbers');
  it('should throw an error if no arguments are given', () => {
    expect(aleatorio).toThrow(error);
  });
  it('should throw an error if only one argument is given', () => {
    expect(() => aleatorio(4)).toThrow(error);
  });
  it('should throw an error if min and max are not numbers', () => {
    expect(() => aleatorio('','')).toThrow(error);
  });
  it('should return a random number between 0 and 1', () => {
    let rand = aleatorio(0,1);
    expect(rand).toBeGreaterThanOrEqual(0);
    expect(rand).toBeLessThanOrEqual(1);
  });
  it('should return a random number between 5 and 3', () => {
    let rand = aleatorio(5,3);
    expect(rand).toBeGreaterThanOrEqual(3);
    expect(rand).toBeLessThanOrEqual(5);
  });
});
