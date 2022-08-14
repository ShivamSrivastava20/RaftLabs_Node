const express = require('express');
const app = express();
//const csv=require('csv-parse');
const fs = require('fs');
//var Parse = require('parse').Parse;
const { parse } = require('csv-parse')
const createcsvwriter=require('csv-writer').createObjectCsvWriter;

let readmag;
let readauth;
let readbook;
let book = [];
let mag = [];
let auth=[];
let merge;
var file=[];
//let file2=[];
let mergedsort;


// API to read Authors
app.get('/readauthor', (req, res) => {
    var inputFile1 = 'author.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readauth = {
                "email": line[0]
                , "firstname": line[1]
                , "lastname": line[2]


            };

            auth.push(readauth);
            

        },{new:true});

        res.send(auth);
        auth=[];
    });
   fs.createReadStream(inputFile1).pipe(parser);
});
// API to read Books
app.get('/readbooks', (req, res) => {
    var inputFile2 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readbook = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };

            book.push(readbook);

        },{new:true});

        res.send(book);
        book=[];
        
    });
    fs.createReadStream(inputFile2).pipe(parser);

});

// API to read Magazines
app.get('/readmagazines', (req, res) => {
    var inputFile3 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
data.shift();
        data.forEach(function (line) {
          

           readmag = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "publishedAt": line[3]

            };

            mag.push(readmag);

        },{new:true});

        res.send(mag);
        mag=[];
    });
    fs.createReadStream(inputFile3).pipe(parser);
})

//API to find out a magazine by its ISBN

app.get('/mag/:isbn', (req, res) => {
    var inputFile4 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readmag = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "publishedAt": line[3]

            };
            console.log(readmag.isbn);
            if (req.params.isbn.includes(readmag.isbn)) {

                mag.push(readmag);
            }

        });

        res.send(mag);
        mag=[];
    });
    fs.createReadStream(inputFile4).pipe(parser);

})

//API to find out a book by its ISBN

app.get('/book/:isbn', (req, res) => {
    var inputFile5 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readbook = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };

            if (req.params.isbn.includes(readbook.isbn)) {

                book.push(readbook);
            }

        });

        res.send(book);
        book=[];
    });
    fs.createReadStream(inputFile5).pipe(parser);

})

// API to find all magazines by their authors’ email.

app.get('/magazine/:emailofauthor', (req, res) => {
    var inputFile6 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readmag = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "publishedAt": line[3]

            };

            if (req.params.emailofauthor.includes(readmag.authors)) {

                mag.push(readmag);
            }


        });

        res.send(mag);
        mag=[];
    });
    fs.createReadStream(inputFile6).pipe(parser);

})


// API to find all books by their authors’ email.

app.get('/bookie/:emailofauthor', (req, res) => {
    var inputFile7 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readbook = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };


            if (req.params.emailofauthor.includes(readbook.authors)) {

                book.push(readbook);
            }


        });

        res.send(book);
        book=[];
    });
    fs.createReadStream(inputFile7).pipe(parser);

})

// Sorting API :
app.get('/sort', (req, res) => {
    var inputFile8 = 'books.csv';
    var parser = parse({ delimiter: ';' }, function (err, data) {
        data.shift();
        data.forEach(function (line) {



            readbook = {
                "title": line[0]
                , "isbn": line[1]
                , "authors": line[2]
                , "description": line[3]

            };

            book.push(readbook);

        });
    });
    fs.createReadStream(inputFile8).pipe(parser);

    var inputFile9 = 'magazines.csv';
    var parser = parse({ delimiter: ';' }, function (err, data1) {
data1.shift();
        data1.forEach(function (line1) {
          

            readmag = {
                "title": line1[0]
                , "isbn": line1[1]
                , "authors": line1[2]
                , "publishedAt": line1[3]

            };

            mag.push(readmag);
            

        }); 
        
        let merge=book.concat(mag);
        
       console.log("merge:" , merge);
       let mergedsort=merge.sort(function(a, b){
         return a.title === b.title ? 1 : a.title < b.title ? -1 : 1;
        });
        res.send(mergedsort);
        mergedsort=[];
        book=[];
        mag=[];
    });
    fs.createReadStream(inputFile9).pipe(parser);
})

// Writedata in New CSV file :
app.get('/newfile' , (req,res)=>{
var inputFile8 = 'books.csv';
var parser = parse({ delimiter: ';' }, function (err, data) {
    data.shift();
    data.forEach(function (line) {



        readbook = {
            "title": line[0]
            , "isbn": line[1]
            , "authors": line[2]
            , "description": line[3]

        };

        book.push(readbook);

    });
});
fs.createReadStream(inputFile8).pipe(parser);

var inputFile9 = 'magazines.csv';
var parser = parse({ delimiter: ';' }, function (err, data1) {
data1.shift();
    data1.forEach(function (line1) {
      

        readmag = {
            "title": line1[0]
            , "isbn": line1[1]
            , "authors": line1[2]
            , "publishedAt": line1[3]

        };

        mag.push(readmag);
        

    }); 
    
    let merge=book.concat(mag);
const csvWriter=createcsvwriter(
    {
        path : 'file.csv',
        header : [
            {  id: 'title' , title:'TITLE' },
              {  id: 'isbn', title:'ISBN'},
               { id: 'authors', title:'AUTHORS'},
               { id: 'description', title:'DESCRIPTION'},
               { id: 'publishedAt', title:'PUBLISHED_AT'}
            
        ]
    }
)
csvWriter.writeRecords(merge).then(()=>
{
    merge = [];
    console.log("Done!!");
})});
res.send("NEW CSV FILE IS CREATED !! PLEASE CHECK !! THANK YOU ");
fs.createReadStream(inputFile9).pipe(parser);
})



app.listen(8080, () => {
    console.log("Connected to Server!!");
})