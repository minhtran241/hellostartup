import React from 'react';
import {
	Form,
	Button,
	Input,
	Message,
	Grid,
} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/utils/factory';
import getWeb3 from '../../ethereum/utils/web3';
import { Router } from '../../routes';

class CampaignNew extends React.Component {
	state = {
		goal: '',
		minimumPledgeAmount: '',
		errorMessage: '',
		loading: false,
	};

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: '' });
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Get the contract instance by passing in web3 and the contract definition.
			const factoryContract = await factory(web3);
			// Use window.ethereum to get the user's accounts.
			const accounts = await window.ethereum.request({
				method: 'eth_accounts',
			});
			await factoryContract.methods
				.createCampaign(
					this.state.goal,
					this.state.minimumPledgeAmount
				)
				.send({
					from: accounts[0],
				});
			Router.pushRoute('/');
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<h3>Create a Campaign</h3>
				<Grid>
					<Grid.Column width={6}>
						<Form
							onSubmit={this.onSubmit}
							error={!!this.state.errorMessage}
						>
							<Form.Field>
								<label>Goal</label>
								<Input
									label="wei"
									labelPosition="right"
									value={this.state.goal}
									onChange={(event) =>
										this.setState({
											goal: event.target.value,
										})
									}
								/>
							</Form.Field>
							<Form.Field>
								<label>Minimum Pledge Amount</label>
								<Input
									label="wei"
									labelPosition="right"
									value={
										this.state.minimumPledgeAmount
									}
									onChange={(event) =>
										this.setState({
											minimumPledgeAmount:
												event.target.value,
										})
									}
								/>
							</Form.Field>

							<Message
								error
								header="Oops!"
								content={this.state.errorMessage}
							/>

							<Button
								loading={this.state.loading}
								primary
							>
								Create!
							</Button>
						</Form>
					</Grid.Column>
				</Grid>
			</Layout>
		);
	}
}

export default CampaignNew;
