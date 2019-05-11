// eslint-disable-next-line no-unused-vars
import expect from 'expect';

// This is called before each jest spec file to spy on error
window.console.error = jest.spyOn(window.console, 'error');
window.onerror = () => null;
