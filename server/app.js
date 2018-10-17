const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//cross-origin requests
app.use(cors());

//connect to db
mongoose.connect('mongodb://localhost/medDB');
mongoose.connection.once('open', function(){
    console.log('Connected to database');
}).on('error',function(error){
    console.log(error);
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, ()=> {
    var date = new Date();
    console.log("time stamp: "+date.getTime());
    console.log('now listening for request on port 4000');
});