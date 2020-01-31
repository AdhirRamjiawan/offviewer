export class GfxMaths {

    public static project3DVert(x:number, z:number, scalex:number, scalez:number, offsetx:number, offsetz:number) {
    
        return {
            x: (scalex * x) +  offsetx,
            y: (scalez * z) +  offsetz
        }
    }
    
    /*
    
    
    For rotation around the z-axis:
    x' = x cos za - y sin za;
    y' = x sin za + y cos za;
    
    For rotation around the x-axis:
    
    y' = y cos xa - z sin xa;
    z' = y sin xa + z cos xa;
    
    For rotation around the y-axis:
    
    x' = x cos ya + z sin ya;
    z' = - x sin ya + z cos ya;
    
    */
    
    public static rotateXAxis(radian, x,y,z) {
        return {
            x: x,
            y: (y*Math.cos(radian)) - (z * Math.sin(radian)),
            z: (y * Math.sin(radian)) + (z *Math.cos(radian))
        };
    }
    
    public static rotateYAxis(radian, x,y,z) {
        return {
            x: (z * Math.sin(radian)) + (x * Math.cos(radian)),
            y: y,
            z: (z * Math.cos(radian)) - (x * Math.sin(radian))
        };
    }
    
    public static rotateZAxis(radian, x,y,z) {
        return {
            x: (x * Math.cos(radian)) - (y * Math.sin(radian)),
            y: (x * Math.sin(radian)) + (y * Math.cos(radian)),
            z: z
        };
    }
    
    public static flattenXCoord(x,y,z, radian) {
        return (x * Math.cos(radian)) - (y * Math.sin(radian));
    }
    
    public static flattenYCoord(x,y,z, radian) {
        return (x * Math.sin(radian)) + (y * Math.cos(radian));
    }
}