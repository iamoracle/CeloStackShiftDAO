import Home from "./../components/Home";
import { Proposals } from "./../components/Proposals";
import { useState, useEffect, useCallback } from "react";
import celodao from "./../contracts/celo-dao.abi.json";
import { useCelo } from "@celo/react-celo";

const ERC20_DECIMALS = 18;
const contractAddress = "0x69dfb020bA12Ce303118E3eF81f9b9E4eB08cE17";

function App() {
  const { kit, address } = useCelo();
  const contract = new kit.connection.web3.eth.Contract(
    celodao,
    contractAddress
  );
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [proposals, setProposals] = useState([]);

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(celodao, contractAddress);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const getProposals = useCallback(async () => {
    const proposalsLength = await contract.methods.getProposalsLength().call();
    const _proposals = [];

    for (let index = 0; index < proposalsLength; index++) {
      const proposal = await contract.methods.getProposal(index).call();

      _proposals.push({
        index,
        proposalId: proposal[0],
        proposer: proposal[1],
        description: proposal[2],
        yesVotes: proposal[3],
        noVotes: proposal[4],
        executed: proposal[6],
      });
    }

    setProposals(_proposals);
  }, [contract]);

  const addProposal = async (_description: any) => {
    try {
      await contract.methods
        .createProposal(_description)
        .send({ from: address });
      getProposals();
    } catch (error) {
      alert(error);
    }
  };

  const addMember = async (_address: any, _votingPower: any) => {
    try {
      await contract.methods
        .addMember(_address, _votingPower)
        .send({ from: address });
      getProposals();
    } catch (error) {
      alert(error);
    }
  };

  const removeMember = async (_address: any) => {
    try {
      await contract.methods.removeMember(_address).send({ from: address });
      getProposals();
    } catch (error) {
      alert(error);
    }
  };

  const vote = async (_proposalId: any, _vote: any) => {
    try {
      await contract.methods.vote(_proposalId, _vote).send({ from: address });
      getProposals();
    } catch (error) {
      alert(error);
    }
  };

  const executeProposal = async (_proposalId: any) => {
    try {
      await contract.methods
        .executedProposal(_proposalId)
        .send({ from: address });
      getProposals();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  useEffect(() => {
    if (contract) {
      getProposals();
    }
  }, [contract, getProposals]);

  return (
    <>
      <Home
        cUSDBalance={cUSDBalance}
        addMember={addMember}
        addProposal={addProposal}
        removeMember={removeMember}
      />
      <Proposals
        proposals={proposals}
        vote={vote}
        executeProposal={executeProposal}
        walletAddress={address}
      />
    </>
  );
}

export default App;
