 var mongoClient=require("mongodb").mongoClient;
 var express=require("express")
 var cors=require("cors");

 var conString="mongodb://127.0.0.1:27017";

 var app=express();
 app.use(cors());
 app.use(express.urlencoded({extended:true}))
 app.use(express.json());
//tblusers-->collection
 app.get("/getusers",(req,res)=>{
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblusers").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

 })
//tbladmin---->collection
 app.get("/getadmin",(req,res)=>{
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

 });
//tblcategories--->collection
 app.get("/getcategories",(req,res)=>{
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

 });
//tblvideos--->collection
 app.get("/getvideo",(req,res)=>{
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

 });

 app.get("/getvideo/:id",(req,res)=>{
    var id=parselnt(req.params.id);
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblcategories").find({Videold:id}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

 });
//User --data user
 app.post("/adduser",(req,res)=>{
    var user={
        "UserId":req.body.UserId,
        "UserName":req.body.UserName,
        "Password":req.body.Password,
        "Email":req.body.Password,
        "Mobile":req.body.Mobile
    }
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log("User Added");
            res.end();
        })
    })
 });

 //video Added--data user
 app.post("/addvideo",(req,res)=>{
    var video={
        "VideoId":parseInt(req.body.VideoId),
        "Title":req.body.Title,
        "Url":req.body.Url,
        "Likes":parseInt(req.body.Likes),
        "Views":parseInt(req.body.Views),
        "Categoryld":parseInt(req.body.Categoryld)
    }
    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log("Video Added");
            
        })
    })
 });
//Update Added--data user
 app.put("/updatevideo/:id",(req,res)=>{
    var id=parseInt(req.params.id);

    mongoClient.connect(conString).then(response=>{
        var database=response.db("videotutories");
        database.collection("tblvideos").updateOne({VideoId:id}, {$set: { VideoId:parseInt(req.body.VideoId), Title: req.body.Title, Url: req.body.Url, Likes: parseInt(req.body.Likes), Views:  parseInt(req.body.Views), CategoryId: parseInt(req.body.CategoryId)}}).then(()=>{
            console.log("Video Updated");
        
        })
    })
});
//Delete --data user
app.delete("/deletevideo/:id", (req, res)=> {
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then(response => {
        var database = response.db("videotutories");
        database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
            console.log("Video Deleted");

        })
   })
});

app.listen(6600);
console.log(`Server Started:http://127.0.0.1:6600`);
      

     
 