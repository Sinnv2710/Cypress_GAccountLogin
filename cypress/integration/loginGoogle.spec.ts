import { PageController } from '../pages/pageController';
const pages = new PageController();

describe('Login with Google Service', () => {
	it('Users can sign onto Ramper using Google successfully', () => {
		cy.intercept({
			method: 'POST',
			url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=**',
			times: 3,
		}).as('userData');

		pages.loginPage.visit();
		pages.loginIframe.addGoogleLoginCookies();
		cy.wait(2000);
		pages.loginPage.clickSignUpButton();
		pages.loginIframe.clickGoogleBtn();
		cy.wait(3000);
		cy.wait('@userData').its('response.statusCode').should('equal', 200);

		cy.visit('/');
		pages.loginPage.clickSignUpButton();

		pages.walletDashboard.isPublicWalletAddressDisplayed();
	});
});
