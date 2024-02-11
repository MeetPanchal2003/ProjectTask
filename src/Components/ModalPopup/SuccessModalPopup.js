import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Modals.css";
import CorrectIcon from '../../Assets/correct-icon.png'

const SuccessModalPopup = ({ isOpen, onClose, message }) => {
  return (
    <Modal show={isOpen} onHide={onClose} className="text-center " centered>
      <Modal.Header className="justify-content-center ">
        <Modal.Title className="HeaderFont">Success</Modal.Title>
      </Modal.Header>
      <Modal.Body className="messageFont text-capitalize">
        <img src={CorrectIcon} alt="correct" width={"15%"}></img>
        <p className="m-3">{message}</p>
        <small>Go to Home and show Your Vendor Details</small>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="outline-success w-50" onClick={onClose}>
          Go To Home
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModalPopup;
