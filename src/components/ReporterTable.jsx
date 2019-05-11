import React from 'react';
import PropTypes from 'prop-types';

export const reporterPropTypes = PropTypes.shape({
  self: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  requestsCount: PropTypes.number.isRequired,
  avatarUrls: PropTypes.instanceOf(Object)
});

export const ReporterRow = ({
  reporter: {
    displayName,
    avatarUrls,
    self,
    name,
    emailAddress,
    requestsCount
  }
}) => (
  <tr>
    <td headers="name">
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={self.substring(0, self.indexOf('/rest')) + `/secure/ViewProfile.jspa?name=${name}`}
      >
        <span style={{ verticalAlign: 'middle', marginRight: 5 }} className="aui-avatar aui-avatar-small">
          <span className="aui-avatar-inner">
            <img src={avatarUrls['24x24']} alt={displayName} />
          </span>
        </span>
        {displayName}
      </a>
    </td>
    <td headers="email">{emailAddress}</td>
    <td headers="requestsCount">{requestsCount}</td>
  </tr>
);

ReporterRow.propTypes = {
  reporter: reporterPropTypes.isRequired
};

const ReporterTable = ({ reporters }) => (
  <table className="aui">
    <thead>
      <tr>
        <th id="name">Name</th>
        <th id="email">Email</th>
        <th id="requestsCount"># of reported requests</th>
      </tr>
    </thead>
    <tbody>
      {reporters.map(reporter => (
        <ReporterRow key={reporter.key} reporter={reporter} />
      ))}
    </tbody>
  </table>
);

ReporterTable.propTypes = {
  reporters: PropTypes.arrayOf(reporterPropTypes).isRequired
};

export default ReporterTable;
