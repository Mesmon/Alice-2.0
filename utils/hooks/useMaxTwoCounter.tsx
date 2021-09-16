import { useEffect, useState } from "react"

export const useMaxTwoCounter = (initialCount = 0) => {
    const [count, setCount] = useState(initialCount)

    const incCount = () => setCount(count + 1)
    const resetCount = () => setCount(0)

    useEffect(() => {
        if (count > 2) {
            resetCount()
        }
    }, [count])

    return { count, incCount, resetCount }
}

export const useIsOpenDblClick = () => {
    const [isOpen, _setIsOpen] = useState(false)
    const [isHalfOpen, setIsHalfOpen] = useState(false)
    const { count, incCount, resetCount } = useMaxTwoCounter()

    const setIsOpen = (sentIsOpen: boolean) => {
        if (sentIsOpen === false) {
            resetCount()
            setIsHalfOpen(false)
            _setIsOpen(false)
        }
    }

    useEffect(() => {
        if (count === 2) {
            _setIsOpen(true)
            setIsHalfOpen(false)
        }
        if (count === 1) {
            setIsHalfOpen(true)
        }
    }, [count])

    return { isOpen, setIsOpen, incCount, isHalfOpen }
}
