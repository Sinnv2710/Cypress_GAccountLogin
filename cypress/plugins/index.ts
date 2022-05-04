const { GoogleSocialLogin } = require('../utils/customPlugin').plugins;

module.exports = (on, config) => {
	on('task', {
		GoogleSocialLogin: GoogleSocialLogin,
	});
	return config;
};
