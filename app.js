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
    //res.redirect('/');

    console.log(req.body);
    console.log("dir is " + __dirname)
    switch (myText) {
        //redirects to the label page where a user can enter a custom label to identify a manifest file
        case "label":
            res.redirect('/label');
            break;
        case "list":
            res.redirect('/list');
            break;
        //redirects to the help page, here the user can see a list of supported commands
        case "help":
            res.redirect('/help');
            break;
        //redirects to the create repo page
        case "create":
            res.redirect('/create');
            break;
        case "checkin":
            res.redirect('/checkin');
            break;
         case "checkout":
            res.redirect('/checkout');
            break;
        //if none of the above commands are entered it will redirect the user back to the main page to try again.
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

app.post('/help', (req, res) => {
    console.log("going back to main page");//displays a list of valid commands to the user and then redirects the user back to the main page
    res.redirect('/');
});