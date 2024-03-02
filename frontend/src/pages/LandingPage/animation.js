
export const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.6,
            staggerChildren: 0.4,
        },

    },
};

export const item = {
    hidden: {y: "120%"},
    show: {y: "0%", transition: {duration: 0.4}},
}