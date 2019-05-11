export const asyncGetCreator = function(httpClient) {
  return function(options) {
    return new Promise((resolve, reject) => {
      httpClient.get(options, function (err, res, body) {
        if (err) {
          return reject('Error: ' + res.statusCode + ': ' + err);
        }

        let result;
        try {
          result = JSON.parse(body);
        } catch(e) {
          return reject('Failed to parse result from JIRA API');
        }

        if (result.errorMessages && result.errorMessages.length) {
          return reject('Errors: ' + result.errorMessages.join(';'));
        }

        resolve(result);
      });
    });
  }
}
