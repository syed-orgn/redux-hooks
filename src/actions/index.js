export const incNumber = (payload) => {
    return {
        type: "incr",
        payload
    }
}
export const decNumber = () => {
    return { type: "decr" }
}
