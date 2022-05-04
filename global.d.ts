///<reference types="cypress-iframe" />
declare namespace Cypress {
	interface Chainable {
		saveLocalStorage;
		restoreLocalStorage;
		clearIndexedDB;
	}
}
