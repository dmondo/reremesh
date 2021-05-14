# Re-remesh
Re-remesh is the new kid on the block, and definitely not just a stripped-down knock-off of the Remesh that we all know and love.

Re-remesh is built using a React front-end (bootstrapped with create-react-app), a NodeJS/expressJS back-end, and a postgreSQL database. We communicate with this database using the Sequelize ORM. Testing is handled with Jest.

## To run the app locally

Follow these steps:

Install dependencies
### `npm install`

Create a database. With postgreSQL installed you can simply run
### `createdb your-db-name-here`

If you don't have postgreSQL locally, consult the [documentation](https://www.postgresql.org/) or use a hosted postgreSQL database url in your config file in the next step.

Configure your database by creating a config.json file in the /config directory. Note that there is a config_example.json you can base your config off of. Just replace the database name, user, and password with your own values.

Migrate your database from the command line with the following command (the sequelize-cli is a dependency in the package.json so no additional install should be required for this step):
### `sequelize db:migrate`

Launch client. The app front-end will then be available at localhost:3000
### `npm start`

Launch the server. The back-end will then be available at localhost:3001 by default

### `npm run server:start`

Now Re-remesh is ready to go!


## To run the test suite

Run
### `npm test`

Note that by default the testing server and development server run on the same port so you may need to spin down your express server (by e.g. pressing ctr-c in the terminal running your npm server:start command) in order to successfully run the test suite.
