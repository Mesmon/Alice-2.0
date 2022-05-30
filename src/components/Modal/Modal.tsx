import { useEffect } from "react";
import { Portal } from "../Dropdown/Portal";

const MODAL_WIDTH = 30; //vw
const MODAL_HEIGHT = 20; //vh

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: Boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  function escHandler({ key }: { key: String }) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  if (typeof document !== "undefined") {
    return (
      <Portal>
        <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
          {/* backdrop */}
          <div
            className={`fixed inset-0 bg-black ${
              open ? "opacity-50" : "pointer-events-none opacity-0"
            } transition-opacity duration-300 ease-in-out`}
            onClick={onClose}
          />

          {/* content */}
          <div
            className={`fixed h-[${MODAL_HEIGHT}]
        top-[${Math.ceil((100 - MODAL_HEIGHT) / 2)}vh]
        left-[${Math.ceil((100 - MODAL_WIDTH) / 2)}vw] 
        w-[${MODAL_WIDTH}vw] rounded-md bg-white p-4 shadow-lg ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            } transition-opacity duration-300 ease-in-out`}
          >
            <div>
              <button onClick={onClose}>Click to close modal</button>
            </div>
            {children}
          </div>
        </div>
      </Portal>
    );
  } else {
    return null;
  }
}
