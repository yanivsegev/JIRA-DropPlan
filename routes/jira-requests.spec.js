import Url from 'url';

let fetchTopReportersFromRequests;

const FETCH_PER_PAGE = 1;
const TOTAL = 3;

const reporter1 = {
  key: '1'
};
const reporter2 = {
  key: '2'
};

const getMock = jest.fn();
getMock.mockImplementation((options, callback) => {
  const { url } = options;
  let result;

  var query = Url.parse(url, true).query;
  if (query.maxResults === '0') {
    result = {
      total: TOTAL
    };
  } else {
    switch (query.startAt) {
      case '0':
        result = {
          issues: [{
            fields: {
              reporter: reporter1
            }
          }]
        }
        break;
      case '1':
        result = {
          issues: [{
            fields: {
              reporter: reporter2
            }
          }]
        }
        break;
      case '2':
        result = {
          issues: [{
            fields: {
              reporter: reporter2
            }
          }]
        }
        break;
      default:
        break;
    }
  }

  return callback(null, { statusCode: 200 }, JSON.stringify(result));
});


describe('jiraRequests actions', () => {
  beforeEach(() => {
    jest.mock('../consts/jira-api', () => {
      return {
        FETCH_PER_PAGE
      };
    });
    fetchTopReportersFromRequests = require('./jira-requests').fetchTopReportersFromRequests;
  });

  describe('fetchTopReportersFromRequests', () => {
    let projectId = 'TEST-1';
    let result;

    beforeEach(async () => {
      result = await fetchTopReportersFromRequests({
        httpClient: { get: getMock },
        projectId
      });
    });

    it('expects to fetch Jira APIs correctly to fetch all issues', async () => {
      expect(getMock).toHaveBeenCalledWith(expect.objectContaining({
        url: `/rest/api/3/search?jql=project=${projectId}&maxResults=0`
      }), expect.any(Function));

      const numberOfPages = Math.floor(TOTAL / FETCH_PER_PAGE) + (TOTAL % FETCH_PER_PAGE === 0 ? 0 : 1);

      for (let i = 0; i < numberOfPages; ++i) {
        expect(getMock).toHaveBeenCalledWith(expect.objectContaining({
          url: `/rest/api/3/search?jql=project=${projectId}&maxResults=${FETCH_PER_PAGE}&fields=reporter&startAt=${i * FETCH_PER_PAGE}`
        }), expect.any(Function));
      }
    });

    it('expects to map issues and reduce to reporter with requestsCount and sorted desc by requestsCort', () => {
      expect(result).toEqual([
        {
          ...reporter2,
          requestsCount: 2
        },
        {
          ...reporter1,
          requestsCount: 1
        },
      ])
    });
  });
});
