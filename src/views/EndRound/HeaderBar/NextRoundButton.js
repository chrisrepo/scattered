import React from 'react';
import Modal from 'react-modal';
import './NextRoundButton.css';
Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const NextRoundButton = ({ lobby, ws, promptInd }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const nextRoundButtonClicked = () => {
    if (promptInd < 9) {
      openModal();
    } else {
      ws.emit('host-end-scoring', {
        roomId: lobby.roomId,
      });
    }
  };

  const modalOverride = () => {
    ws.emit('host-end-scoring', {
      roomId: lobby.roomId,
    });
  };

  return (
    <React.Fragment>
      <div id="next-round-button" onClick={nextRoundButtonClicked}>
        Finish Scoring and Next Round
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example TEST"
      >
        <h2>Are you sure you want to end the round?</h2>
        <h4>You have not scored each prompt yet.</h4>
        <div className="modal-button-container">
          <div className="next-modal-button cancel" onClick={closeModal}>
            Cancel
          </div>
          <div className="next-modal-button end" onClick={modalOverride}>
            End Round
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default NextRoundButton;
