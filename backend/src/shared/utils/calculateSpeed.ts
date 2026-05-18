export const calculateSpeed=(
    distance:number,
    startTime:Date,
    endTime:Date,
):number=>{
    const timeDifferenceInHours=(endTime.getTime()-startTime.getTime())/(1000*60*60);
    if(timeDifferenceInHours<=0)return 0
    return (distance/timeDifferenceInHours)
}