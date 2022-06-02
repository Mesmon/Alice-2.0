import type { NextPage } from "next";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/Modal/Modal";
import AnimatedModal from "../components/Modal/AnimatedModal";
const ModalPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

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

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-amber-600 text-slate-300"
        onClick={() => (modalOpen ? close() : open())}
      >
        Launch Modal
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-amber-600 text-slate-300"
        onClick={() => console.log("bruh")}
      >
        BIGUS DIGUS
      </motion.button>
      {/* <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal handleClose={close} text={"bruh"} />}
      </AnimatePresence> */}
      <AnimatedModal
        modalOpen={modalOpen}
        handleClose={close}
        children={children}
        modalClassname={modalClassname}
        backdropClassname={backdropClassname}
      />
    </div>
    // <div className={"bg-slate-700"}>
    //   <button
    //     onClick={() => setOpen(true)}
    //     className="rounded-full bg-gray-200 px-4 py-3"
    //   >
    //     Click here to open modal
    //   </button>

    //   <Modal open={open} onClose={() => setOpen(false)}>
    //     ok boomer
    //   </Modal>
    // </div>
  );
};

export default ModalPage;
