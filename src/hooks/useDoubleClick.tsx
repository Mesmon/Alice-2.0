import { useCallback, useRef } from "react"

/**
 * @param {clickEvent} doubleClick
 * @param {clickEvent} [click]
 * @param {UseDoubleClickOptions} [options]
 * @returns {clickEvent}
 */
export const useDoubleClick = (
    doubleClick: (event?: React.SyntheticEvent) => void,
    click: (event?: React.SyntheticEvent) => void,
    timeout = 200
) => {
    // we're using useRef here for the useCallback to rememeber the timeout
    const clickTimeout = useRef<NodeJS.Timeout | null | undefined>(null)

    const clearClickTimeout = () => {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current)
            clickTimeout.current = undefined
        }
    }

    // return a memoized version of the callback that only changes if one of the dependencies has changed
    return useCallback(
        (event) => {
            clearClickTimeout()
            if (click && event.detail === 1) {
                clickTimeout.current = setTimeout(() => {
                    click(event)
                }, timeout)
            }
            if (event.detail % 2 === 0) {
                doubleClick(event)
            }
        },
        [click, doubleClick, timeout]
    )
}
