export const isString = (str): boolean => {
    const type = typeof str;
    return type === 'string' || (type === 'object' && str != null && !Array.isArray(str));
};
