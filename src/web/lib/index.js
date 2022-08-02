export const logger = msg => {
    console.log('%c STRIPE: ','color: blue', msg)
}

export const isEmptyObj = obj => {
return obj // 👈 null and undefined check
&& Object.keys(obj).length === 0
&& Object.getPrototypeOf(obj) === Object.prototype
}