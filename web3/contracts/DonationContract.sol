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

    event FundraiserCreated(
        uint256 fundraiserId,
        address beneficiary,
        string title,
        string description,
        string img,
        uint256 targetAmount
    );

    function createFundraiser(
        address _beneficiary,
        string memory _title,
        string memory _description,
        string memory _img,
        uint256 _targetAmount
    ) public returns (uint256) {
        Fundraiser storage fundraiser = fundraisers[numOfFundraisers];

        fundraiser.beneficiary = _beneficiary;
        fundraiser.title = _title;
        fundraiser.description = _description;
        fundraiser.img = _img;
        fundraiser.targetAmount = _targetAmount;
        fundraiser.amountCollected = 0;

        numOfFundraisers++;

        emit FundraiserCreated(
            numOfFundraisers - 1,
            _beneficiary,
            _title,
            _description,
            _img,
            _targetAmount
        );

        return numOfFundraisers - 1;
    }
}
