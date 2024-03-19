import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));

let posts;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(express.static("public"));

const blogPostsJSON = JSON.parse(
  fs.readFileSync(`${__dirname}/public/json/blog_posts.json`, "utf8")
);

app.get("/", (req, res) => {
  posts = blogPostsJSON;
  //   console.log(posts.posts);

  res.render("index.ejs", { posts: posts.posts });
});

app.get("/blog-post/:uuid", (req, res) => {
  let blogPostWithSpecificUuid = findBlogPostWithUuid(
    posts.posts,
    req.params["uuid"]
  );

  res.render("blog-post.ejs", { post: blogPostWithSpecificUuid });
});

// Create a new UUID if not unique
function generateUniqueUuid(existingUuids) {
  let candidateUuid;
  do {
    candidateUuid = uuidv4();
  } while (existingUuids.includes(candidateUuid));
  return candidateUuid;
}

app.get("/update/:uuid", (req, res) => {
  let blogPostWithSpecificUuid = findBlogPostWithUuid(
    posts.posts,
    req.params["uuid"]
  );

  res.render("edit-blog-post.ejs", { post: blogPostWithSpecificUuid });
});

app.put("/save/:uuid", (req, res) => {
  const updatedPost = posts.posts.map(post => {
    if (post.uuid === req.params["uuid"]) {
      // Update the age property
      post.title = req.body.title;
      post.date = req.body.date;
      post.author = req.body.author;
      post.content = req.body.content;
      return post;
    }
  });

  console.log(`UpdatedPost: ${updatedPost}`);

  writeChangesToJson(posts);

  res.redirect("/")
});

app.get("/delete/:uuid", (req, res) => {
  let uuid = req.params["uuid"];

  deleteBlogPostWithUuid(posts, uuid);

  res.redirect("/");
});

app.post("/", (req, res) => {
  console.log("Create blog post");

  let newUuid = uuidv4();
  let author = req.body.author;
  let title = req.body.title;
  let content = req.body.content;
  let currentDate = new Date().toJSON().slice(0, 10);

  //   console.log(
  //     `currentDate: ${currentDate} author: ${author} title: ${title} content: ${content}`
  //   );

  // Check if the UUID exists in the array
  const existingUuids = posts.posts.map((post) => post.uuid);
  const isNewUuidUnique = !existingUuids.includes(newUuid);
  if (!isNewUuidUnique) {
    newUuid = generateUniqueUuid(existingUuids);
  }

  console.log("New UUID:", newUuid);
  console.log("Is new UUID unique?", isNewUuidUnique);
  console.log("Unique UUID:", newUuid);

  let newBlogPost = {
    uuid: newUuid,
    author: author,
    title: title,
    content: content,
    date: currentDate,
  };

  posts.posts.push(newBlogPost);

  writeChangesToJson(posts);

  //   console.log(posts.posts);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function findBlogPostWithUuid(posts, uuidToFind) {
  let foundPost = posts.find((post) => post.uuid === uuidToFind);

  if (foundPost) {
    console.log(`Found blog post with uuid: ${uuidToFind}`);
    return foundPost;
  } else {
    console.log(`No blog post with specified uuid: ${uuidToFind} was found.`);
    return undefined;
  }
}

function deleteBlogPostWithUuid(posts, uuidToDelete) {
  let indexToDelete = -1;
  for (let i = 0; i < posts.posts.length; i++) {
    if (posts.posts[i].uuid === uuidToDelete) {
      indexToDelete = i;
      break;
    }
  }

  if (indexToDelete !== -1) {
    posts.posts.splice(indexToDelete, 1);
    console.log(`Deleted blog post with uuid: ${uuidToDelete}`);
    writeChangesToJson(posts);
  }
}

function writeChangesToJson(posts) {
  let jsonDataToFile = JSON.stringify(posts);

  console.log(jsonDataToFile);

  fs.writeFileSync(
    `${__dirname}/public/json/blog_posts.json`,
    jsonDataToFile,
    function (err) {
      if (err) throw err;
      console.log("Changes has been written to the blog_posts.json");
    }
  );
}
