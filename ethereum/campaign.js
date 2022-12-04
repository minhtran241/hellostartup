import getWeb3 from './web3';
import Campaign from './build/contracts/Campaign.json';

const web3 = await getWeb3();

export default (address) => {
	// Get network provider and web3 instance.
	return new web3.eth.Contract(Campaign.abi, address);
};
