import React from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import campaignContract from '../../../ethereum/utils/campaign';
import getWeb3 from '../../../ethereum/utils/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends React.Component {
	state = {
		description: '',
		value: '',
		recipient: '',
		loading: false,
		errorMessage: '',
	};

	static async getInitialProps(props) {
		const { address } = props.query;

		return { address };
	}

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: '' });

		const { description, value, recipient } = this.state;

		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Get the contract instance by passing in web3 and the contract definition.
			const campaign = await campaignContract(
				web3,
				this.props.address
			);
			// Use window.ethereum to get the user's accounts.
			const accounts = await window.ethereum.request({
				method: 'eth_accounts',
			});
			await campaign.methods
				.createRequest(
					description,
					web3.utils.toWei(value, 'ether'),
					recipient
				)
				.send({
					from: accounts[0],
				});
			Router.pushRoute(
				`/campaigns/${this.props.address}/requests`
			);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<Link
					route={`/campaigns/${this.props.address}/requests`}
				>
					<a>Back</a>
				</Link>

				<h3>Create a New Request</h3>
				<Form
					onSubmit={this.onSubmit}
					error={!!this.state.errorMessage}
				>
					<Form.Field>
						<label>Description</label>
						<Input
							value={this.state.description}
							onChange={(event) =>
								this.setState({
									description: event.target.value,
								})
							}
						/>
					</Form.Field>
					<Form.Field>
						<label>Value in ether</label>
						<Input
							value={this.state.value}
							onChange={(event) =>
								this.setState({
									value: event.target.value,
								})
							}
						/>
					</Form.Field>
					<Form.Field>
						<label>Recipient</label>
						<Input
							value={this.state.recipient}
							onChange={(event) =>
								this.setState({
									recipient: event.target.value,
								})
							}
						/>
					</Form.Field>
					<Message
						error
						header="Oops!"
						content={this.state.errorMessage}
					/>
					<Button primary loading={this.state.loading}>
						Create!
					</Button>
				</Form>
			</Layout>
		);
	}
}

export default RequestNew;
