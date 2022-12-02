const assert = require('assert');
const CampaignFactory = artifacts.require('CampaignFactory');
const Campaign = artifacts.require('Campaign');

contract('CampaignFactory', (accounts) => {
	const OWNER = accounts[0];
	const BACKER = accounts[1];
	const RECIPIENT = accounts[2];
	const GOAL = 10000;
	const MINIMUM_PLEDGE_AMOUNT = 100;
	const PLEDGE_AMOUNT = 200;
	const GAS = 3000000;

	let campaignFactory;
	let campaignAddress;
	let campaign;

	beforeEach(async () => {
		campaignFactory = await CampaignFactory.new({
			from: OWNER,
			gas: GAS,
		});
		await campaignFactory.createCampaign(
			GOAL,
			MINIMUM_PLEDGE_AMOUNT
		);
		[campaignAddress] =
			await campaignFactory.getDeployedCampaigns();
		campaign = await new web3.eth.Contract(
			Campaign._json.abi,
			campaignAddress
		);
	});

	describe('CampaignFactory', () => {
		it('deploys a factory and campaign', () => {
			assert.ok(campaignFactory.address);
			assert.ok(campaign.options.address);
		});

		it('marks caller as the campaign manager', async () => {
			const manager = await campaign.methods.manager().call();
			assert.equal(OWNER, manager);
		});

		it('allows people to pledge and marks them as backers', async () => {
			await campaign.methods.pledge().send({
				from: BACKER,
				value: PLEDGE_AMOUNT,
			});
			await campaign.methods.pledge().send({
				from: BACKER,
				value: PLEDGE_AMOUNT,
			});
			const pledgeAmount = await campaign.methods
				.backers(BACKER)
				.call();
			assert.equal(pledgeAmount, 2 * PLEDGE_AMOUNT);
		});

		it('requires a minimum pledge amount', async () => {
			try {
				await campaign.methods.pledge().send({
					from: backer1,
					value: MINIMUM_PLEDGE_AMOUNT / 2,
				});
				assert(false);
			} catch (err) {
				assert(err);
			}
		});

		it('allows a manager to make a payment request', async () => {
			await campaign.methods.pledge().send({
				from: BACKER,
				value: PLEDGE_AMOUNT,
			});
			await campaign.methods
				.createRequest(
					'Buying batteries',
					PLEDGE_AMOUNT,
					RECIPIENT
				)
				.send({
					from: OWNER,
					gas: GAS,
				});
			const request = await campaign.methods.requests(0).call();

			assert.equal(RECIPIENT, request.recipient);
		});

		it('processes requests', async () => {
			await campaign.methods.pledge().send({
				from: BACKER,
				value: PLEDGE_AMOUNT * 5,
			});
			await campaign.methods
				.createRequest(
					'Buying batteries',
					PLEDGE_AMOUNT,
					RECIPIENT
				)
				.send({
					from: OWNER,
					gas: GAS,
				});
			await campaign.methods.approveRequest(0).send({
				from: BACKER,
				gas: GAS,
			});

			const recipient_balance = parseFloat(
				await web3.eth.getBalance(RECIPIENT)
			);
			await campaign.methods.finalizeRequest(0).send({
				from: OWNER,
				gas: GAS,
			});
			assert.equal(
				parseFloat(await web3.eth.getBalance(RECIPIENT)),
				recipient_balance + PLEDGE_AMOUNT
			);
		});
	});
});
