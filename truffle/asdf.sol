// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import './IDID_L2.sol';
import '../../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import { ICrossDomainMessenger } from '../../node_modules/@eth-optimism/contracts/libraries/bridge/ICrossDomainMessenger.sol';

contract DID_L2 is Ownable, IDID_L2 {

    // identifier => UserInfo
    mapping(string => UserData) private user;

    // L1 CA
    address private DID_L1_CA;
    string[] private userCodeList;

    // identifier => true/false
    mapping(string => bool) private isRegisteredUser;

    ICrossDomainMessenger private L2CrossDomainMessenger;

    constructor() {
        L2CrossDomainMessenger = ICrossDomainMessenger(0x4200000000000000000000000000000000000007);
    }

    function registerUser(string memory _identifier, UserData memory _userData) public override {

        require(!isRegisteredUser[_identifier]);
        
        UserData memory userData;

        userData.userCode = _userData.userCode;
        userData.userInfo = _userData.userInfo;

        user[_identifier] = userData;
        isRegisteredUser[_identifier] = true;
        userCodeList.push(_userData.userCode);
    }

    function withdrawUser(string memory _identifier) public override {
        require(isRegisteredUser[_identifier]);

        string memory userCode = user[_identifier].userCode;
        for (uint i=0; i<userCodeList.length; i++) {
            if (keccak256(abi.encodePacked(userCodeList[i])) == keccak256(abi.encodePacked(userCode))) {
                delete userCodeList[i];
            }
        }

        delete user[_identifier];
        isRegisteredUser[_identifier] = false;
    }

    function isRegistered(string memory _identifier) public view override returns (bool) {
        return isRegisteredUser[_identifier];
    }

    function getUserInfo(string memory _identifier) public view override onlyOwner returns (UserData memory) {
        require(isRegisteredUser[_identifier]);

        return user[_identifier];
    }

    function setL1_CA(address _CA) public onlyOwner {
        DID_L1_CA = _CA;
    }

    function sendToL1() public onlyOwner {

        string[] memory users = userCodeList;
        L2CrossDomainMessenger.sendMessage(DID_L1_CA, abi.encodeWithSignature("setUsers(string[])", users), 1000000);
    }
}