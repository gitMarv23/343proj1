CECS 343 Section 06

Project Name:
    WTHAWD-MJALS

Team Name: 
    MJALS

Members: 
    Marvin Barajas
    Jessica Banuelos
    Aster Lee
    Leon Chen
    Sebastian Valencia

Info:
    Javascript + HTML project utilizing node and javascript dependencies. Loads HTML interactive webpage and access Project Snapshots.

External Requirements:
    Exectue the following instructions provided by Professor Siska:

    // Notes on Node.JS
    Time-stamp: <2019-09-09 12:48:53 Chuck Siska>
    ------------------------------------------------------------

    Intro

    Write a tiny web server with Node.JS and "server-side" javascript.

    Up & Running

    1. Install Node.js; from nodejs.org; download it.
    [node-v10.15.1-x64.msi]

    2. Open a CLI and create (mkdir) your tiny app folder and switch (cd) to it:

        mkdir myapp
        cd myapp

    3. Setup your app project to use Node via Node's package manager (npm).
    (Note, you are still in your "myapp" folder.)  This command will
    prompt you for stuff.  Just type the ENTER key except for the choice
    "entry point: (index.js)", which instead of just ENTER, you will
    change to (say) "app.js" -- and remember this "entry point" for use below.

        npm init
    
    See a new "package.json" file appear in your "myapp" folder.

    4. Install Express.js, a small "web app framework", via npm.  (Still in
    your "myapp" folder.)

        npm install express --save

    Npm "knows" where Express.js is on the web.  You'll get a
    "node_modules" folder in "myapp".  The "--save" command line option
    updates your "package.json" file with a dependency link to "express.js".

    5. Create a file named "app.js" (your "entry point", as entered above)
    containing the following:

        // File: app.js
        var express = require('express'); // Load the Express builder fcn.
        var app = express();  // Init an Express object.
        app.get('/', function (req, res) { // Set page-gen fcn for URL root request.
            res.send('Hello World!'); // Send webpage containing "Hello World!".
        });
        app.listen(3000, function () { // Set callback action fcn on network port.
            console.log('app.js listening on port 3000!');
        });

    6. Run the app "website" on your machine.  Type the command:

        node app.js

    See "App.js listening on port 3000!" in your CLI.

    7. In your browser, go to the website at: http://localhost:3000/
    You should see your "Hello World!" webpage.
    Now, change your webpage html to do what you want, and reload the
    page.
    Escape your CLI via the std keystroke (eg, control-C. maybe).

    From our main webpage you can type help in the "get form text" prompt to view a list of commnads

Bugs as of 2/20/2021 compilation:
    Redirection of source and target paths
