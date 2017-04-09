var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

module.exports = {
    uploadFile
}

function uploadFile(req, res) {
    var fileName;
    
    //create an incoming form object
    var form = new formidable.IncomingForm();

    //specify that we want to allow the user to upload multiple files in a single request
    //form.multiples = true;
  
    //store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../public/files/'+req.params.userAccountID);
    
    if (!fs.existsSync(form.uploadDir)){
        fs.mkdirSync(form.uploadDir);
    }
  
    //every time a file has been uploaded successfully,
    //rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        
        fileName = file.name;
    });
  
    //log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });
  
    //once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.status(200).json({
            src: '/files/'+req.params.userAccountID+'/'+fileName
        });
    });
  
    // parse the incoming request containing the form data
    form.parse(req);
}