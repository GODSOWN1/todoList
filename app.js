const express = require ("express");
const mongoose = require ("mongoose");
const _ = require ("lodash");

//const date = require (__dirname + "/date.js");


const app = express ();


app.set("view engine", "ejs");
app.use (express.urlencoded({extended: true}));
app.use (express.static ("public"));

mongoose.connect ("mongodb+srv://admin-Kenneth:ASAken12345@cluster0.vtd9t.mongodb.net/test?retryWrites=true&w=majority/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const itemsSchema = new mongoose.Schema ({
    name: String,
});

const TODOL   = new mongoose.model ("item", itemsSchema);

const TODOL1= new TODOL ({
    name : "Welcome to your todoList"
});

const TODOL2= new TODOL ({
    name : "add todos scnkckdmkcm, +"
});

const TODOL3= new TODOL ({
    name : " Delete todos jjfakljadfkfjl -"
});

const defaultItems = [TODOL1, TODOL2, TODOL3];


const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model ("List", listSchema);



app.get("/", function(req, res){

//const day = date.getDate(); //             //we can as well do (let day = date.getDay();)
    TODOL.find ({}, function(err,results){
        if (results.length === 0) {
            TODOL.insertMany (defaultItems, function (err){
                if (err) {
                    console.log (err);
                } else {
                    console.log ("successfully saved the items to the database");
                }
            });

            res.redirect ("/");
        } else {
            res.render ("list", {ListTitle: "Today", newListItems: results });
        }
    });
});


app.post ("/", function (req, res){

const itemName = req.body.newItem;
const listName = req.body.list;

const item = new TODOL ({
    name: itemName
});

if (listName=== "Today") {
    item.save();
    res.redirect("/");
} else {
    List.findOne({name:listName}, function(err, foundlist){
        foundlist.items.push(item);
        foundlist.save();
        res.redirect("/"+ listName);
    });
}
});

app.post ("/delete", function(req, res) {

    const checkedItemId = req.body.checkbox;
    const listName      = req.body.listName;

    if (listName ==="Today") {
        TODOL.findOneAndRemove(checkedItemId , function(err){
            if(!err){
              console.log("Successfully deleted");
              res.redirect("/");
        }  
}); 

} else {
List.findOneAndUpdate ({name: listName}, {$pull: {items:{name:checkedItemId}}}, function(err, foundlist) {
    if (!err) {
        res.redirect ("/" + listName);
    }
});
}  
});

// this is a dynamic route

app.get ("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);


    List.findOne({name:customListName}, function (err, foundlist){
    if(!err){
        if (!foundlist) {
            const list = new List ({
                name: customListName,
                items: defaultItems
            });
        
            list.save();
        res.redirect ("/"+ customListName);
        } else {
            res.render ("list",{ListTitle: foundlist.name, newListItems: foundlist.items })
        }
    }
    });
});


app.get ("/about", function(req, res){
    res.render("about"); 
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen (port, function(){
    console.log ("Server started successfully");
});













/*if (currentDay===6 || currentDay===0) {
        day=   "weekend";
    }
    else {
        day = "Weekday";
    } 
    
    switch (currentDay) {
        case 0:
            day= "Sunday";
            break;
        case 1:
            day= "Monday";
            break;
        case 2:
            day= "Tueday";
            break;
        case 3:
            day= "Wednesday";
            break;
        case 4:
            day= "Thursday";
            break;
        case 5:
            day= "Frday";
            break;
        case 6:
            day= "Saturday";
            break;
        
        default:
            console.log ("Error: Current day is equal to:" + currentDay );
    }
    
    
    
    
    
    for (let i = 0; i < newListItems.length; i++) {}*/


    /*app.post("/work", function (req, res){
  
    });   */





    /* const item = req.body.newItem;
        workitems.push(item);
        res.redirect("/")
    
    if (req.body.list=== "Work") {
        workitems.push(item);
        res.redirect ("/work"); 
    } else {
        items.push(item);
        res.redirect ("/");
    } */
    
    
    
    /*app.get ("/work", function(req, res){
    res.render ("list", {ListTitle: "work list", newListItems: workitems });
});  */


