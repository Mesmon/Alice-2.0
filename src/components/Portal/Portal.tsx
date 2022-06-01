import { createPortal } from "react-dom";
export const Portal = ({ children }: { children: any }) => {
  if (typeof window !== "undefined")
    return createPortal(children, document.body);
  return null;
};
