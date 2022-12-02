// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 goal, uint256 minimumPledgeAmount)
        external
    {
        address newCampaign = address(
            new Campaign(goal, minimumPledgeAmount, msg.sender)
        );
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() external view returns (address[] memory) {
        return deployedCampaigns;
    }
}
