var express = require('express');
var app = express();  // Init an Express object.
app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) { // Set page-gen fcn for URL root request.
    res.sendFile('')
});

app.get('/get_form_text', function(req, res) {
    var myText = req.query.cmdIn;
    console.log(myText);
    res.redirect('/');
});

app.listen(3000, function () { // Set callback action fcn on network port.
    console.log('App.js listening on port 3000!');
});
