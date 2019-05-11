import React from 'react';
import ReporterTable, { ReporterRow } from './ReporterTable';
import { shallow } from 'enzyme';

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

describe('ReporterTable', () => {
  const defaultProps = () => ({
    reporters
  });

  const render = (extraProps = {}) => (
    shallow(<ReporterTable {...defaultProps()} {...extraProps} />)
  );

  let wrapper;

  describe('snapshot', () => {
    beforeEach(() => {
      wrapper = render();
    });
    it('should render ReporterTable correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('ReporterRow', () => {
  const defaultProps = () => ({
    reporter: reporters[0]
  });

  const render = (extraProps = {}) => (
    shallow(<ReporterRow {...defaultProps()} {...extraProps} />)
  );

  let wrapper;

  describe('snapshot', () => {
    beforeEach(() => {
      wrapper = render();
    });
    it('should render ReporterRow correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
