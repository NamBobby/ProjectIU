
export const processDob = (day:string, month:string, year:string):string => {
    let dateOfBirth: string = `${year}-${month}-${day}`
    return dateOfBirth;
}