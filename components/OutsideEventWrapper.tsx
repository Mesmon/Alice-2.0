import { RefObject } from "react"
import useOnClickOutside from "../utils/hooks/useOnClickOutside"
import useOnScrollOutside from "../utils/hooks/useOnScrollOutside"

interface IOutsideEventWrapper<T> {
    parentRef: RefObject<T>
    onClickOutsideHandler: () => void
    onScrollOutsideHandler: () => void
    children: React.ReactNode
}

export function OutsideEventWrapper<T extends HTMLElement = HTMLElement>({
    parentRef,
    onClickOutsideHandler,
    onScrollOutsideHandler,
    children,
}: IOutsideEventWrapper<T>) {
    useOnClickOutside(parentRef, onClickOutsideHandler)
    useOnScrollOutside(onScrollOutsideHandler)

    return <>{children}</>
}

export default OutsideEventWrapper
