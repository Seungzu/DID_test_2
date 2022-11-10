// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

abstract contract IDID {
    // 모든기능을 다 넣지않았을땐 abstract를 써준다.

    struct UserData {
        string userCode;
        string userInfo;
    }

    struct character{
        string _name;
        string _job;
        uint _level;
    }

    // virtual은 덮어쓸수 있습니다. 의 뜻임.
    // override는 덮어쓴 함수입니다. 의 뜻임.

    function registeredTest(uint _num, string memory _name, string memory _job, uint _level ) virtual external;

    function showTest(uint _num) view public virtual returns(character memory);

    function registerUser(string memory _identifier, UserData memory _userData) virtual  external;

    function withdrawUser(string memory _identifier) virtual external;

    function isRegistered(string memory _identifier) virtual external view returns (bool);

    function getUserInfo(string memory _identifier) virtual external view returns(UserData memory);

    function userCodeListLength() virtual external view returns(uint256);
    

}