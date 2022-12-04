import CampaignFactory from '../build/contracts/CampaignFactory.json';

const factoryContract = async (web3) => {
	// get the deployed address of the contract
	const contractAddress =
		'0xd5872c1bC3f375C14B13eA0FA42E72D377A27c58';

	// create the instance
	const contractInstance = new web3.eth.Contract(
		CampaignFactory.abi,
		contractAddress
	);
	return contractInstance;
};

export default factoryContract;
