var env = require('./env.json');

export default function config() {
  var node_env = process.env.NODE_ENV || 'development';
  return env[node_env];
};