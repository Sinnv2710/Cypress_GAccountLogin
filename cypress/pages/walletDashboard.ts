export const PUBLIC_WALLET_ADDRESS = 'span.key';
export const SIGN_OUT_BTN = 'button[type="button"]';

export class WalletDashboard {
	isPublicWalletAddressDisplayed() {
		return cy
			.get(PUBLIC_WALLET_ADDRESS)
			.contains('publicKey')
			.next()
			.invoke('text')
			.then((text) => {
				expect(text).to.be.a('string').not.to.be.undefined;
				cy.log(text).as('publicWalletAddress');
			});
	}

	clickSignOutBtn() {
		try {
			cy.get(SIGN_OUT_BTN).contains('Sign Out').click();
		} catch {
			return;
		}
	}

	getPublicWalletAddressAfterLoginAgain() {
		cy.get(PUBLIC_WALLET_ADDRESS)
			.contains('publicKey')
			.next()
			.invoke('text')
			.then((text) => {
				expect(text).to.be.a('string').not.to.be.undefined;
				cy.log(text).as('publicWalletAddress2');
			});
	}

	clickTxOptionsVoteTransactionBtn() {
		cy.window().then((win) => {
			cy.stub(win, 'open', (url) => {
				win.location.href =
					'https://auth.v1.ramper.xyz/terra/transaction/confirm?fee=%7B%22amount%22%3A%5B%7B%22amount%22%3A%22500000%22%2C%22denom%22%3A%22uusd%22%7D%5D%2C%22gas_limit%22%3A%221000000%22%2C%22granter%22%3A%22%22%2C%22payer%22%3A%22%22%7D&msgs=%5B%7B%22%40type%22%3A%22%2Fcosmos.gov.v1beta1.MsgVote%22%2C%22option%22%3A4%2C%22proposal_id%22%3A%225%22%2C%22voter%22%3A%22terra1gn24falp3myz2m9cpd09qxsuaf2ptrevwl5mcz%22%7D%5D&memo=Voting+No+With+Veto&gas=&gasPrices=&gasAdjustment=&timeoutHeight=&feeDenoms=&network=testnet&origin=https%3A%2F%2Fexample.ramper.xyz';
			}).as('popup');
		});
		cy.get('button[type="button"]').contains('txOptions Vote').click();
		cy.get('@popup').should('be.called');
	}
}
