const express = require ("express");


const app= express ();

let items = [];
let workitems = [];


app.set("view engine", "ejs");
app.use (express.urlencoded({extended: true}));
app.use (express.static ("public"));



app.get("/", function(req, res){
    

    let today = new Date ();
    let currentDay =today.getDay();
    

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-us", options);
    res.render ("list", {listTitle: day, newlyAdded: toDos });
        
});
app.post ("/", function (req, res){
    let toDo = req.body.requirement ;
    
    toDos.push(toDo);
    res.redirect("/");

});


app.get ("/work", function(req, res){
    res.render ("list", {listTitle: "worklist", newListItems: workitems });
});

app.post("/work", function (req, res){
    let item = req.body.newItem;
   

if (req.body.list=== "work") {
    workitems.push(item);
    res.redirect ("/work"); 
} else {
    items.push(item);
    res.redirect ("/");
}

});

app.listen (3000, function(){
    console.log ("Server started at port 3000");
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
    }*/