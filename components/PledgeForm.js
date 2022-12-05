import React from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import campaignContract from '../ethereum/utils/campaign';
import getWeb3 from '../ethereum/utils/web3';
import { Router } from '../routes';

class PledgeForm extends React.Component {
	state = {
		value: '',
		errorMessage: '',
		loading: false,
	};

	onSubmit = async (event) => {
		event.preventDefault();

		this.setState({ loading: true, errorMessage: '' });

		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();
			// Use window.ethereum to get the user's accounts.
			const accounts = await window.ethereum.request({
				method: 'eth_accounts',
			});
			const campaign = await campaignContract(
				web3,
				this.props.address
			);
			await campaign.methods.pledge().send({
				from: accounts[0],
				value: web3.utils.toWei(this.state.value, 'ether'),
			});

			Router.replaceRoute(`/campaigns/${this.props.address}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false, value: '' });
	};

	render() {
		return (
			<Form
				onSubmit={this.onSubmit}
				error={!!this.state.errorMessage}
			>
				<Form.Field>
					<label>Pledge Amount</label>
					<Input
						label="ether"
						labelPosition="right"
						value={this.state.value}
						onChange={(event) =>
							this.setState({
								value: event.target.value,
							})
						}
					/>
				</Form.Field>

				<Message
					error
					header="Oops!"
					content={this.state.errorMessage}
				/>

				<Button loading={this.state.loading} primary>
					Pledge!
				</Button>
			</Form>
		);
	}
}

export default PledgeForm;
