'use strict';
var config;

switch (process.env.NODE_ENV) {
    case 'development':
        config = {
            APP_PORT: 3000,
            database: {
                couch: {
                    host: 'http://127.0.0.1',
                    port: 5984,
                    options: {}
                }
            }
        };
        break;
    case 'production':
        config = {
            APP_PORT: 3000,
            database: {
                couch: {
                    host: '',
                    port: 5984,
                    options: {
                    }
                }
            }
        };
        break;
    default:
    config = {
        APP_PORT: 3000,
        database: {
            couch: {
                host: 'http://127.0.0.1',
                port: 5984,
                options: {
                }
            }
        }
    };
}

module.exports = config;
