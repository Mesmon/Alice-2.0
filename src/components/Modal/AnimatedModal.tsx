import { AnimatePresence } from "framer-motion";
import { Portal } from "../Portal/Portal";
import Modal from "./Modal";

interface Iprops {
  modalOpen: Boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const AnimatedModal = ({ modalOpen, handleClose, children }: Iprops) => {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      <Portal>
        {modalOpen && <Modal handleClose={handleClose} children={children} />}
      </Portal>
    </AnimatePresence>
  );
};

export default AnimatedModal;
