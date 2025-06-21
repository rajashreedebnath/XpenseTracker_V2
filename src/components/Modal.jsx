import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalWrapper({ isOpen, setIsOpen, children }) {

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      className="relative w-[95%] max-w-[572px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] bg-[#efefefd6] border-0 rounded-[15px] p-8"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      {children}
    </Modal>
  );
}
