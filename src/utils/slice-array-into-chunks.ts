export const sliceArrayIntoChunks = <T>(arr: T[], chunkSize: number): T[][] => {
    const chunked_arr = [];
    let index = 0;
    while (index < arr.length) {
        chunked_arr.push(arr.slice(index, chunkSize + index));
        index += chunkSize;
    }
    return chunked_arr;
};
