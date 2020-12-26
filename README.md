# Getting Started

The face-model-api is a backend api for the project [face-model](https://github.com/harshcut/face-model) with backend authentication and a PostgreSQL database, hosted on Heroku. Get response from Clarifai API and see it visualize. More on Clarifai's `face-detection` model can be found [here](https://www.clarifai.com/models/face-detection).

## PostgreSQL Database

PostgreSQL is a powerful, open source object-relational database system that uses and extends the `SQL` language combined with many features that safely store and scale the most complicated data workloads. Create a database to store two tables.

### Create Database

`CREATE DATABASE` creates a new PostgreSQL database.

```sql
CREATE DATABASE "face-model-storage";
```

### Create Tables

To create a new table, you use the `CREATE TABLE` statement. Make sure to create the tables in the `face-model-storage` database.

```sql
CREATE TABLE "face-model-registry" (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  entries INTEGER NOT NULL DEFAULT 0
);
```

Registered user credentials are stored in `face-model-registry` and their detection history is logged in `face-model-history`.

```sql
CREATE TABLE "face-model-history" (
  serial SERIAL NOT NULL PRIMARY KEY,
  timestamp TIMESTAMP NOT NULL,
  id VARCHAR(36) NOT NULL,
  email TEXT NOT NULL,
  image TEXT NOT NULL
);
```

Replace values of `user` and `password` in `index.js` according to your database configuration.

```js
{
  host: "127.0.0.1",
  user: "postgres",
  password: "post",
  database: "face-model-storage",
}
```

## Environment Variables

Create a `.env` file in the root of the project and add the Clarifai API Key. The value assigned for `API_KEY` below is fake and will not work. To create your own api key, [Sign Up](https://portal.clarifai.com/signup) for a Clarifai account and create an application. For more information visit Clarifi's [Quick Start Guide](https://docs.clarifai.com/getting-started/quick-start).

Assign your client's URL to `ORIGIN` to prevent `cross-domain` based attacks. Note that it is an _optional_ variable and can be skipped, without creating any extra modifications.

To run the project in development mode and connect to a local database, set `DEV` to `true`. Note that the variable assigned is a `string` and not a `boolean`.

```dotenv
API_KEY=3d20e9dea9a6f5a297ac3b1a
ORIGIN=http://localhost:3001
DEV=true
```

## Developing

Fork the repository using [this](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) guide, then clone it locally.

```shell
git clone https://github.com/harshcut/face-model-api
cd face-model-api
yarn install
```

You can now run the Express Server on your `localhost`.

```shell
yarn start
```

## License

```text
MIT License

Copyright (c) 2020 Harsh Karande

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
