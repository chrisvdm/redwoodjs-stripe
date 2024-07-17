export const logger = (msg: string) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("%c STRIPE: ", "color: blue", msg);
  }
};
