// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DonationContract {
    struct Donation {
        address donor;
        uint256 amount;
    }

    struct Fundraiser {
        address beneficiary;
        string title;
        string description;
        uint256 targetAmount;
        uint256 amountCollected;
        string img;
        Donation[] donations;
    }

    mapping(uint256 => Fundraiser) public fundraisers;

    uint256 public numOfFundraisers = 0;
}
