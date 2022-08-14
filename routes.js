const express = require('express');
const router = express.Router();
const csv=require('csv-parse');
const fs = require('fs');
//var Parse = require('parse').Parse;
const { parse } = require('csv-parse')

let country;
let country1;
let book = [];
let mag = [];


// API to read Authors
router.get('/', (req, res) => {
    var inputFile1 = 'author.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            country = {
                "email": line[0]
                , "firstname": line[1]
                , "lastname": line[2]


            };

            book.push(country);

        },{new:true});

        res.send(book);
    });
   fs.createReadStream(inputFile1).pipe(parser);
   /* let emptyFile = true;

    readStream.once('data', chunk => {
      emptyFile = false;
    });
    
    readStream.on('end', () => {
      console.log('Stream ended');
      if (emptyFile) {
        console.log('Empty file');
      };
})*/
   

});//,{new:true});

// API to read Books
router.get('/readbooks', (req, res) => {
    var inputFile2 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };

            book.push(country);

        },{new:true});

        res.send(book);
    });
    let readStream =fs.createReadStream(inputFile2).pipe(parser);
    let emptyFile = true;

    readStream.once('data', chunk => {
      emptyFile = false;
    });
    
    readStream.on('end', () => {
      console.log('Stream ended');
      if (emptyFile) {
        console.log('Empty file');
      };
})
});

// API to read Magazines
router.get('/readmagazine', (req, res) => {
    var inputFile3 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
data.shift();
        data.forEach(function (line) {
          

            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "publishedAt": line[3]

            };

            book.push(country);

        },{new:true});

        res.send(book);
    });
    fs.createReadStream(inputFile3).pipe(parser);
    /*let emptyFile = true;

    readStream.once('data', chunk => {
      emptyFile = false;
    });
    
    readStream.on('end', () => {
      console.log('Stream ended');
      if (emptyFile) {
        console.log('Empty file');
      };
})*/
})

//API to find out a magazine by its ISBN

router.get('/magazine:isbn', (req, res) => {
    var inputFile4 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "publishedAt": line[3]

            };
            console.log(country.isbn);
            if (req.params.isbn.includes(country.isbn)) {

                book.push(country);
            }

        });

        res.send(book);
    });
    fs.createReadStream(inputFile4).pipe(parser);

})

//API to find out a book by its ISBN

router.get('/books:isbn', (req, res) => {
    var inputFile5 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };

            if (req.params.isbn.includes(country.isbn)) {

                book.push(country);
            }

        });

        res.send(book);
    });
    fs.createReadStream(inputFile5).pipe(parser);

})

// API to find all magazines by their authors’ email.

router.get('/emailmagazines:emailofauthor', (req, res) => {
    var inputFile6 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "publishedAt": line[3]

            };

            if (req.params.emailofauthor.includes(country.authors)) {

                book.push(country);
            }


        });

        res.send(book);
    });
    fs.createReadStream(inputFile6).pipe(parser);

})


// API to find all books by their authors’ email.

router.get('/emailbooks:emailofauthor', (req, res) => {
    var inputFile7 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };


            if (req.params.emailofauthor.includes(country.authors)) {

                book.push(country);
            }


        });

        res.send(book);
    });
    fs.createReadStream(inputFile7).pipe(parser);

})

// Sorting API :
router.get('/sort', (req, res) => {
    var inputFile8 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        console.log(data);
        data.shift();
        data.forEach(function (line) {



            country = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };

            book.push(country);

        });
    });
    fs.createReadStream(inputFile8).pipe(parser);

    var inputFile9 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data1) {
data1.shift();
        data1.forEach(function (line1) {
          

            country1 = {
                "title": line1[0]
                , "isbn": line1[1]
                , "authors": line1[2]
                , "publishedAt": line1[3]

            };

            mag.push(country1);

        });
       // console.log(mag);
        let merge=book.concat(mag);
       // console.log("merged",merge);
       let mergedsort=merge.sort(function(a, b){
         return a.title === b.title ? 1 : a.title < b.title ? -1 : 1;
       })

     //   console.log("Sorted :",mergedsort);

        res.send(mergedsort);
    });
    fs.createReadStream(inputFile9).pipe(parser);
})

module.exports=router;


