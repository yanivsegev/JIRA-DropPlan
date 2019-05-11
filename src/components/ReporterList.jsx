import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import reporterReducer, { getTopReporters } from '../ducks/reporters';
import ReporterTable from './ReporterTable';

const ReporterList = ({ projectId }) => {
  const [state, dispatch] = useReducer(reporterReducer, { topReporters: [] });

  useEffect(() => {
    getTopReporters({ projectId, dispatch });
  }, []);

  const { topReporters } = state;
  return (
    <ReporterTable reporters={topReporters} />
  );
};

ReporterList.propTypes = {
  projectId: PropTypes.string.isRequired
};

export default ReporterList;
