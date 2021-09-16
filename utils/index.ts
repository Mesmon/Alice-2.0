import { MutableRefObject } from "react"

/**
 * @description Useful utility to break long tailwind className string into multiple strings
 * @param classes All the strings for className
 * @returns A Single string containig all the classes
 */
export function tailwindCombine(
    ...classes: (false | null | undefined | string)[]
): string {
    return classes.filter(Boolean).join(" ")
}

const isMutableRefObject = <T>(thing: any): thing is MutableRefObject<T> =>
    (thing as MutableRefObject<T>) !== undefined

// https://www.davedrinks.coffee/how-do-i-use-two-react-refs/
//
export const mergeRefs = <T>(...refs: React.Ref<T>[]) => {
    const filteredRefs = refs.filter(Boolean)
    if (!filteredRefs.length) return null
    if (filteredRefs.length === 1) return filteredRefs[0]

    return (inst: T) => {
        for (const ref of filteredRefs) {
            if (typeof ref === "function") {
                ref(inst)
            } else if (isMutableRefObject<T>(ref)) {
                ref.current = inst
            }
        }
    }
}
