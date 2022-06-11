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
      duration: 0.05,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

interface Iprops {
  handleClose: () => any;
  children: React.ReactNode;
  modalClassname: string;
  backdropClassname: string;
}
const Modal = ({
  handleClose,
  children,
  modalClassname,
  backdropClassname,
}: Iprops) => {
  return (
    <Backdrop onClick={handleClose} backdropClassname={backdropClassname}>
      <motion.div
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
