module.exports = {
  apps: [{
    script: 'dist/app.js',
    watch: '.',
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000,
      DBPATH: "localhost",
      DBUSER: "root",
      DBPASS: "root",
      DBNAME: "todo",
      COOKIE: "pmdev_cookie"
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};