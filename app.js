var express = require('express');
var app = express();  // Init an Express object.
app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) { // Set page-gen fcn for URL root request.
    res.sendFile('js-1.html', {root : __dirname});
});

app.get('/get_form_text', function(req, res) {
    var myText = req.query.cmdIn;
    console.log(myText);

    console.log(getTextCheckSum(myText));
    res.redirect('/');
});


app.listen(3000, function () { // Set callback action fcn on network port.
    console.log('App.js listening on port 3000!');
});

// sourceDir is the snapshot directory
// destDir is where the manifest file is created
function makeManifestFile(sourceDir, destDir){
    const fs = require("fs");

    var fileNameAndPath = destDir + "manifest.txt"
    fs.writeFile(fileNameAndPath, "", function(err){
        if(err) throw err;
        console.log(`Created file at ${destDir} for snapshot ${sourceDir}`);
    });

    fs.readdir(sourceDir, (err, files) => {
        files.forEach(file => {
            fs.appendFile(fileNameAndPath, file, function(err){
                if(err) throw err;
            })
        });
    });
}

function getFilePathCheckSum(filepath){
    var fileTextSum = getTextCheckSum(filepath);
    return fileTextSum.slice(-2, fileTextSum.length);
}

function intToHex(myInt){
    var myIntHex = myInt.toString(16)
    myIntHex = myIntHex.toString();
    while(myIntHex.length < 4) myIntHex = "0" + myIntHex; // pads with leading zeroes

    return myIntHex;
}

function getTextCheckSum(text){
    var i, checkSum = 0, multiples = [3, 7, 11, 7]
    for(i = 0; i < text.length; i++){
        checkSum += text[i].charCodeAt(0) * multiples[i % multiples.length];
    }

    var hexCheckSum = checkSum.toString(16)

    if (checkSum.toString(16).length > 4){
        hexCheckSum = checkSum.toString(16).slice(-4, hexCheckSum.length);
    }else{
        while(hexCheckSum.length < 4) hexCheckSum = "0" + hexCheckSum; // pads with leading zeroes
    }

    return hexCheckSum;
}