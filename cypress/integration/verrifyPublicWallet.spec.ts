import { PageController } from '../pages/pageController';
const pages = new PageController();

function loginDashBoard() {
	pages.loginPage.visit();
	pages.loginIframe.addGoogleLoginCookies();
	cy.wait(2000);
	pages.loginPage.clickSignUpButton();
	pages.loginIframe.clickGoogleBtn();
	cy.wait('@userData').its('response.statusCode').should('equal', 200);

	cy.visit('/');
	pages.loginPage.clickSignUpButton();
	// pages.loginIframe.clickGoogleBtn();
}

describe('Verify Public Wallet Address After Login Successfully', () => {
	beforeEach(() => {
		cy.intercept({
			method: 'POST',
			url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=**',
			times: 3,
		}).as('userData');
	});

	it('When the users signs into Google, they can view their public wallet address', () => {
		loginDashBoard();
		pages.walletDashboard.isPublicWalletAddressDisplayed();
	});

	it('if the user signs out and signs back in, their wallet address should stay the same', () => {
		loginDashBoard();
		pages.walletDashboard.isPublicWalletAddressDisplayed();
		pages.walletDashboard.clickSignOutBtn();
		cy.reload();
		pages.loginPage.clickSignUpButton();
		pages.loginIframe.clickGoogleBtn();
		pages.walletDashboard.getPublicWalletAddressAfterLoginAgain();
		cy.get('@publicWalletAddress').then((oldAddress) => {
			cy.get('@publicWalletAddress2').then((newAddress) => {
				expect(oldAddress).to.equal(newAddress);
			});
		});
	});
});
