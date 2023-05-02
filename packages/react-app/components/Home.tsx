import React, { useState } from "react";

const Home = (props: any) => {
  const [description, setDescription] = useState("");

  const [newmemberAddress, setNewMemberAddress] = useState("");

  const [memberAddress, setMemberAddress] = useState("");

  const [votingpower, setVotingPower] = useState(0);

  const isFormFilled = () => description;
  const isNewMemberFormFilled = () => newmemberAddress;
  const isMemberFormFilled = () => memberAddress;

  // proposal modal functions
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // member modal functions
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  const handleNewMemberModalClose = () => setShowNewMemberModal(false);
  const handleNewMemberModalShow = () => setShowNewMemberModal(true);

  // remove member modal functions
  const [showMemberModal, setShowMemberModal] = useState(false);

  const handleMemberModalClose = () => setShowMemberModal(false);
  const handleMemberModalShow = () => setShowMemberModal(true);

  return (
    <>
      <nav className="bg-gray-200 m-5 p-5 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold">
          Celo Dao
        </a>
        <div className="flex items-center">
          <span className="bg-gray-500 text-white px-3 py-1 rounded mr-3">
            Balance {props.cUSDBalance}cUSD
          </span>
          <button
            onClick={handleShow}
            className="bg-gray-800 text-white px-4 py-2 rounded mr-3"
          >
            Create Proposal
          </button>
          <button
            onClick={handleNewMemberModalShow}
            className="bg-gray-800 text-white px-4 py-2 rounded mr-3"
          >
            Add New Member
          </button>
          <button
            onClick={handleMemberModalShow}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Remove Member
          </button>
        </div>
      </nav>

      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${!show && "hidden"}`}
      >
        <div className="min-h-screen px-4 py-6 md:py-16 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">New Proposal</h2>
              <button onClick={handleClose} className="text-gray-800">
                &times;
              </button>
            </div>
            <form>
              <div className="mt-4">
                <label
                  htmlFor="inputDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="inputDescription"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="description"
                  style={{ height: "80px" }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </form>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                disabled={!isFormFilled()}
                onClick={() => {
                  props.addProposal(description);
                  handleClose();
                }}
                className={`px-4 py-2 rounded text-white ${
                  isFormFilled() ? "bg-gray-800" : "bg-gray-500"
                }`}
              >
                Add Proposal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          !showNewMemberModal && "hidden"
        }`}
      >
        <div className="min-h-screen px-4 py-6 md:py-16 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">New Member</h2>
              <button
                onClick={handleNewMemberModalClose}
                className="text-gray-800"
              >
                &times;
              </button>
            </div>
            <form>
              <div className="mt-4">
                <label
                  htmlFor="inputAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member Address
                </label>
                <input
                  id="inputAddress"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => {
                    setNewMemberAddress(e.target.value);
                  }}
                  placeholder="Address"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="inputVotingPower"
                  className="block text-sm font-medium text-gray-700"
                >
                  Voting Power
                </label>
                <input
                  id="inputVotingPower"
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e: any) => {
                    setVotingPower(e.target.value);
                  }}
                  placeholder="Select Voting Power"
                />
              </div>
            </form>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleNewMemberModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                disabled={!isNewMemberFormFilled()}
                onClick={() => {
                  props.addMember(newmemberAddress, votingpower);
                  handleClose();
                  handleNewMemberModalClose();
                }}
                className={`px-4 py-2 rounded text-white ${
                  isNewMemberFormFilled() ? "bg-gray-800" : "bg-gray-500"
                }`}
              >
                Add New Member
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          !showMemberModal && "hidden"
        }`}
      >
        <div className="min-h-screen px-4 py-6 md:py-16 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Remove Member</h2>
              <button
                onClick={handleMemberModalClose}
                className="text-gray-800"
              >
                &times;
              </button>
            </div>
            <form>
              <div className="mt-4">
                <label
                  htmlFor="inputAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member Address
                </label>
                <input
                  id="inputAddress"
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => {
                    setMemberAddress(e.target.value);
                  }}
                  placeholder="Address"
                />
              </div>
            </form>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleMemberModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                disabled={!isMemberFormFilled()}
                onClick={() => {
                  props.removeMember(memberAddress);
                  handleMemberModalClose();
                }}
                className={`px-4 py-2 rounded text-white ${
                  isMemberFormFilled() ? "bg-gray-800" : "bg-gray-500"
                }`}
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
