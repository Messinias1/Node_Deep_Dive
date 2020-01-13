const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("could not connect to mongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxLength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        // Do some async work
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular.js Course",
    category: "web",
    author: "Mosh",
    // tags: ["angular", "frontend"],
    isPublished: true,
    price: 15
  });

  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
createCourse();

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

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
// getCourses();

async function updateCourse(id) {
  // Approach: Query First
  // findById()
  // Modify its properties
  // save()
  //   const course = await Course.findById(id);
  //   if (!course) return;

  //   course.isPublished = true;
  //   course.author = "Another Author";

  //   const result = await course.save();
  //   console.log(result);

  // Approach: Update First
  // Update Directly
  // Optionally: get the updated document
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false
      }
    },
    { new: true }
  );
  console.log(course);
}
// updateCourse("5e1a28938abb6fb3705e09e4");

async function removeCourse(id) {
  // const result = await Course.deleteMany({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse("5e1a28938abb6fb3705e09e4");
