pragma solidity ^0.4.25;


contract pet_block {
    //contract owner address variable -> server's account
    address owner;
    
    //address : pet owner, uint : pet index, uint : medical certificate index, bytes32 : hash value
    mapping(address => mapping(uint => mapping(uint => bytes32))) inform;

    //owner : server address
    constructor () public {
        owner = msg.sender;
    }
    
    /* 
       regist hashed pet's medical certificate 
       
       input : has : hash value, pet_index : pet number, certificate_index : medical certificate index
       output : bool (true : operation success, false : msg.sender is not owner)
    */
    function register (bytes32 has, address pet_owner, uint pet_index, uint certificate_index) public returns(bool) {
        if (msg.sender == owner) {
            inform[pet_owner][pet_index][certificate_index] = has;
            return true;
        }
        return false;
    }
    
    /* 
       compare input that was hashed pet's medical certificate value with hash value which is in inform.
       On this, return true when hash value is same and return false when value isn't same.
       
       input : has : hash value, pet_index : pet number, certificate_index : medical certificate index
       output : bool (true : comparing accord, false : comparing is not accord -> wrong input or information is falsified)
    */
    function check (bytes32 has, address pet_owner, uint pet_index, uint certificate_index) public view returns(bool) {
        require(msg.sender == owner, "need server account address");
        if (inform[pet_owner][pet_index][certificate_index] == has) return true;
        return false;
    }
    
    /*
       if pet is dead then use this function for registing death.
       
       input : pet_owner : pet owner, pet_index : pet number
       output : bool (true : success to process)
    */
    function die (address pet_owner, uint pet_index) public returns(bool) {
        require(msg.sender == owner, "need server account address");
        inform[pet_owner][pet_index][0] = "die";
        return true;
    }
    
    /*
       if pet owner is changed then use this function for processing it
       
       input : pet_owner : pet owner, pet_index : pet number, new_owner : new pet owner, new_index : new pet index
       output : bool (true : success to change, false : process is failed)
    */
    function changing (address pet_owner, uint pet_index, address new_owner, uint new_index) public returns(bool) {
        require(msg.sender == owner, "need server account address");
        for (uint i = 0 ; inform[pet_owner][pet_index][i] != 0 ; i++) {
            inform[new_owner][new_index][i] = inform[pet_owner][pet_index][i];
            inform[pet_owner][pet_index][i] = "";
        }
        return true;
    }
    
    /*
       callback function
    */
    function () public{
        revert();
    }
}