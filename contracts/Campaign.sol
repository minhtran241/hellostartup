// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approversCount;
        mapping(address => bool) approvals;
    }

    address public mananger;
    uint256 public goal;
    uint256 public minimumPledgeAmount;
    uint256 public backersCount;
    mapping(address => uint256) public backers;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == mananger, "Permission denied");
        _;
    }

    constructor(
        uint256 _goal,
        uint256 _minimumPledgeAmount,
        address creator
    ) {
        mananger = creator;
        goal = _goal;
        minimumPledgeAmount = _minimumPledgeAmount;
    }

    function pledge() public payable {
        require(msg.value >= minimumPledgeAmount);

        backers[msg.sender] = msg.value;
        backersCount++;
    }

    function createRequest(
        string calldata description,
        uint256 value,
        address payable recipient
    ) external restricted {
        require(value <= address(this).balance, "Not enough balance");

        Request storage r = requests.push();
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approversCount = 0;
    }

    function approveRequest(uint256 index) external {
        require(msg.sender != mananger);
        require(backers[msg.sender] >= minimumPledgeAmount);

        Request storage request = requests[index];

        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approversCount++;
    }

    function finalizeRequest(uint256 index) external restricted {
        Request storage request = requests[index];

        require(
            request.approversCount >= (backersCount / 2),
            "More than or 50% approvals needed"
        );
        require(!request.complete, "The request has already completed");

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
