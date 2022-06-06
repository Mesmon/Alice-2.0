import { motion } from "framer-motion";
import { Children, useEffect } from "react";
import { Portal } from "../Portal/Portal";
import Backdrop from "./Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0vh",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface Iprops {
  handleClose: () => any;
  children: React.ReactNode;
  modalClassname: string;
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
const Modal = ({
  handleClose,
  children,
  modalClassname,
  backdropClassname,
  popperData,
}: Iprops) => {
  return (
    <Backdrop onClick={handleClose} backdropClassname={backdropClassname} popperData={popperData}>
      <motion.div
        ref={popperData?.ref}
        style={popperData?.style}
        {...popperData?.attributes}

        onClick={(e) => e.stopPropagation()}
        className={modalClassname}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
