const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:admin@cluster0.eriblqi.mongodb.net/todoList"); 

const itemsSchema = {
  name : String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name : "Welcome to your todolist !"
});

const item2 = new Item ({
  name : "Hit the + button to add new item."
});

const item3 = new Item ({
  name : "<== Hit this to delete item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name : String,
  items : [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) { 
  Item.find({}, function(err, foundItems){
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {console.log(err);
        }else {console.log("Successfully saved default items to DB.")
      }
      });
      res.redirect("/");
      } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

app.get("/:customListName", function(req,res){
  const customListName = req.params.customListName;

  List.findOne({name : customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        // Create a new list
        const list = new List ({
          name : customListName,
          items : defaultItems
      });
      list.save();
      res.redirect("/"+customListName);
    }else{
        // Show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });
  });

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const item = new Item({
    name : itemName
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      res.redirect("/")
    }
  })
});

app.get("/work", function (req,res){
  res.render("list", {listTitle:"Work List", newListItems: workItems});
})

app.get("/about", function (req,res){
  res.render("about")
})

app.listen(2920, function (req, res) {
  console.log("OK 2920port");
});
