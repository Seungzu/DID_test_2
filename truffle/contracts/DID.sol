// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./IDID.sol";



contract DID is Ownable, IDID {

    // virtual은 덮어쓸수 있습니다. 의 뜻임.
    // override는 덮어쓴 함수입니다. 의 뜻임.

    // 접근 제어자
    // public - contract 내부/외부 모두에서 해당함수를 호출할수 있다.
    // private - contract 내부에서만 호출 할수 있다.
    // internal - contract 내부 or 상속된 contract에서 호출 가능
    // external - contract 내부에서 사용불가, 외부에서만 호출가능

    // view, pure ( 함수 타입 제어자 ) + feat.payable
    // 함수들 밖에있는 것들(?) 은 storage 에 저장됨.
    // user, isRegisteredUser, userCodeList 등은 storage state가 됨.
    // 즉 함수에서 storage state를 읽었기 때문에 view 를 써줘야함.
    // 만약 함수 안에서 storage state의 값을 변경해주면 view를 안쓰면 됨.
    // pure는 storage state를 변경도 안되고 읽어서도 안된다.

    

    mapping(uint => character) public characterList;

    function registeredTest(uint _num, string memory _name, string memory _job, uint _level) public override {
        characterList[_num] = character(_name, _job, _level);
    }

    function showTest(uint _num) view public override returns(character memory){
        return characterList[_num];
    }

    mapping(string => UserData) private user;
    mapping(string => bool) private isRegisteredUser;

    string[] public userCodeList;

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
        for(uint i = 0; i < userCodeList.length; i++){
            if(keccak256(abi.encodePacked(userCodeList[i])) == keccak256(abi.encodePacked(userCode))){
                delete userCodeList[i];
            }
        }

        delete user[_identifier];
        isRegisteredUser[_identifier] = false;
    }

    function isRegistered(string memory _identifier) public override view returns(bool) {
        return isRegisteredUser[_identifier];
    }

    function getUserInfo(string memory _identifier) public override view onlyOwner returns(UserData memory){
        return user[_identifier];
    }

    function userCodeListLength() public override view onlyOwner returns(uint256){
        return userCodeList.length;
    }

}