const plugin = require("tailwindcss/plugin")

module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                brown: "#795548",
                "brown-50": "#efebe9",
                "brown-100": "#d7ccc8",
                "brown-200": "#bcaaa4",
                "brown-300": "#a1887f",
                "brown-400": "#8d6e63",
                "brown-500": "#795548",
                "brown-600": "#6d4c41",
                "brown-700": "#5d4037",
                "brown-800": "#4e342e",
                "brown-900": "#3e2723",
            },
            borderRadius: {
                check: "0px 6px 6px 0px",
            },
            boxShadow: {
                top: "inset 0 5px 0 0 rgba(256, 256, 256, 0.8)",
                bottom: "inset 0 -5px 0 0 rgba(256, 256, 256, 0.8)",
                datePicker: "10px 10px 40px rgba(0,0,0,0.2)",
                dropdown: "0 .125rem .25rem rgba(0,0,0,.075)",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["label-checked"], // you need add new variant to a property you want to extend
            backgroundColor: ["label-checked-hover"],
        },
    },
    plugins: [
        plugin(({ addVariant, e }) => {
            addVariant("label-checked", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    const eClassName = e(
                        `label-checked${separator}${className}`
                    ) // escape class
                    const yourSelector = 'input[type="checkbox"]' // your input selector. Could be any
                    return `${yourSelector}:checked ~ .${eClassName}` // ~ - CSS selector for siblings
                })
            })

            addVariant(
                "label-checked-hover",
                ({ modifySelectors, separator }) => {
                    modifySelectors(({ className }) => {
                        const eClassName = e(
                            `label-checked-hover${separator}${className}`
                        ) // escape class
                        const yourSelector = 'input[type="checkbox"]' // your input selector. Could be any
                        return `${yourSelector}:hover ~ .${eClassName}` // ~ - CSS selector for siblings
                    })
                }
            )
        }),
    ],
}
