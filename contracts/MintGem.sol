// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintGem is ERC721Enumerable {
    string uri;

    constructor(string memory _name, string memory _symbol, string memory _uri) ERC721(_name, _symbol) {
        uri = _uri;
    }

    struct GemData {
        uint gemRank;
        uint gemType;
    }

    mapping(uint => GemData) public gemData;

    function tokenURI(uint _tokenId) override public view returns (string memory) {
        string memory gemRank = Strings.toString(gemData[_tokenId].gemRank);
        string memory gemType = Strings.toString(gemData[_tokenId].gemType);

        return string(
            abi.encodePacked(uri, '/', gemRank, '/', gemType, '.json')
        );
    }

    function mintGem() public {
        uint tokenId = totalSupply() + 1;

        gemData[tokenId] = GemData(4, 4);

        _mint(msg.sender, tokenId);
    }
}