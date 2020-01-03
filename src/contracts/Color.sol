pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2;
import "./ERC721Full.sol";


contract Color is ERC721Full{
    Color[] public colors;
    uint public colorCounts;
    mapping(string => bool) _colorExists;

    struct Color{
        uint id;
        string name;
        address payable owner;
    }
    constructor() ERC721Full("Color","COLOR") public{
    }

    function mint(string memory _color) public{
        // Require unique color
        colorCounts++;
        require(!_colorExists[_color]);
        Color memory _new_color = Color(colorCounts,_color, msg.sender);
        uint _id = colors.push(_new_color);
        // _mint(msg.sender, _id);
        _mint(msg.sender,colorCounts);
        _colorExists[_color] = true;
        // Color - add it
        // Call the mint function
        // Color- track it
    }   


    function buy(uint _id) payable public{
        Color memory _color = colors[_id];
        address payable _owner = _color.owner;   

        // uint  _second_id = colors[_id];
        // require(msg.sender != _owner);
        // isApprovedForAll(_owner, msg.sender);
        approve(msg.sender, _color.id);

        address(_owner).transfer(msg.value);
        // Sends the nft to the new owner
        transferFrom(_owner,msg.sender,_color.id);
        //  _owner = ownerOf(_color.id);
        _color.owner = msg.sender;
        colors[_id] = _color; 

    }


}
