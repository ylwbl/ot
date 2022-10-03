const dependencies = require('./package.json').dependencies;
module.exports = {
  modulePublisher: {},
  libShared: {
    'react-dom': {
      requiredVersion: dependencies['react-dom'],
      singleton: true
    },
    react: {
      requiredVersion: dependencies['react'],
      singleton: true
    },
    'react-router-dom': {
      requiredVersion: dependencies['react-router-dom'],
      singleton: true
    },
    antd: {
      requiredVersion: dependencies['antd'],
      singleton: true
    }
  },
  applicationName: 'system'
};
