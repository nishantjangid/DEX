// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TOKENTESTB is ERC20 , ERC20Burnable, Ownable{
    address public ownerAddress;
    constructor() ERC20("tokenb","TB") {
        ownerAddress = msg.sender;
    }

    function mint(address to,uint256 amount) public{
        _mint(to,amount);
    }
}
