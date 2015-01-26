Package.describe({
  name: '3stack:jszip-worker-inflate',
  version: '0.0.1',
  summary: 'A customised version of JSZIP to inflate (unzip) files in a web-worker',
  git: 'https://github.com/3stack-software/meteor-jszip-worker-inflate',
  documentation: 'README.md'
});


Package.onUse(function(api){
  api.export('JSZip', 'client');
  api.addFiles([
    'jszip.js',
    'jszip.decl.js'
  ], 'client');
  api.addFiles([
    'jszip.worker.min.js'
  ], 'client', {isAsset: true});
});
