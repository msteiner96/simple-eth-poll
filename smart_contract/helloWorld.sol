// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloVote {
    
    // Hello World Struct
    struct HelloWorld {
        string name; 
        uint voteCount;
    }
    
    // Dynamic array for all HelloWorlds
    HelloWorld[] private HelloWorlds;

    /**
     * Vote for a HelloWorld 
     **/
    function VoteHello(uint helloIndex) public {
        HelloWorlds[helloIndex].voteCount += 1;
    }
    
    /**
     * Create a new HelloWorld 
     **/
    function CreateHello(string memory _hello) public {
        HelloWorld memory newHello = HelloWorld({
            name:_hello, 
            voteCount:0
        });
        
        HelloWorlds.push(newHello);
    }
    
    /**
     * Get the most voted HelloWorld
     **/
    function GetHello() public view returns (string memory) {
        uint winningVoteCount = 0;
        uint winningProposal = 0;
        for (uint h = 0; h < HelloWorlds.length; h++) {
            if (HelloWorlds[h].voteCount > winningVoteCount) {
                winningVoteCount = HelloWorlds[h].voteCount;
                winningProposal = h;
            }
        }
        return HelloWorlds[winningProposal].name;
    }
    
    /**
     * Get all HelloWorlds
     **/
    function GetHelloListing() public view returns (HelloWorld [] memory) {
        return HelloWorlds;
    }
    
}