module.exports = {
  apps: [{
    script: 'src/app.ts',
    watch: '.',
    env_development: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};