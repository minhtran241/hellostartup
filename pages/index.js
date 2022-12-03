import React from 'react';
import factory from '../ethereum/utils/factory';
import getWeb3 from '../ethereum/utils/web3';

class CampaignIndex extends React.Component {
	async componentDidMount() {
		// Get network provider and web3 instance.
		const web3 = await getWeb3();

		// Use window.ethereum to get the user's accounts.
		// const accounts = await window.ethereum.request({
		// 	method: 'eth_accounts',
		// });

		// Get the contract instance by passing in web3 and the contract definition.
		const factoryContract = await factory(web3);

		// Get addresses of all deployed campaigns.
		const campaigns = await factoryContract.methods
			.getDeployedCampaigns()
			.call();

		console.log(campaigns);
	}

	render() {
		return <div>Campaigns</div>;
	}
}

export default CampaignIndex;
