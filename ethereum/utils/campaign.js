import Campaign from '../build/contracts/Campaign.json';

const campaignContract = async (web3, contractAddress) => {
	// create the instance
	const contractInstance = new web3.eth.Contract(
		Campaign.abi,
		contractAddress
	);
	return contractInstance;
};

export default campaignContract;
