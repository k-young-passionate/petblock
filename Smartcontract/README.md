
# Smart contract of pet block

## -Server deploy the smartcontract
#### contract owner is server

#### Only server can use the contract

## **·functions and so on**.


### -inform

#### triple mapping.
#### first address is pet owner's address.
#### second uint is pet index.
#### third uint is pet's medical certificate index.
#### fourth bytes32 is the hashed value of the certificate.

### -register

#### regist the pet's medical certificate.
#### all indexes are classified by server.

### -check

#### compare input hash value with registed.
#### if they are same, return true.

### -die

#### customer can request this function to server when the pet is dead.
#### The medical certificate index 0 indicates whether or not death occurred.
#### When it occurs, "die" is the value of inform[][][0].

### -changing

#### customer can requrest this function to server when a pet's owner is changing to other person.
#### data migration function.

### -callback

#### if user calls wrong function name, revert user's request.
Copyright ⓒ 2018 Sungkyunkwan University Blockchain R&D Academy. All rights reserved
