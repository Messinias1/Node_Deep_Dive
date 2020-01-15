const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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
  try {
    const course = await Course.update(
      { _id: courseId },
      {
        $unset: {
          author: ""
        }
      }
    );
    course.author.name = "Mosh Hamedani";
    course.save();
  } catch (error) {
    console.error(error.message);
  }
}

// updateAuthor("5e1d57d46cf81cdff041594c");

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

removeAuthor("5e1d5f79d9ee59b58064cebe", "5e1d607d5be7bdcadcbf9429");

// addAuthor("5e1d5f79d9ee59b58064cebe", new Author({ name: "Amy" }));

// createCourse("Node Course", [
//   new Author({ name: "John" }),
//   new Author({ name: "Mosh" })
// ]);
