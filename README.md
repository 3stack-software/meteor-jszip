jszip-worker-inflate
=======================

A customised version of JSZIP to inflate (unzip) files in a web-worker.

Original Github/Repo: https://github.com/Stuk/jszip

Forked Github/Repo: https://github.com/3stack-software/jszip

Usage
-----------------------

```js

  // extracts and returns all files provided to an input, even if they are inside `.zip`'s
  $('#myFileInput).on('change', function(e){
    var file, i, I, allFiles = [];
    for (i=0, I=this.files.length; i < I; i++){
      file = this.files[i];
      if (file.type == 'application/zip'){
        allFiles.push(readContents(file));
      } else {
        allFiles.push(Promise.resolve([file]));
      }
    }
    Promise.all(allFiles).then(function(arrayOfArrayOfFiles){
      return _.flatten(arrayOfArrayOfFiles, true);
    }).then(function(files){
      /* do something! */
    });
  });

  /**
   * @return Promise<Array<File>>
   */
  function readContents(zipFile){
    return new Promise(function(resolve, reject) {
      var reader;
      reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function(e) {
        resolve(e.target.result);
      };
      reader.readAsArrayBuffer(zipFile);
    })
    .then(function(arrayBuffer) {
      return new JSZip(arrayBuffer);
    }).then(function(zip) {
      var file, __, _ref = zip.files, contentsPromises = [];
      for (__ in _ref) {
        file = _ref[__];
        contentsPromises.push(file.asUint8Array().then(contentsToFileObject(file.name, file.type)));
      }
      return Promise.all(contentsPromises);
    });
  }

  function contentsToFileObject(name, type){
      return function(content){
        new Blob([content], name, {type: type});
      }
  }

```

