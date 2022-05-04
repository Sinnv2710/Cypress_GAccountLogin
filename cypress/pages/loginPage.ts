export const SIGN_UP_BTN = `button[type="button"]`;
import { PageController } from '../pages/pageController';

export class LoginPage {
	visit() {
		cy.visit('/');
	}

	clickSignUpButton() {
		try {
			cy.get(SIGN_UP_BTN).contains('Sign Up').dblclick();
		} catch {
			return;
		}
	}
}
