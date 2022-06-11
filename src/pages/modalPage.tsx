import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/Modal/Modal";
import AnimatedModal from "../components/Modal/AnimatedModal";
import { usePopper } from "react-popper";
import { Portal } from "../components/Portal/Portal";
import DropdownModal from "../components/Dropdown/DropdownModal";
const ModalPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const [modal2Open, setModal2Open] = useState(false);
  const close2 = () => setModal2Open(false);
  const open2 = () => setModal2Open(true);

  useEffect(() => {
    const escapeKeyPress = (e: { keyCode: number }) => {
      if (e.keyCode == 27) {
        close();
      }
    };
    window.addEventListener("keydown", escapeKeyPress);
    return () => {
      window.removeEventListener("keydown", escapeKeyPress);
    };
  }, []);

  const children = (
    <>
      <p>Ok thanks</p>
      <button onClick={close}>Really?</button>
    </>
  );

  const modalClassname =
    "m-auto flex h-[30vh] w-[50vw] flex-col items-center rounded-xl bg-orange-500 py-0 px-8";

  const backdropClassname =
    "bg-[#00000000] absolute top-0 left-0 h-full w-full grid justify-center content-center";

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const popperData = {
    ref: setPopperElement,
    style: styles.popper,
    attributes: attributes.popper,
  };

  return (
    <div>
      <div
        ref={setReferenceElement}
        className="absolute left-[70vw] top-40 max-w-fit"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className=" bg-amber-600 text-slate-300"
          onClick={() => (modalOpen ? close() : open())}
        >
          Launch Modal
        </motion.button>
      </div>

      <DropdownModal
        modalOpen={modalOpen}
        handleClose={close}
        modalClassname={modalClassname}
        backdropClassname={backdropClassname}
        popperData={popperData}
      >
        {children}
      </DropdownModal>
    </div>
  );
};

export default ModalPage;
