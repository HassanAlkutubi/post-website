import express from "express";

const app = express();
const port = 3000;

const allPosts = [];
var postId = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))



app.get("/",(req, res) => {
  res.render("homepage.ejs");
});

app.post("/post",(req, res) => {
  if (req.body["editId"]) {
    const editIndex = allPosts.findIndex(element => element.postId ===  Number(req.body["editId"]));
    console.log(`${allPosts[editIndex]["title"]} is edited to be:`);
    allPosts[editIndex]["title"] = req.body["title"];
    allPosts[editIndex]["content"] = req.body["content"]
    console.log(`${allPosts[editIndex]["title"]}`)
  }
  else if (req.body["deletedId"]) {
    
    const deletedIndex = allPosts.findIndex(element => element.postId ===  Number(req.body["deletedId"]));
    console.log(`post ${deletedIndex} is deleted`);
    allPosts.splice(deletedIndex, 1);
  }
  else {
  postId = postId + 1;
  let singlePost = {};
  singlePost = {postId: postId, title: req.body["title"], content: req.body["content"]};
  allPosts.push(singlePost);
  }
  console.log(req.body);
  console.log(allPosts);
  res.render("homepage.ejs", {allPosts: allPosts});
});

app.post("/edit", (req, res) => {
  console.log(req.body)
  res.render("edit.ejs",{existingPost: req.body})
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});