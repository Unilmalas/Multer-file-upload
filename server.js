// https://codeforgeek.com/2014/11/file-uploads-using-node-js/
var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads'); // Select the file and check the uploads folder. Your file must be present there!
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
/* We have made custom middle-ware function to choose the storage engine which is Disk
because we want files to store in disk and appending the file name with current date just
to keep the uniqueness of files. */

/* note the limits you can set:
limits: {
  fieldNameSize: 100,
  files: 2,
  fields: 5
} */

var upload = multer({ storage : storage},{limits : {fieldNameSize : 10}}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
			// After completing upload , req.files variable holds following array of information:
			/* { 
				  userPhoto:
				  { 
					 fieldname: 'userPhoto',
					 originalname: 'banner.png',
					 name: 'banner1415699779303.png',
					 encoding: '7bit',
					 mimetype: 'image/png',
					 path: 'uploads&#92;banner1415699779303.png', // putting file to /uploads
					 extension: 'png',
					 size: 11800,
					 truncated: false,
					 buffer: null 
				 } 
				} */
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});