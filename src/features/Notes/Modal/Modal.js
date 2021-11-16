import Modal from "react-modal";
import React from "react";
import style from "./Modal.module.css";
Modal.setAppElement("#root");

class AppModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {}

  handleCloseModal() {
    this.props.close();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        className={style.Modal}
        overlayClassName={style.Overlay}
        onRequestClose={this.handleCloseModal}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default AppModal;
