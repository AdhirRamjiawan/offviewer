import {GfxMaths} from './GfxMaths'

export class Graphics {

    public constructor(public model:any, public currentInterval:number){}

    public put2DPixel(ctx, x, y) {
        ctx.fillRect(x, y, 2, 2);
    }
    
    public drawVertex(ctx, x: number,y: number,z: number,scale: number,offset: number) {
    
        /*x *= scale;
        y *= scale;
        z *= scale;*/
    
        var vert = GfxMaths.project3DVert(x, z, scale, scale, offset, offset);
    
        //console.log(_x + ":" + _y);
        this.put2DPixel(ctx, vert.x, vert.y) ;
        
    
    }

    public startAnimation(rotateSpeed :number) {
        var angle = 0;
    
        //console.log(rotateSpeed);
        
        var canvas = <HTMLCanvasElement> document.getElementById('view');
        var ctx  =  <CanvasRenderingContext2D> canvas.getContext('2d');
    
        var mustRotateXAxis = false;
        var mustRotateYAxis = false;
        var mustRotateZAxis = false;
    
        if (!rotateSpeed)
            rotateSpeed = 0;
    
        if (this.currentInterval)
            clearInterval(this.currentInterval);
    
            this.currentInterval = setInterval(function(){
    
            mustRotateXAxis = (<HTMLInputElement>document.getElementById('cbRotateXAxis')).checked;
            mustRotateYAxis = (<HTMLInputElement>document.getElementById('cbRotateYAxis')).checked;
            mustRotateZAxis = (<HTMLInputElement>document.getElementById('cbRotateZAxis')).checked;
    
            //rotateSpeed = document.getElementById('rangeSpeed').value;
    
            angle++;
    
            var radian = angle * (Math.PI / 180);
            var vert = null;
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            for (var i = 0; i < this.model.vertices.length; i++) {
                vert = this.model.vertices[i];
    
                if (mustRotateXAxis)
                    vert = GfxMaths.rotateXAxis(radian, vert.x, vert.y, vert.z);
    
                if (mustRotateYAxis)
                    vert = GfxMaths.rotateYAxis(radian, vert.x, vert.y, vert.z);
    
                if (mustRotateZAxis)
                    vert = GfxMaths.rotateZAxis(radian, vert.x, vert.y, vert.z);
    
                this.drawVertex(ctx,
                    vert.x,
                    vert.y,
                    vert.z,
                    100,
                    100);
            }
        }, 100 - rotateSpeed);
    }
}