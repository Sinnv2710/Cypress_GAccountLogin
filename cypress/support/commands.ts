import 'cypress-iframe';

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
	Object.keys(localStorage).forEach((key) => {
		LOCAL_STORAGE_MEMORY[key] = localStorage[key];
	});
});

Cypress.Commands.add('restoreLocalStorage', () => {
	Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
		localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
	});
});

Cypress.Commands.add('clearIndexedDB', async () => {
	const databases = await window.indexedDB.databases();

	await Promise.all(
		databases.map(
			({ name }) =>
				new Promise((resolve, reject) => {
					const request = window.indexedDB.deleteDatabase(name);

					request.addEventListener('success', resolve);
					// Note: we need to also listen to the "blocked" event
					// (and resolve the promise) due to https://stackoverflow.com/a/35141818
					request.addEventListener('blocked', resolve);
					request.addEventListener('error', reject);
				}),
		),
	);
});
