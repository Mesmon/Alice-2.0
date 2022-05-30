import type { NextPage } from "next";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
const ModalPage: NextPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={"bg-slate-700"}>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-gray-200 px-4 py-3"
      >
        Click here to open modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        ok boomer
      </Modal>
    </div>
  );
};

export default ModalPage;
