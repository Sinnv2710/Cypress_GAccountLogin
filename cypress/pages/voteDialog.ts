export class VoteDialog {
	isVoteDialogDisplayed() {
		cy.get('section[role="dialog"]').then(() => {
			cy.get('p.chakra-text').contains('App Request').should('be.visible');
		});
	}

	clickConfirmBtn() {
		// cy.intercept({
		// 	method: 'POST',
		// 	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=**',
		// }).as('userData2');
		// cy.wait('@userData2').its('response.statusCode').should('equal', 200);

		cy.get('button.css-1sh13ns').trigger('click');
	}

	waitUntilSuccess() {
		cy.wait('@tsx')
			.its('response')
			.then((response) => {
				const statusCode = response.statusCode;
				expect(statusCode).to.equal(200);
				const hashValue = response.body.tx_response.txhash;
				expect(hashValue).not.to.be.undefined;
			});
	}
}
