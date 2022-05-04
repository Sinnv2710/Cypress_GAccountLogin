import { LoginIframe } from './loginIframe';
import { LoginPage } from './loginPage';
import { FinderPage } from './terraFinder';
import { VoteDialog } from './voteDialog';
import { WalletDashboard } from './walletDashboard';
export class PageController {
	loginPage: LoginPage;
	loginIframe: LoginIframe;
	walletDashboard: WalletDashboard;
	voteDialog: VoteDialog;
	finderPage: FinderPage;

	constructor() {
		this.loginPage = new LoginPage();
		this.loginIframe = new LoginIframe();
		this.walletDashboard = new WalletDashboard();
		this.voteDialog = new VoteDialog();
		this.finderPage = new FinderPage();
	}
}
