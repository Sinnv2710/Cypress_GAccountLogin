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

describe('Users can successfully txOptions Vote transaction', () => {
	before(() => {
		cy.intercept({
			method: 'POST',
			url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=**',
			times: 3,
		}).as('userData');

		cy.intercept({
			method: 'POST',
			url: 'https://bombay-lcd.terra.dev/cosmos/tx/v1beta1/txs',
			times: 2,
		}).as('tsx');
	});

	it('Users can successfully txOptions Vote transaction', () => {
		loginDashBoard();
		pages.walletDashboard.isPublicWalletAddressDisplayed();
		pages.walletDashboard.clickTxOptionsVoteTransactionBtn();
		pages.voteDialog.isVoteDialogDisplayed();
		cy.wait(5000);
		pages.voteDialog.clickConfirmBtn();

		pages.voteDialog.waitUntilSuccess();

		pages.finderPage.goToFinderPage();
	});
});
