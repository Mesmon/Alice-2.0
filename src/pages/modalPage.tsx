import type { NextPage } from "next";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/Modal/Modal";
import AnimatedModal from "../components/Modal/AnimatedModal";
import { usePopper } from "react-popper";
const ModalPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const [modal2Open, setModal2Open] = useState(false);
  const close2 = () => setModal2Open(false);
  const open2 = () => setModal2Open(true);

  const children = (
    <>
      <p>Ok thanks</p>
      <button onClick={close}>Really?</button>
    </>
  );

  const modalClassname =
    "m-auto flex h-[30vh] w-[50vw] flex-col items-center rounded-xl bg-orange-500 py-0 px-8";

  const backdropClassname =
    "bg-[#000000e1] absolute top-0 left-0 flex h-full w-full items-center justify-center";

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
      <div ref={setReferenceElement} className="max-w-fit absolute left-96 top-96">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-amber-600 text-slate-300"
          onClick={() => (modalOpen ? close() : open())}
        >
          Launch Modal
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-amber-600 text-slate-300"
        onClick={() => (modal2Open ? close2() : open2())}
      >
        BIGUS DIGUS
      </motion.button>
      <AnimatedModal
        modalOpen={modalOpen}
        handleClose={close}
        children={children}
        modalClassname={modalClassname}
        backdropClassname={backdropClassname}
        popperData={popperData}
      />
        <AnimatedModal
        modalOpen={modal2Open}
        handleClose={close2}
        children={children}
        modalClassname={modalClassname}
        backdropClassname={backdropClassname}
      />
    </div>
  );
};

export default ModalPage;
