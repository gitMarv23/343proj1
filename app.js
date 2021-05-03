var express = require('express');
var app = express();  // Init an Express object.

//view engine setup
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) { // Set page-gen fcn for URL root request.
    res.sendFile('js-1.html', {root : __dirname});
});

app.get('/get_form_text', function(req, res) {
    var myText = req.query.cmdIn;
    console.log(myText);
    console.log(getTextCheckSum(myText));
    console.log(req.body);
    console.log("dir is " + __dirname)
    
    //options for navigation and functionality
    switch (myText) {
        case "label":
            res.redirect('/label');
            break;
        case "list":
            res.redirect('/list');
            break;
        case "help":
            res.redirect('/help');
            break;
        case "create":
            res.redirect('/create');
            break;
        case "checkin":
            res.redirect('/checkin');
            break;
         case "checkout":
            res.redirect('/checkout');
            break;
        default:
            console.log("no command exists with the name " + myText);
            res.redirect('/');
}});

app.listen(4000, function () { // Set callback action fcn on network port.
    console.log('App.js listening on port 4000!');
});

//allows the user to access help list of commands
app.get('/help', function (req, res) {
    console.log("help page access");
    res.render('help');
});

//user returns to main screen after clicking home button
app.post('/help', (req, res) => {
    console.log("going back to main page");
    res.redirect('/');
});

// sourceDir is the snapshot directory
// destDir is where the manifest file is created
function makeManifestFile(sourceDir, destDir, commandLineused, manifestNumber){
    const fs = require("fs");

    var fileNameAndPath = destDir + `/.man-${manifestNumber}-.rc`
    fs.writeFile(fileNameAndPath, commandLineused + "\n" + new Date().toISOString() + "\n", function(err){
        if(err) throw err;
        console.log(`Created file at ${destDir} for snapshot ${sourceDir}`);
    });

    fs.readdir(sourceDir, (err, files) => {
        files.forEach(file => {
            fs.appendFile(fileNameAndPath, file + "\n", function(err){
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
    myIntHex = myIntHex.toString();console.log("help page access");
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

//create manifest file
app.get('/create', (req, res) => {
    console.log("creating new repository");
    makeManifestFile('repos', 'repos', "create")
    res.redirect("/");
});

//list manifest names and labels
app.get('/list', function (req, res) {
    console.log("going to repos list");
    res.render('list');
});

//user returns to main screen after clicking home button
app.post('/list', (req, res) => {
    console.log("going back to main page");
    res.redirect("/");
});
