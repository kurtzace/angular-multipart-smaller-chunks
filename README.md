# About
Angular project,
Upload a file, process csv in background task as well as split the file and transmit the same to the server

# angular-multipart-smaller-chunks

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Run `gulp` for building and `gulp serve` for preview.

## Testing

Running `gulp test` will run the unit tests with karma.

## Notes
Used this as the base code http://www.uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs/

Then split the file using this technique
https://stackoverflow.com/questions/12055386/split-file-with-javascript-or-jquery

Background worker is implemented by using https://github.com/mattslocum/ng-webworker 

Process csv using
https://mounirmesselmeni.github.io/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/ 

Condierations:
Could also use BG worker using https://www.html5rocks.com/en/tutorials/file/filesystem-sync/
https://github.com/AlexJangam/angular-webworker