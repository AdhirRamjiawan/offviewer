
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
    readModelFile(function (model) {
        console.log(model);
    });

}