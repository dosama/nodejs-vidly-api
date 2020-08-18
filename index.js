const express =  require('express');
const _ = require('lodash');
const Joi = require('joi');

const app = express();
app.use(express.json());

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));

const genres = [{id:1,name:'Action'},
{id:2,name:'Comedy'},
{id:3,name:'Drama'},
{id:4,name:'Fantasy'},
{id:5,name:'Horror'},
{id:6,name:'Mystery'},
{id:7,name:'Romance'},
{id:8,name:'Thriller'}];

// Getting all the genres
app.get('/api/genres', (req, res) => {
    // Return the genres 
    res.send(genres);
   });

   // Getting a single genre
app.get('/api/genres/:id', (req, res) => {
    const genreId = req.params.id;
   
    // Lookup the genre
    const genre = _.find(genres,(item)=>item.id == genreId );
    // If not found, return 404
    if(!genre) {
        res.status(404).send('genre not found.');
        return;
    }
    
    // Else, return the genre object
    res.send(genre);
   });

   // Creating a genre
app.post('/api/genres', (req, res) => {
    const schema =Joi.string().min(3).required();
    const genreName = req.body.name;
    const result = schema.validate(genreName);

   if(result.error){
      
       res.status(400).send(result.error.details[0].message);
       return;
   }
    // Lookup the genre
    let genre = _.find(genres,(item)=>item.name == genreName );

    if(genre) {
        res.status(400).send('genre already exist.');
        return;
    }
    else{
       
        const genre = {id:genres.length+1,name:genreName};
        genres.push(genre);
    }
    res.send(genres);
   });

   // Updating a genre
app.put('/api/genres/:id', (req, res) => {
   const schema =Joi.string().min(3).required();
   const genreName = req.body.name;
   const result = schema.validate(genreName);

   if(result.error){
       res.status(400).send(result.error.details[0].message);
       return;
   }
    const genreId = req.params.id;
   
    // Lookup the genre
    let genre = _.find(genres,(item)=>item.id == genreId );
    // If not found, return 404
    if(!genre) {
        res.status(404).send('genre not found.');
        return;
    }
    genre.name=genreName;
    // Else, return the genre object
    res.send(genres);
   });

   // Deleting a genre
   app.delete('/api/genres/:id', (req, res) => {
    const genreId = req.params.id;
   
    // Lookup the genre
    let genre = _.find(genres,(item)=>item.id == genreId );
    // If not found, return 404
    if(!genre) {
        res.status(404).send('genre not found.');
        return;
    }
    _.remove(genres,(item)=>item.id == genreId);
    // Else, return the genre object
    res.send(genres);
   });