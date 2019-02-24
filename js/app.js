

function put2DPixel(ctx, x, y) {
    ctx.fillRect(x, y, 2, 2);
}

function drawVertex(ctx, x,y,z,scale,offset) {

    /*x *= scale;
    y *= scale;
    z *= scale;*/

    var vert = project3DVert(x, z, scale, scale, offset, offset);

    //console.log(_x + ":" + _y);
    put2DPixel(ctx, vert.x, vert.y) ;
    

}


function project3DVert(x,z, scalex, scalez, offsetx, offsetz) {
    
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

function rotateXAxis(radian, x,y,z) {
    return {
        x: x,
        y: (y*Math.cos(radian)) - (z * Math.sin(radian)),
        z: (y * Math.sin(radian)) + (z *Math.cos(radian))
    };
}

function rotateYAxis(radian, x,y,z) {
    return {
        x: (z * Math.sin(radian)) + (x * Math.cos(radian)),
        y: y,
        z: (z * Math.cos(radian)) - (x * Math.sin(radian))
    };
}

function rotateZAxis(radian, x,y,z) {
    return {
        x: (x * Math.cos(radian)) - (y * Math.sin(radian)),
        y: (x * Math.sin(radian)) + (y * Math.cos(radian)),
        z: z
    };
}

function flattenXCoord(x,y,z, radian) {
    return (x * Math.cos(radian)) - (y * Math.sin(radian));
}

function flattenYCoord(x,y,z, radian) {
    return (x * Math.sin(radian)) + (y * Math.cos(radian));
}

function readModelFile(callback) {
    const selectedFile = document.getElementById('fileModel').files[0];

    
      
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        
        var reader = new FileReader();

        reader.readAsText(selectedFile);

        reader.onload = function(e) {
            var text = reader.result;
            var _vertices = [];
            var _faces = [];
            var _verticeCount, _faceCount, _edgeCount;

            //console.log(text);

            var rows =  text.split('\n');
            var headerCount = 2;

            var counts = rows[headerCount - 1].split(' ');

            _verticeCount = parseInt(counts[0]);
            _faceCount = parseInt(counts[1]);
            _edgeCount = parseInt(counts[2]);

            var verticeEndIndex =  _verticeCount + headerCount;
            console.log(verticeEndIndex);

            for (var i=headerCount; i < verticeEndIndex;i++) {
              //  console.log('vertices : ' + i);
                var vertice = rows[i].split(' ');

                _vertices.push({
                    x: vertice[0],
                    y: vertice[1],
                    z: vertice[2] 
                });
            }

            for (var i=_verticeCount + headerCount; i < rows.length;i++) {
                var face = rows[i].split(' ');
                var _faceObj = {};

                _faceObj.numberOfVertices = face[0];
                _faceObj.vertices = [];

                for (var j = 0; j < _faceObj.numberOfVertices; j++) {
                    _faceObj.vertices.push(face[j]);
                }

                _faces.push(_faceObj);
            }

            callback({
                numbers: {
                    verticeCount: _verticeCount,
                    faceCount: _faceCount,
                    edgeCount: _edgeCount
                },
                vertices: _vertices,
                faces: _faces
            });
          }
    
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}

function viewModel() {
    
    var angle = 0;
    
    var canvas = document.getElementById('view');
    var ctx = canvas.getContext('2d');

    readModelFile(function (model) {
        //console.log(model);
        setInterval(function(){
            angle++;

            

            var radian = angle * (Math.PI / 180);
            var vert = null;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < model.vertices.length; i++) {
                vert = model.vertices[i];

                vert = rotateXAxis(radian, vert.x, vert.y, vert.z);
                vert = rotateYAxis(radian, vert.x, vert.y, vert.z);
               // vert = rotateZAxis(radian, vert.x, vert.y, vert.z);

                drawVertex(ctx,
                    vert.x,
                    vert.y,
                    vert.z,
                    100,
                    100);
            }
        }, 1);
        
    });

}