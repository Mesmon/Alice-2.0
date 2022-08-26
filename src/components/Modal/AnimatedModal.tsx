import { AnimatePresence } from "framer-motion";
import DropdownModal from "../Dropdown/DropdownModal";
import { Portal } from "../Portal/Portal";
import Modal from "./Modal";

interface Iprops {
  modalOpen: Boolean;
  handleClose: () => void;
  modalClassname: string;
  backdropClassname: string;
  children: React.ReactNode;
}

const AnimatedModal = ({
  modalOpen,
  handleClose,
  children,
  modalClassname,
  backdropClassname,
}: Iprops) => {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      {modalOpen && (
        <Portal>
          <Modal
            handleClose={handleClose}
            children={children}
            modalClassname={modalClassname}
            backdropClassname={backdropClassname}
          />
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
