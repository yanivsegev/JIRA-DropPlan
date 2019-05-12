import { asyncGetCreator } from '../lib/api-creators';
import { FETCH_PER_PAGE } from '../consts/jira-api';

/*
  After researching Jira Service Desk APIs documentation and Jira APIs documentation I came up with following approaches.
  1. Approach 1: Fetch all customers of current ServiceDesk then for each customer,
  use JQL to fetch TOTAL requests in current project which was reported by that user.
    - Advantages
        +  If we have small number of customers but large amount of issues then it would be fast since we are just fetching TOTAL count of each customers.
        e.g. if we have only 10 customers but we have 1.000.000 requests then it only cost 10 request to fetch TOTAL count for 10 customer.
    - Disadvangages:
        + If we have too many customers when we need to fetch N+1 requests (N is the total customers) to fetch all counts, which is slow.
        e.g. if we have 1000 customers, it means everytime the Add-on is loaded, it would cost 1000 requests to search api to count requests.

  2. Approach 2: Using JQL Fetches all issues of current project but only fetches reporter fields (ignore other fields),
  then map issues and reduce to list of reporters with requestsCount field.
    - Advantages:
      + If we have large number of customers but fairly small amount of issues then it would be great to use this solution
        + e.g. if we have only 1000 customers and 100000 requests, we only need to fetch JQL 10 requests to fetch all issues then map.
        In the first approach, we need to fetch 1000 requests.
      + Using `fields=reporter` with maxResults=1000 on search api return the results very fast.
    - Disadvanges:
      + Since JQL only allow maxResults to be 1000 maximum, then it would cost us N + 1 requests (N = TOTAL requests / 1000) to fetch all results.
      + It would be memory consuming when mapping because we would receive many duplicate reporters for different issues when mapping and counting.

  Since I assume this app will target small and medium projects first where we have fairly small number of issues in each project
  then I decided to use first approach. In future, we can think of following options
    + Give feedbacks / Colloborate with Jira / Service Desk teams to extend the APIs.
    + Implement both approaches (and may be some other approaches) and use appropriate approaches based on number of customers and number of issues
    for better performance.
*/
export const fetchTopReportersFromRequests = async function ({ httpClient, projectId }) {
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};
