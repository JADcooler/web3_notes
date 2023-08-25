/*
A signed message is prefixd with "\x19Ethereum Signed Message:\n" and 
the length of the message

eg:"\x19Ethereum Signed Message:\n2" for a message "hi"
"\x19Ethereum Signed Message:\n5" for a message of "fucka"

in ethers.js
            signedMessage = await player.signMessage(message);

in solidity

bytes32 hash2 = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n2",a));
address recoveredPubkey = ecrecover(hash2, v,r,s);
*/
_____________________
=====================

hash message ethers v5.7.2
*------------------------*
const messagePrefix = "\x19Ethereum Signed Message:\n";
function hashMessage(message) {
    if (typeof (message) === "string") {
        message = toUtf8Bytes(message);
    }
    return keccak256(concat([
        toUtf8Bytes(messagePrefix),
        toUtf8Bytes(String(message.length)),
        message
    ]));
}
-----------------------
=======================

hash Structs
*----------*

const domainFieldTypes: Record<string, string> = {
    name: "string",
    version: "string",
    chainId: "uint256",
    verifyingContract: "address",
    salt: "bytes32"
};

what you pass in domainFields will be there, unpassed keys wont exist

TypedDataEncoder.hashStruct("EIP712Domain", { EIP712Domain: domainFields }, domain)


