import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import getWeb3 from '../ethereum/utils/web3';
import campaignContract from '../ethereum/utils/campaign';
import web3 from 'web3';

class RequestRow extends React.Component {
	onApprove = async () => {
		// Get network provider and web3 instance.
		const web3 = await getWeb3();
		// Get the contract instance by passing in web3 and the contract definition.
		const campaign = await campaignContract(
			web3,
			props.query.address
		);
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		await campaign.methods.approveRequest(this.props.id).send({
			from: accounts[0],
		});
	};

	onFinalize = async () => {
		// Get network provider and web3 instance.
		const web3 = await getWeb3();
		// Get the contract instance by passing in web3 and the contract definition.
		const campaign = await campaignContract(
			web3,
			props.query.address
		);
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		await campaign.methods.finalizeRequest(this.props.id).send({
			from: accounts[0],
		});
	};

	render() {
		const { Row, Cell } = Table;
		const { id, request, backersCount, manager, currentAccount } =
			this.props;
		const readyToFinalize =
			request.approversCount > backersCount / 2;

		return (
			<Row
				disabled={request.complete}
				positive={readyToFinalize && !request.complete}
			>
				<Cell>{id + 1}</Cell>
				<Cell>{request.description}</Cell>
				<Cell>
					{web3.utils.fromWei(request.value, 'ether')}
				</Cell>
				<Cell>{request.recipient}</Cell>
				<Cell>
					{request.approversCount}/{backersCount}
				</Cell>
				<Cell>
					{request.completed ||
					manager == currentAccount ? null : (
						<Button
							color="green"
							basic
							onClick={this.onApprove}
						>
							Approve
						</Button>
					)}
				</Cell>
				<Cell>
					{request.complete ||
					manager != currentAccount ? null : (
						<Button
							color="teal"
							basic
							onClick={this.onFinalize}
						>
							Finalize
						</Button>
					)}
				</Cell>
			</Row>
		);
	}
}

export default RequestRow;
