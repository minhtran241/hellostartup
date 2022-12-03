import CampaignFactory from '../build/contracts/CampaignFactory.json';

const factory = async (web3) => {
	// get the deployed address of the contract
	const contractAddress =
		'0xD7d2347d300718479321E63CA28832454fba9250';

	// create the instance
	const contractInstance = new web3.eth.Contract(
		CampaignFactory.abi,
		contractAddress
	);
	return contractInstance;
};

export default factory;
