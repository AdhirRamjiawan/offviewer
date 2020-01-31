import { Graphics } from './Graphics';
import { GfxMaths } from './GfxMaths';

let model:any;
let currentInterval :any;
let selectedFile:  File;
let graphics: Graphics = new Graphics(model, currentInterval);

class Face {
    public constructor (public numberOfVertices :number, public vertices:Array<number>){}
}

function setModelFile(event:any) {
    selectedFile = event.target.files[0];
}

function readModelFile(callback) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        var reader = new FileReader();

        reader.readAsText(selectedFile);

        // THIS LOGIC DOES NOT HANDLE COMMENTS IN .OFF FILES.
        // NEED TO REFACTOR THIS TO HANDLE COMMENTS
        reader.onload = function(e) {
            var text = <String>reader.result;
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

            for (let i:number=headerCount; i < verticeEndIndex;i++) {
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
                var _faceObj:Face = new Face(0, []);

                _faceObj.numberOfVertices = parseInt(face[0]);
                _faceObj.vertices = [];

                for (var j = 0; j < _faceObj.numberOfVertices; j++) {
                    _faceObj.vertices.push(parseInt(face[j]));
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
    readModelFile(function (_model) {
        model = _model;
        graphics.startAnimation(0);
        
    });
}