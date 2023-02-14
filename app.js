// jshint esversion:6
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://zephyr007:Sahum6703%40@cluster0.cjacmuw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main() {
    
    try{
        await client.connect();
        await showAll(client);
    } catch(e){
        console.error(e);
    } finally{
        // await client.close();
    }
}

main().catch(console.error);

var results;
async function showAll(client){
    const cursor = await client.db("todolist").collection("items").find();
    
    results = await cursor.toArray();
    
    if(results.length >0){
        // console.log(`Found a listing in the collection with the name'`);
        // console.log(results);
    }
    else{
        console.log(`No listing found with the name `);
    }
}

async function insertIntoList(client, newItem){

    results = await client.db("todolist").collection("items").insertOne(newItem);

    console.log(`${results.insertedCount} New listing created with the following id(s): `);
    console.log(results.insertedIds);
}

async function deleteFromList(client, itemName){

    results = await client.db("todolist").collection("items").deleteOne({name: itemName});

    console.log(`${results.deletedCount} item was deleted with the following id(s): `);
    console.log(itemName);
}


const express = require("express");
const { Collection } = require('mongoose');

// accessing the user-made module
const date = require(__dirname + "/date.js");

const app = express();

// to parse the http from the ejs file 
app.use(express.urlencoded({extended:true}));

// to serve the static files such as images
app.use(express.static("public"));

// this tells the app to use ejs as view engine
app.set("view engine", "ejs");

// since item would be a variable 
// so we will have to keep an array so the new items get added
let items = ["Buy Food", "Cook Food", "Eat Food"];
let works = [];

app.get("/",async function(req,res){
    const day = date.getDate();
    // to pass the parameter to the ejs file

    
    await showAll(client);
    res.render("list", {listTitle:day, newListItems:results});
});

app.get("/:customListName", function(req,res){
    const customListName = req.params.customListName;
});

app.post("/",async function(req,res){
    let item = req.body.newItem;
    
    if(req.body.list === "Work"){
        works.push(item);
        res.redirect("/work");
    }else{
        // items.push(item);
        
        await insertIntoList(client,{   
            name: item
        });
        
        res.redirect("/");
    }
    // now we will redirect to app.get(), that is we will redirect to home route
    // so after we redirect from there the value will be passed
});

app.post("/delete",async function(req,res){
    const itemName = req.body.checkbox;
    console.log(itemName);

    await deleteFromList(client,itemName);
    
    res.redirect("/");
})

app.get("/work",function(req,res){
    let title = "Work List";

    res.render("list",{listTitle: title, newListItems: works})
});

app.get("/about",function(req,res){
    res.render("about")
});

app.listen(3000,function(){
    console.log("Server started on port 3000")
});