const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("connected to mongodb database ...");
  })
  .catch(err => {
    console.error("could not connect to mongodb", err);
  });

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseSchema);

const save = async function saveCourse() {
  const course = new Course({
    name: "igwe",
    author: "Mosh",
    tags: ["java", "frontend"],
    isPublished: false
  });
  const result = course.save();
  console.log(result);
};

async function getCourses() {
  //eq equal
  //ne notequal
  //gt greater than
  //gte greater than or equal to
  //lt less than
  //lte less than or equal to
  //in
  //ni not in
  const courses = await Course
    //.find({ name: "igwe", isPublished: false })
    //.find({ price: { $gte: 10, $lte: 20 } })
    .find({ price: { $in: [10, 20, 30] } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
//save();
