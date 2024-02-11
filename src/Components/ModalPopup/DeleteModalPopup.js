

import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Modals.css";
import BinIcon from '../../Assets/bin.png'

const DeleteModalPopup = ({ isOpen,deletebtn, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose} className="text-center " centered>
      <Modal.Header className="justify-content-center ">
        <Modal.Title className="HeaderFont">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body className="messageFont text-capitalize">
        <img src={BinIcon} alt="correct" width={"15%"}></img>
        <p className="m-3">Are You Sure Want to Delete this Product..!</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-around">
        <Button variant="outline-danger w-25" onClick={onClose}>
          No
        </Button>

        <Button variant="outline-success w-25" onClick={deletebtn}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModalPopup;
