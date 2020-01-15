const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //   const course = await Course.findById(courseId);
  //   course.author.name = "Carl Kakisis";
  //   course.save();
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "Carl"
      }
    }
  );
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Carl" }),
//   new Author({ name: "Bob" })
// ]);
// addAuthor("5e1eb0af01b9abe690d7e726", new Author({ name: "Jason" }));
removeAuthor("5e1eb0af01b9abe690d7e726", "5e1eb264ef69b4e8c8e40118");
// updateAuthor("5e1eabc5db17440fb180b605");
