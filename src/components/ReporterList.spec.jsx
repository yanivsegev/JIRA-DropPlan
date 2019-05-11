import React from 'react';
import axios from 'axios';
import ReporterList from './ReporterList';
import { mount } from 'enzyme';
import { nextTick } from '../helpers/test-utils';
jest.mock('axios');

const reporters = [
  {
    self: 'http://local.test/rest/test',
    key: '1',
    name: 'name-1',
    displayName: 'Harry Potter',
    emailAddress: 'harry.potter@gmail.com',
    requestsCount: 2,
    avatarUrls: { '24x24': 'http://local.test/avatar1.png' }
  },
  {
    self: 'http://local.test/rest/test',
    key: '2',
    name: 'name-2',
    displayName: 'Ron Weasley',
    emailAddress: 'ron.weasley@gmail.com',
    requestsCount: 4,
    avatarUrls: { '24x24': 'http://local.test/avatar2.png' }
  },
  {
    self: 'http://local.test/rest/test',
    key: '3',
    name: 'name-3',
    displayName: 'Hermione Granger',
    emailAddress: 'hermione.granger@gmail.com',
    requestsCount: 10,
    avatarUrls: { '24x24': 'http://local.test/avatar3.png' }
  }
];

const originalError = console.error;

describe('ReporterList', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  const defaultProps = () => ({
    projectId: '1'
  });

  const render = (extraProps = {}) => (
    mount(<ReporterList {...defaultProps()} {...extraProps} />)
  );

  let wrapper;

  describe('with all reporters', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: reporters });
      wrapper = render();
    });
    it('should render ReporterList correctly', async () => {
      await nextTick();
      const wrapperText = wrapper.text();
      reporters.forEach(({ displayName }) => {
        expect(wrapperText).toContain(displayName);
      });
    });
  });

  describe('with no reporter', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: [] });
      wrapper = render();
    });
    it('should render ReporterList correctly', async () => {
      await nextTick();
      const wrapperText = wrapper.text();

      expect(wrapperText).toContain('No request has been created for this project');
    });
  });
});
