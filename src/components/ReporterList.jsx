import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import reporterReducer, { getTopReporters } from '../ducks/reporters';
import ReporterTable from './ReporterTable';

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
  return (
    <div>
      <ReporterTable reporters={topReporters} />
      <button onClick={handleRefreshClicked} style={{ marginTop: 5 }} className="aui-button aui-button" resolved="">
        <span className="aui-icon aui-icon-small aui-iconfont-refresh"></span>
        Refresh
      </button>
    </div>
  );
};

ReporterList.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default ReporterList;
