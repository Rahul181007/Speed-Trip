const toRadians=(
    degree:number
):number=>{
    return degree*(Math.PI/180)
}

export const calculateDistance=(
    lat1:number,
    lon1:number,
    lat2:number,
    lon2:number,
):number=>{
    const earthRadius=6371;

    const latitudeDifference=toRadians(lat2-lat1);
    const longitudeDifference=toRadians(lon2-lon1);

    const a=Math.sin(latitudeDifference/2)**2+Math.cos(toRadians(lat1))*Math.cos(toRadians(lat2))*Math.sin(longitudeDifference/2)**2
    const c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return earthRadius*c
}