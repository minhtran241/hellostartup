# HelloStartUp

***Secured Ethereum Crowdfunding Platform***

<p align="center">
  <img alt="made for ethereum" src="https://img.shields.io/badge/made_for-ethereum-771ea5.svg">
  <img alt="languages" src="https://img.shields.io/github/languages/count/minhtran241/hellostartup">
  <img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg">
</p>

***HelloStartUp*** allows you to create and manage campaigns in the Goerli network using Ethereum smart contracts.

The idea was inspired by [Kickstarter](https://www.kickstarter.com).

***Problem***

To Increase Transparency and Prevent Fraudulent Activities that arise around the world of StartUps and Platforms that have till now been developed around it such as [Kickstarter](https://www.kickstarter.com). Although stringent measures such as symmetric encryption are in place to make e-payment safe and secure, it is still vulnerable to hacking. Enterprises with in-house e-payment systems must incur additional costs in procuring, installing and maintaining sophisticated payment-security technologies. There is no guarantee that people who post projects on [Kickstarter](https://www.kickstarter.com) will deliver on their projects, use the money to implement their projects, or that the completed projects will meet backers' expectations. ***HelloStartUp*** is a mockup of [Kickstarter](https://www.kickstarter.com) built using smart contracts written in **Solidity**.

***Solution***

Making transaction histories more transparent and secure through the use of Blockchain technology. Because Blockchain is a type of distributed ledger, all network participants share the same documentation as opposed to individual copies. Backers can decide **Where** to invest and can **Acknowledge** the requests for money made by the Project Creators through their votes.The creator can only use the money if a minimum number of backers approve a certain request. It will make sure the money is used for **Necessities**.

---

* The project is a decentralized crowdfunding application, built to solve the problem of money being misused by people, collected using the traditional crowdfunding applications.
* Blockchain helped in keeping track of the money collected using the application, and storing it under the control of a piece of code.
* Hence not letting the money get into the hands of anyone and removing every possibility of it getting misused. Thus allowing us to reach to a logical solution to the problem in hand.
* Same as crowdfunding in the real world, you can create campaigns requiring goal and minimum pledge amount.
* The start up can propose how to use money and how much money is needed as a `Request`.
* The start up cannot use money without more than 50% approvers in voting.

---

***Packages utilized:***

* [Next.js](https://nextjs.org/) - Server Rendered Apps
* [Web3Js](https://web3js.readthedocs.io/en/1.0/) - Ethereum Javascript API
* [Semantic UI](https://react.semantic-ui.com/) - User Interface

![Ethereum Campaigns Project](https://i.imgur.com/ZJnIbFN.gif)

## Prerequisites

* [Metamask browser extension](https://metamask.io/) installed and account.

* Some ether balance using [Goerli Authenticated Faucet](https://goerlifaucet.com).

* In the absence of [Metamask]((https://metamask.io/)), ***HelloStartUp*** will fall back to using [Infura node](https://infura.io/) to access the Goerli network.

## Smart Contract

* The contract for ***HelloStartUp*** is deployed at address [0xd5872c1bC3f375C14B13eA0FA42E72D377A27c58](https://goerli.etherscan.io/address/0xD7d2347d300718479321E63CA28832454fba9250) and is available inside [ethereum/contracts](https://github.com/minhtran241/HelloStartUp/tree/main/ethereum/contracts). You can explore the deployed contract on TESTNET Goerli (GTH) Blockchain Explorer (Etherscan) at [here](https://goerli.etherscan.io/address/0xD7d2347d300718479321E63CA28832454fba9250).

* ***HelloStartUp*** will interact with the deployed the contract to create campaigns.

* Compile, test and deploy contract:

    ***Note:*** You have to install required packages by running `yarn install` and set up all the environment variables before doing this step.

    ```sh
    cd ethereum
    yarn compile
    yarn test
    yarn deploy
    ```

## Running the project

```sh
yarn install
yarn dev
```

***Note:*** The web page runs on <http://localhost:3000>. Next.js performs server-side rendering of the pages and hot reloading as you make any changes to the code.

## Operations

### Create Campaign

1. Startups can create campaign by specifying the goal of their campaign and minimum pledge amount required.

2. Once the campaign is created, startups become the manager of their campaign and will be able to create requests for the purpose of building up the campaign which need to be approved by the backers.

3. Any backers below the requirement for the campaign will have their transaction rejected.

### View Campaign

Shows details of the campaign such as the address of the account which created the campaign, goal, minimum pledge amount required, campaign current balance, number of people who have pledged for the campaign, and number of requests created by the manager.

### Back the Campaign

Allows backers to pledge and back to the campaign.

### View Requests

* List the requests created by the manager for building up their campaign.

* Backers of the campaign can approve requests.

### Add Request

1. The manager of a campaign can create a request which will be fulfilled by the recipient.

2. Once equal or more than 50% of the campaign backers approve the request, the startups can finalize the payment to the vendor.
