pragma solidity ^0.4.25;

contract pet_block {
    address owner; // server wallet address
    
    /*
      make event for storing all data.
    */
    event register (bytes32 pet_owner, uint32 pet_index, uint32 certificate_index, bytes32 hash); 
    
    /*
      owner is server.
    */
    constructor () public {
        owner = msg.sender;    
    }
    
    /*
      regist pet's medical certificate hash to contract by event log.
      input : pet_owner : pet owner's wallet address, pet_index : pet's index, certificate_index : pet's medical certificate's index, hash : the hashed certificate
      output : bool (true : success)
    */
    function regist(bytes32 pet_owner, uint32 pet_index, uint32 certificate_index, bytes32 hash) public returns (bool){
        require(owner == msg.sender);
        
        emit register (pet_owner, pet_index, certificate_index, hash);
        return true;
    }
    
    /*
      callback function revert
    */
    function () public {
        revert();
    }
}
