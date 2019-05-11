import expect from 'expect';

window.expect = expect;

// Expect to fail on console log error
afterAll(() => {
  expect(console.error).not.toHaveBeenCalled();
})
