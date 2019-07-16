'use strict';
const path = require('path');
const fs = require('fs');
const extend = require('extend');

const buildConfigProvider = function (brand, env) {
	const internalConfig = { defaultThemePath: path.join(__dirname, 'src', 'themes', 'default') };

	// add your build-time configurations here.
	const appConfig = {
		default: {
			any: {
				lang: 'en',
				meta: {
					title: 'Virgin Bet – Bet £10, Get £20',
					description:
						'Enjoy the best online betting experience at Virgin Bet. Browse all the latest odds across our huge selection of sports betting markets (T&Cs Apply)'
				},
				themePath: path.join(__dirname, 'src', 'themes', 'default')
			}
		}
	};

	const concreteAppConfig = extend(
		true,
		{},
		appConfig.default.any,
		appConfig.default[env] ? appConfig.default[env] : {},
		appConfig[brand] && appConfig[brand].any ? appConfig[brand].any : {},
		appConfig[brand] && appConfig[brand][env] ? appConfig[brand][env] : {}
	);

	return {
		srcPath: path.join(__dirname, 'src'),
		outPath: path.join(__dirname, 'out'),
		prodPath: path.join(__dirname, 'dist'),

		/**
		 * Gets an application's configuration value configured per brand and environment.
		 * @param {String} key A key of a configuration.
		 * @returns A configuration value.
		 */
		getAppValue(key) {
			return concreteAppConfig[key];
		},

		/**
		 * Resolves path to the fonts directory in the current theme if it exists there, or in the default theme.
		 * @returns {String} A full path to the fonts directory.
		 */
		resolveThemedFontPath() {
			return this.resolveThemedPath('font');
		},

		/**
		 * Resolves path to the images directory in the current theme if it exists there, or in the default theme.
		 * @returns {String} A full path to the images directory.
		 */
		resolveThemedImagePath() {
			return this.resolveThemedPath('img');
		},

		/**
		 * Resolves path to a file or folder in the current theme if it exists there, or in the default theme.
		 * @param {String} destination A destination to resolve a path to. It can be a file or a folder.
		 * @returns {String} A full path to the requested destination.
		 */
		resolveThemedPath(destination) {
			const themedPath = path.join(this.getAppValue('themePath'), destination);

			return fs.existsSync(themedPath) ? themedPath : path.join(internalConfig.defaultThemePath, destination);
		}
	};
};

module.exports = buildConfigProvider;
