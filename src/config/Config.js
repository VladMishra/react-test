export const tenantId = '';

export const createQuery = params =>
	Object.keys(params)
		.reduce((resultList, paramName) => {
			if (params[paramName] !== undefined) {
				resultList.push(`${ paramName }=${ encodeURIComponent(params[paramName]) }`);
			}

			return resultList;
		}, [])
		.join('&');

export const getEndpointUrl = (endpoint, params = {}, pathParams = {}) => {
	let url = window.__globalConfig__.gw.endpoints[endpoint] || '/';

	if (pathParams && Object.keys(pathParams).length > 0) {
		url = Object.keys(pathParams).reduce((url, paramKey) => url.replace(`:${ paramKey }`, pathParams[paramKey]), url);
	}

	url = url
		.split('/')
		.reduce((urlParts, urlPart) => {
			if (urlPart.indexOf(':') === 0) {
				return urlParts;
			}
			urlParts.push(urlPart);

			return urlParts;
		}, [])
		.join('/');

	if (params && typeof params === 'object' && Object.keys(params).length > 0) {
		const queryStr = createQuery(params);

		if (queryStr) {
			url += `?${ queryStr }`;
		}
	}

	return `${ window.__globalConfig__.host }${ window.__globalConfig__.gw.path }${ url }`;
};

export const getConfig = () => window.__globalConfig__;
