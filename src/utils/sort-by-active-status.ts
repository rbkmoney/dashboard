export const sortByActiveStatus = (a, b) => {
    if (a.active < b.active) {
        return 1;
    }
    if (a.active > b.active) {
        return -1;
    }
    return 0;
};
