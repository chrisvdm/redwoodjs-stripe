export const nonNilAssertionError = (context: string, data: unknown) =>
  new Error(`\
Unexpectedly received null or undefined data. This may be a bug in redwoodjs-stripe.

Please file an issue for it over here, and provide with the details given below: https://github.com/chrisvdm/redwoodjs-stripe/issues/new",

**Context:**
${context}

**Data:**
${attemptStringify(data)}
`);

const attemptStringify = (value: unknown): string => {
  try {
    return JSON.stringify(value)
  } catch {
    return 'UNSERIALIZABLE'
  }
}