// jshint esversion:6

const { MongoClient, ServerApiVersion } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://zephyr007:Sahum6703%40@cluster0.cjacmuw.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    try{
        await client.connect();
        // await createMultipleListings(client,[
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Paris",
        //         bedrooms: 1,
        //         bathrooms: 1
        //     },
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Paris",
        //         bedrooms: 1,
        //         bathrooms: 1
        //     },
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Paris",
        //         bedrooms: 1,
        //         bathrooms: 1
        //     }
        // ]);

        // await findManyListingByName(client,"Lovely Loft");

        await updateListingByName(client,"Lovely Loft", {bedroom:9});
    } catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}

main().catch(console.error);

// listing the databases
async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`-${db.name}`);
    })
}

// 1. CREATE
async function createMultipleListings(client, newListings){

    const results = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${results.insertedCount} New listing created with the following id(s): `);
    console.log(results.insertedIds);
}

// 2. READ
// for one document
async function findOneListingByName(client, listingName){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name:listingName});

    if(result){
        console.log(`Found a listing in the collection with the name '${listingName}'`);
        console.log(result);
    }
    else{
        console.log(`No listing found with the name '${listingName}'`);
    }
}

// for multiple documents
async function findManyListingByName(client, listingName){
    const cursor = await client.db("sample_airbnb").collection("listingsAndReviews").find({name:listingName});
    
    const results = await cursor.toArray()
    
    if(results.length >0){
        console.log(`Found a listing in the collection with the name '${listingName}'`);
        console.log(result);
    }
    else{
        console.log(`No listing found with the name '${listingName}'`);
    }
}

// 3. UPDATE
async function updateListingByName(client, listingName, updateListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").UpdateOne({name:listingName}, {$set: updateListing});

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents were updated`);

}
