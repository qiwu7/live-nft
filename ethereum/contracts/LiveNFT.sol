// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LiveNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("LiveNFT", "LNFT") {}

    function mint(address holder)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(holder, newItemId);

        string memory tokenURI = string(abi.encodePacked(
            "https://live-nft.herokuapp.com/address/",
            Strings.toHexString(uint256(uint160(holder)), 20),
            "/metadata"
        ));

        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}
