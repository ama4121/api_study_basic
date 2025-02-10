import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${className}`}>
        {children}
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default Modal;
