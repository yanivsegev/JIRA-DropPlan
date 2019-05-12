# [Jira Service Desk] Top Reporters Add-on
This is a full-stack example showing how to make an add-on for Jira using React.js and Node.js to query top reporters for a Jira Project.

## Demo
* You can try installing this app via: [https://jsd-top-reporters.herokuapp.com/atlassian-connect.json](https://jsd-top-reporters.herokuapp.com/atlassian-connect.json)

## What have I done this in this project ?
* Setup a `Node.js` with `express.js back-end` for a Jira Add-on using `atlassian-connect-express`.
* Setup a `React.js` app using `webpack` and `babel`.
* Setup `eslint` (linting) and `jest` (testing) for back-end and front-end.
        * Using `enzyme` for React testing.
* Build `/top-reporters API` endpoint for backend
* Build React Components for showing Top Reporters in a Jira Project
        * Using pure functional React components
        * Using `React Hooks` for fetching APIs and manage ducks states.
* Write `Unit Tests` for both back-end and front-end with `jest` and `enzyme`.
* Enable easy deployment to `Heroku` (check guide below)

## Setup guide for development
1. Make sure your Environment is ready!
	* Node 8.x or above.
	* Install latest npm with `npm install -g npm@latest`
	* Pull the latest source code to your computer.
	* `cd` to the folder of the add-on.
2. Install libraries

        # Install libraries
        npm install

        # Install foreman
        gem install foreman

3. Setup test credentials for testing
	* Type `cp credentials.json.sample credentials.json`.
	* Edit `credentials.json` and fill in your credentials for the testing Atlassian Jira Account.
	* Go to your Jira Settings -> Manage Apps -> Settings -> Turn on `Development mode`.
4. Start hacking by running

        npm run dev

Congratulations! You can now go to your Jira Atlassian account, select any project and see your working add-on.

## Run Linting and Tests

1. Check linting

        npm run lint

2. Test all project

        npm test

3. Run only backend tests

        # Test all files
        npm run test-backend
        # Test single file
        npm run test-backend <path to test file>

4. Run only front-end tests

        # Test all files
        npm run test-frontend
        # Test single file
        npm run test-frontend <path to test file>

## Deployment guide for Heroku

    # Create Heroku app
    heroku create

    # Install postgres add-on
    heroku addons:create heroku-postgresql

    # First deployment
    git push heroku master

    # Open your deployed Jira Add-on, yay!!!!
    heroku open

## Todo list
* Add sass-loader use scss for styling.
* Enable deployment static assets to CDN for production.
* Implement pagination on React Components:
	* Add PaginationBar
	* Handle state to store current reporter of current page.
* Improve /top-reporters fetching approaches as mentioned in code comments.
