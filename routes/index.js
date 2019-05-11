import { fetchTopReportersFromRequests } from './jira-requests';

export default function routes(app, addon) {
  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json');
  });

  // This is an example route used by 'generalPages' module (see atlassian-connect.json).
  // Verify that the incoming request is authenticated with Atlassian Connect.
  app.get('/app', addon.authenticate(), (req, res) => {
    // Rendering a template is easy; the render method takes two params:
    // name of template and a json object to pass the context in.
    res.render('app', {
      title: 'Top Reporters'
    });
  });

  app.get('/top-reporters', addon.authenticate(), (req, res) => {
    const httpClient = addon.httpClient(req);
    const projectId = req.query['projectId'];

    fetchTopReportersFromRequests({ httpClient, projectId }).then(topReporters => {
      res.status(200);
      res.send(topReporters);
    }).catch(error => {
      res.status(400);
      res.send({
        error: error
      });
    });
  });
}
