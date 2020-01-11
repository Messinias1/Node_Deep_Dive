const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("could not connect to mongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // Comparison Query Operators
  // ne (not equal)
  // gt (greater than)
  // gte (greater than || equal to)
  // lt (less than)
  // lte (less than || equal to)
  // in
  // nin (not in)

  // Logical Query Operators
  // or
  // and

  // Regular Expression
  // /^Mosh/ = starts with
  // /Hamedani$/ = ends with
  // /.*Mosh.*/ = contains
  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count()
  console.log(courses);
}

getCourses();
