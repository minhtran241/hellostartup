import React from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/utils/web3';
import Campaign from '../../ethereum/build/contracts/Campaign.json';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

class CampaignShow extends React.Component {
	static async getInitialProps(props) {
		const campaign = await Campaign(props.query.address);
		const summary = await campaign.methods.getSummary().call();
		console.log(summary);
		return {
			address: props.query.address,
			goal: summary[0],
			minimumPledgeAmount: summary[1],
			backersCount: summary[4],
			balance: summary[2],
			requestsCount: summary[3],
			manager: summary[5],
		};
	}

	renderCards() {
		const items = [
			{
				header: this.props.manager,
				meta: 'Address of Manager',
				description:
					'The manager created this Campaign and can request to withdraw money',
				style: { overflowWrap: 'break-word' },
			},
			{
				header: this.props.goal,
				meta: 'Goal (wei)',
				description: 'The goal of the campaign',
			},
			{
				header: this.props.minimumPledgeAmount,
				meta: 'Minimum Pledge Amount (wei)',
				description:
					'You must pledge at least this much amount of wei to become an backer',
			},
			{
				header: this.props.requestsCount,
				meta: 'Number of Requests',
				description:
					'A requests to withdraw money from the contract. Requests must be approved by backers',
			},
			{
				header: this.props.backersCount,
				meta: 'Number of Backers',
				description:
					'Number of backers who have already donated to this campaign',
			},
			{
				header: web3.utils.fromWei(
					this.props.balance,
					'ether'
				),
				meta: 'Campaign Balance (ether)',
				description:
					'The balance is how much money the campaign has left to spend',
			},
		];
		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h3>Campaign Details</h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={6}>
							<h3>Contribute to this Campaign</h3>
							<ContributeForm
								address={this.props.address}
							/>
						</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column>
							<Link
								route={`/campaigns/${this.props.address}/requests`}
							>
								<a>
									<Button primary>
										View Requests
									</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default CampaignShow;
