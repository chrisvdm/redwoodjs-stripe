export const isEmptyString = (value: unknown) => {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
}