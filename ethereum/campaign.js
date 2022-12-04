import getWeb3 from './utils/web3';
import Campaign from './build/contracts/Campaign.json';

export default async (address) => {
	// Get network provider and web3 instance.
	const web3 = await getWeb3();
	return new web3.eth.Contract(Campaign.abi, address);
};
