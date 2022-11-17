// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Han_DID {

    struct UserData {
        string userCode;
        string userData;
    }

    struct CheckPointBySite {
        string site;
        uint256 point;
    }

    mapping(string => UserData) private DID_User;
    // user가 가지고있는 key값을 이용해 유저정보를 볼수있는 mapping

    mapping(string => CheckPointBySite[] ) private connected_Site_List;
    // DID에 가입되어있는 user가 현재 어떤 플랫폼이 연동되어있는지 보여주는 mapping

    


}