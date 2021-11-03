module.exports = {
  apps: [{
    script: 'src/app.ts',
    watch: '.',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};