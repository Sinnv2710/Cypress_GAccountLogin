const LOGIN_DIALOG = `div.chakra-modal__content-container section#chakra-modal-1`;
const GOOGLE_BTN = `button[aria-label="google"]`;
const TWITTER_BTN = `button[aria-label="twitter"]`;
const FB_BTN = `button[aria-label="facebook"]`;
const EMAIL_FIELD = `input#email`;
const SUBMIT_BTN = `button#submit`;
const WALLET_BTN = `button[type="button"]`;

const findWalletBtn = () => {
	return cy.get(WALLET_BTN).contains('Wallet Connect');
};

export class LoginIframe {
	private isIframe() {
		return cy.frameLoaded();
	}

	verifyLoginSection() {
		this.isIframe().then(() => {
			const arrayElement = [
				LOGIN_DIALOG,
				GOOGLE_BTN,
				TWITTER_BTN,
				FB_BTN,
				EMAIL_FIELD,
				SUBMIT_BTN,
			];
			arrayElement.forEach((element) => {
				cy.iframe().find(element).should('be.visible');
			});
			cy.iframe()
				.find(WALLET_BTN)
				.contains('Wallet Connect')
				.should('be.visible');
		});
	}

	clickGoogleBtn() {
		cy.iframe().find(GOOGLE_BTN).click();
		cy.wait(10000);
	}

	loginWithGoogle() {
		const username = Cypress.env('googleSocialLoginUsername');
		const password = Cypress.env('googleSocialLoginPassword');
		const loginUrl = Cypress.env('loginUrl');
		const socialLoginOptions = {
			username: username,
			password: password,
			loginUrl: loginUrl,
			headless: false,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
			logs: true,
			isPopup: true,
			preLoginSelector: 'button[aria-label="google"]',
			preLoginSelectorIframe: 'iframe',
			popupDelay: 3000,
			postLoginSelector: 'button[type="button"]',
		};

		cy.clearLocalStorage();

		return cy.task('GoogleSocialLogin', socialLoginOptions);
	}

	addGoogleLoginCookies() {
		this.loginWithGoogle();
		// cy.reload();
	}
}
