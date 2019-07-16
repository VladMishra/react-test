/* eslint-disable no-console, prefer-const */
const path = require('path');
const execSync = require('child_process').execSync;
const fs = require('fs');
const extend = require('extend');
const buildConfigProvider = require('./build.config');

// take arguments passed to this script and skip first two: command name and script file name.
const args = process.argv.slice(2);

let [ target, format, brand, env ] = args;

// if brand and env are not specified in argv, take them from environment variables passed from CI server.
brand = brand ? brand : 'dev';
env = env ? env : 'dev';

const buildConfig = buildConfigProvider(brand, env);

const outAppConfigPath = path.resolve(buildConfig.srcPath, 'assets/Config.g.json');

const executeCommand = (cmd) => {
	console.log(`----- Executing command:\n${ cmd }\n`);

	try {
		execSync(cmd, { stdio: 'inherit' });
	} catch (ex) {
		console.error('-----  error Json -----', JSON.stringify(ex));
		console.error('-----  error -----', ex.stdout);
	}
};

const executeBuildStep = (stepName, condition, command) => {
	if (!condition) {
		return;
	}

	console.log(`***** ${ stepName } ...`);

	try {
		command();

		console.log('------------------------------------\n');
	} catch (e) {
		console.error('-----  error -----', e.toString());

		process.exit(1);
	}
};

// execution.
console.log('***** Starting build process ...\n');

console.log(`Target: ${ target }\nFormat: ${ format }\nBrand: ${ brand }\nEnvironment: ${ env }\n`);

executeBuildStep('Generating configuration', !(target === 'start' && format === 'dev'), () => {
	let baseAppConfig;
	let envAppConfig = {};
	let brandAppConfig = { any: {}, [env]: {} };
	const baseAppConfigPath = path.resolve(buildConfig.srcPath, 'config/Config.json');
	const envAppConfigPath = path.resolve(buildConfig.srcPath, `config/Config.${ env }.json`);
	const brandAppConfigPath = path.resolve(buildConfig.srcPath, `config/Config.${ brand }.json`);

	console.log(`Reading base configuration:\n${ baseAppConfigPath }`);
	baseAppConfig = JSON.parse(fs.readFileSync(baseAppConfigPath, 'utf8'));

	if (fs.existsSync(envAppConfigPath)) {
		console.log(`Reading environment configuration:\n${ envAppConfigPath }`);
		envAppConfig = JSON.parse(fs.readFileSync(envAppConfigPath, 'utf8'));
	}

	if (fs.existsSync(path.resolve(buildConfig.srcPath, `config/Config.${ brand }.json`))) {
		console.log(`Reading brand configuration:\n${ brandAppConfigPath }`);
		brandAppConfig = JSON.parse(fs.readFileSync(brandAppConfigPath, 'utf8'));
	}

	console.log('Reading version from package.json ...');
	const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

	console.log('Merging configurations ...');
	const finalAppConfig = extend(
		true,
		{ version: packageJson.version, environment: env },
		baseAppConfig,
		envAppConfig,
		brandAppConfig.any,
		brandAppConfig[env]
	);

	console.log(`Generating configuration file:\n${ outAppConfigPath }`);
	fs.writeFileSync(outAppConfigPath, JSON.stringify(finalAppConfig, null, 2));

	if (!fs.existsSync(outAppConfigPath)) {
		console.error(`Not found:\n${ outAppConfigPath }`);

		process.exit(1);
	}
});

executeBuildStep('Launching webpack-dev-server', target === 'start', () => {
	if (!fs.existsSync(outAppConfigPath)) {
		console.error('Config.g.json module not found!\nLaunch:\n> npm run config');

		process.exit(1);
	}

	executeCommand(
		`"./node_modules/.bin/webpack-dev-server" --env.format ${ format } --env.brand ${ brand } --env.env ${ env }`
	);
});

const distPath = path.resolve(buildConfig.prodPath, 'index.html');

executeBuildStep('Running webpack', target === 'build', () => {
	executeCommand(`"./node_modules/.bin/webpack" --env.format ${ format } --env.brand ${ brand } --env.env ${ env }`);

	console.log(`*** Build folder with index file:  ${ distPath } `);

	if (!fs.existsSync(distPath)) {
		console.error(`Build folder with index file not found!  ${ distPath } `);
	} else {
		let robotsTxtFileName = 'robots.txt';

		if (format === 'prod' && env === 'prod') {
			robotsTxtFileName = 'robots_prod.txt';
		}

		fs.writeFileSync(
			path.resolve(`${ buildConfig.prodPath }/robots.txt`),
			fs.readFileSync(path.resolve(`${ buildConfig.srcPath }/assets/${ robotsTxtFileName }`), 'utf8')
		);

		console.log(`*** Using ${ path.resolve(`${ buildConfig.prodPath }/robots.txt`) } for ${ format }:${ env }`);
	}
});

console.log('***** Build process succeeded\n');
