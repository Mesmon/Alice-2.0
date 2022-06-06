import { AnimatePresence } from "framer-motion";
import { Portal } from "../Portal/Portal";
import Modal from "./Modal";

interface Iprops {
  modalOpen: Boolean;
  handleClose: () => void;
  modalClassname: string;
  backdropClassname: string;
  children: React.ReactNode;
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

const AnimatedModal = ({
  modalOpen,
  handleClose,
  children,
  modalClassname,
  backdropClassname,
  popperData,
}: Iprops) => {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      <Portal>
        {modalOpen && (
          <div>
            <Modal
              handleClose={handleClose}
              children={children}
              modalClassname={modalClassname}
              backdropClassname={backdropClassname}
              popperData={popperData}
            />
          </div>
        )}
      </Portal>
    </AnimatePresence>
  );
};

export default AnimatedModal;
