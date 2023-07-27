import Modal from "react-modal";
import React from "react";
import Button from "../button/Button";
import {X} from "@phosphor-icons/react";

function MessageModal({message, setError}) {

    // ...................MODAL
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: "#FBF7F4FF",
            border: "solid 3px #1989AC",
            borderRadius: "10px",
        },
    };

    Modal.setAppElement('#root');


    const [modalIsOpen, setModalIsOpen] = React.useState(true);


    function closeModal() {
        setModalIsOpen(false);
        setError(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen} //if modal is open
            onRequestClose={closeModal} //what to do after modal close
            style={customStyles}
            contentLabel="Message"
        >
            <Button
                className="icon-button-modal"
                onClick={closeModal}
            ><X color="#1989AC" width='2rem' height='2rem'/>
            </Button>
            <p>{message}</p>
        </Modal>
    )

}

export default MessageModal;