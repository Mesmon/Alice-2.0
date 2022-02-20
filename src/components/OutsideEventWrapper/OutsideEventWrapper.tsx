import { RefObject } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useOnScrollOutside from "../../hooks/useOnScrollOutside";

interface IOutsideEventWrapper<T> {
  parentRef: RefObject<T>;
  onClickOutsideHandler: () => void;
  onScrollOutsideHandler: () => void;
  children: React.ReactNode;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export function OutsideEventWrapper<T extends HTMLElement = HTMLElement>({
  parentRef,
  onClickOutsideHandler,
  onScrollOutsideHandler,
  children,
}: IOutsideEventWrapper<T>) {
  useClickOutside(parentRef, onClickOutsideHandler);
  useOnScrollOutside(onScrollOutsideHandler);

  return <>{children}</>;
}

export default OutsideEventWrapper;
