
export const generateArray = (numStart:number, numEnd:number) => {
    let arr: number[] = [];
    for(let i = numStart; i <= numEnd; i++) {
        arr[i] = i;
    }
    return arr
}