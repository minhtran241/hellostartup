import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import getWeb3 from '../../../ethereum/utils/web3';
import campaignContract from '../../../ethereum/utils/campaign';

class RequestIndex extends Component {
	static async getInitialProps(props) {
		const { address } = props.query;
		// Get network provider and web3 instance.
		const web3 = await getWeb3();
		// Get the contract instance by passing in web3 and the contract definition.
		const campaign = await campaignContract(web3, address);
		const requestsCount = await campaign.methods
			.getRequestsCount()
			.call();
		const backersCount = await campaign.methods
			.backersCount()
			.call();

		const manager = await campaign.methods.manager().call();
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		const currentAccount = accounts[0];

		const requests = await Promise.all(
			Array(parseInt(requestsCount))
				.fill()
				.map((element, index) =>
					campaign.methods.requests(index).call()
				)
		);

		return {
			address,
			requests,
			requestsCount,
			backersCount,
			manager,
			currentAccount,
		};
	}

	renderRows() {
		return this.props.requests.map((request, index) => (
			<RequestRow
				key={index}
				id={index}
				address={this.props.address}
				request={request}
				backersCount={this.props.backersCount}
				manager={this.props.manager.toLowerCase()}
				currentAccount={this.props.currentAccount}
			/>
		));
	}

	render() {
		const { Header, Row, HeaderCell, Body } = Table;
		return (
			<Layout>
				<h3>Requests</h3>
				<Link
					route={`/campaigns/${this.props.address}/requests/new`}
				>
					<a>
						<Button
							icon="add"
							content="Add Request"
							floated="right"
							style={{ marginBottom: 10 }}
							primary
						></Button>
					</a>
				</Link>
				<Table>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount</HeaderCell>
							<HeaderCell>Recipient</HeaderCell>
							<HeaderCell>Approvers</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
							<HeaderCell>Finalize</HeaderCell>
						</Row>
					</Header>
					<Body>{this.renderRows()}</Body>
				</Table>
				<div> Found {this.props.requestsCount} requests.</div>
			</Layout>
		);
	}
}

export default RequestIndex;
