import React from 'react';
import { render } from 'react-dom';
import ReporterList from './components/ReporterList';

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId');

render((
  <ReporterList projectId={projectId} />
), document.getElementById('root'));
