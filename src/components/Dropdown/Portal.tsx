import { createPortal } from "react-dom"
export const Portal = ({ children }: { children: any }) => {
  return createPortal(children, document.body)
}
