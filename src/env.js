// env.js
(function (global) {
    const environment = {
      API_URL: 'https://example.com/api',
      APP_NAME: 'MyApp',
      // Add other environment variables as needed
    };
  
    if (typeof module !== 'undefined' && module.exports) {
      // For Node.js/CommonJS environment
      module.exports = environment;
    } else {
      // For browser environments
      global.env = environment;
    }
  })(typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : this));
  