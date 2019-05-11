import { asyncGetCreator } from '../lib/api-creators';
import { FETCH_PER_PAGE } from '../consts/jira-api';

export const fetchTopReportersFromRequests =  async function ({ httpClient, projectId }) {
  const asyncGet = asyncGetCreator(httpClient);

  try {
    const data = await asyncGet({
      url: `/rest/api/3/search?jql=project=${projectId}&maxResults=0`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const numberOfPages = Math.floor(data.total / FETCH_PER_PAGE) + (data.total % FETCH_PER_PAGE === 0 ? 0 : 1);
    const promises = [];

    for (let i = 0; i < numberOfPages; ++i) {
      promises.push(asyncGet({
        url: `/rest/api/3/search?jql=project=${projectId}&maxResults=${FETCH_PER_PAGE}&fields=reporter&startAt=${i * FETCH_PER_PAGE}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }));
    }

    const results = await Promise.all(promises);

    const issues = [].concat.apply([], results.map(result => result.issues));
    const reportersDict = {};
    issues.forEach(issue => {
      const reporter = issue.fields.reporter;
      const reporterId = reporter.key;

      if (reporterId in reportersDict) {
        reportersDict[reporterId].requestsCount += 1;
      } else {
        reportersDict[reporterId] = {
          ...reporter,
          requestsCount: 1
        };
      }
    });

    return Object.values(reportersDict).sort((a, b) => b.requestsCount - a.requestsCount);
  } catch(err) {
    console.error(err);
    throw err;
  }
};
