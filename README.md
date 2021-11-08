# THINGS TO DO
### (YET ANOTHER TODO APP)

## Specs

A todo app with user login, a due date, and optional sub-tasks for each todo item.

### Server

Node, Express, Typescript, Mysql. 

### Frontend

Written as a PWA with React, Redux, Typescript, and using react-datepicker.

See [the client repo](https://github.com/Iamasamwich/todo-client)

## Installation

For these instructions to work you will need to have Node, NPM, and MySQL installed on your machine.

* Go to the directory where you want the app to sit and clone the repo

\>`git clone https://github.com/Iamasamwich/todo-server`

* change to the directory and install the packages

\>`cd todo-server`

todo-server\>`npm install`

* Use Mysql to create the database

todo-server\>`mysql -u root -p`

mysql\>`create database [db-name];`  (db-name is what you want to call it eg. todo)

mysql\>`exit;`

todo-server\>`mysqldump -u root -p [db-name] < todoDB.sql`

* update nodemon.json with your local mysql parameters

```
"env": {
    "NODE_ENV": "development",
    "PORT": 3000,
    "DBNAME": "[db-name]",
    "DBPASS": "[your-local-mysql-password]",
    "DBUSER": "[your-local-mysql-username]",
    "DBPATH": "localhost",
    "COOKIE": "cookie"
  },
```

* update ./package.json with your local mysql parameters

```
  "scripts": {
    ...
    "test": "DBNAME=[db-name] DBPASS=[your-local-mysql-password] DBUSER=[your-local-mysql-username] DBPATH=localhost COOKIE=cookie jest --coverage --detectOpenHandles --verbose",
    ...
  }
```

* run the tests

todo-server\>`npm test`

* start the server

todo-server\>`npm run dev`

* navigate to http://localhost:3000 to use the app.

## Deployment

* deployed at [things-to-do-todo-app.herokuapp.com](http://things-to-do-todo-app.herokuapp.com)

## Todo

* fix bug with due dates: dueDate has 10 hour time zone where today's date is midnight.
* add reset feature to change todo and steps to not done



