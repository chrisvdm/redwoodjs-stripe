export const lastStripeObject = <Obj extends { created: number }>(
  array: Obj[],
): Obj => {
  const latest = array.sort((first, next) => {
    const firstDate = new Date(0);
    firstDate.setUTCSeconds(first.created);
    const nextDate = new Date(0);
    nextDate.setUTCSeconds(next.created);
    return +firstDate - +nextDate;
  });

  return latest[latest.length - 1];
};
