import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import factory from '../ethereum/utils/factory';
import getWeb3 from '../ethereum/utils/web3';

class CampaignIndex extends React.Component {
	static async getInitialProps() {
		// Get network provider and web3 instance.
		const web3 = await getWeb3();
		// Get the contract instance by passing in web3 and the contract definition.
		const factoryContract = await factory(web3);
		// Get addresses of all deployed campaigns.
		const campaigns = await factoryContract.methods
			.getDeployedCampaigns()
			.call();
		return { campaigns };
	}

	renderCampaigns() {
		const items = this.props.campaigns.map((address) => {
			return {
				header: address,
				description: (
					<Link route={`/campaigns/${address}`}>
						<a>View Campaign</a>
					</Link>
				),
				fluid: true,
			};
		});
		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<div>
					<h3>Open Campaigns</h3>
					<Link route="/campaigns/new">
						<a>
							<Button
								floated="right"
								content="Create Campaign"
								icon="add"
								primary
							></Button>
						</a>
					</Link>
					{this.renderCampaigns()}
				</div>
			</Layout>
		);
	}
}

export default CampaignIndex;
