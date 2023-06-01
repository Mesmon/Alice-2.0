import { motion } from 'framer-motion';
import React from 'react';
import Backdrop from '../Modal/Backdrop';
import { Portal } from '../Portal/Portal';

interface Iprops {
  modalOpen: boolean;
  handleClose: () => any;
  children: React.ReactNode;
  modalClassname?: string;
  backdropClassname: string;
  popperData?: {
    ref: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
    style: React.CSSProperties;
    attributes:
    | {
      [key: string]: string;
    }
    | undefined;
  };
}
const DropdownModal = ({
  modalOpen,
  handleClose,
  children,
  modalClassname,
  backdropClassname,
  popperData,
}: Iprops) => (modalOpen ? (
    <Portal>
      <Backdrop
        onClick={handleClose}
        backdropClassname={backdropClassname}
      >
        <div
          ref={popperData?.ref}
          style={popperData?.style}
          {...popperData?.attributes}

          onClick={(e) => e.stopPropagation()}
          className={modalClassname}
        >
          {children}
        </div>
      </Backdrop>
    </Portal>
) : null);

export default DropdownModal;
