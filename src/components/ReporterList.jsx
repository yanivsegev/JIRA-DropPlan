import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import reporterReducer, { getTopReporters } from '../ducks/reporters';
import ReporterTable from './ReporterTable';

const RefreshButton = ({ onRefresh }) => (
  <button onClick={onRefresh} style={{ marginTop: 5 }} className="aui-button aui-button" resolved="">
    <span className="aui-icon aui-icon-small aui-iconfont-refresh"></span>
    Refresh
  </button>
);

RefreshButton.propTypes = {
  onRefresh: PropTypes.func.isRequired
};

const ReporterList = ({ projectId }) => {
  const [state, dispatch] = useReducer(reporterReducer, {
    topReporters: [],
    isLoading: true
  });

  useEffect(() => {
    getTopReporters({ projectId, dispatch });
  }, []);

  const handleRefreshClicked = () => getTopReporters({ projectId, dispatch });

  const { topReporters, isLoading } = state;
  if (isLoading) {
    return (
      <div className="loader">Loading...</div>
    );
  }

  if (!topReporters.length) {
    return (
      <div>
        <div>No request has been created for this project.</div>
        <RefreshButton onRefresh={handleRefreshClicked} />
      </div>
    )
  }

  return (
    <div>
      <ReporterTable reporters={topReporters} />
      <RefreshButton onRefresh={handleRefreshClicked} />
    </div>
  );
};

ReporterList.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default ReporterList;
