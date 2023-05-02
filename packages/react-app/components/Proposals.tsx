import React from "react";

export const Proposals = (props: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {props.proposals.map((proposal: any) => (
        <div key={proposal.index} className="bg-white rounded-lg shadow-md">
          <div className="bg-black p-2">
            <div className="flex justify-end">
              <span className="bg-secondary text-white px-2 py-1 rounded-md mr-2">
                {proposal.proposalId} ID
              </span>
              <span className="bg-secondary text-white px-2 py-1 rounded-md mr-2">
                {proposal.yesVotes} yes Votes
              </span>
              <span className="bg-secondary text-white px-2 py-1 rounded-md">
                {proposal.noVotes} no Votes
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{proposal.description}</h2>
            {props.walletAddress === proposal.proposer && (
              <button
                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2"
                onClick={() => props.executeProposal(proposal.proposalId)}
              >
                Execute Proposal
              </button>
            )}
            <form className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => props.vote(proposal.proposalId, true)}
                className="bg-black text-white rounded-md px-4 py-2 mr-2"
              >
                Vote Yes
              </button>
              <button
                type="button"
                onClick={() => props.vote(proposal.proposalId, false)}
                className="bg-black text-white rounded-md px-4 py-2"
              >
                Vote No
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};
