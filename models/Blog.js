import mongoose from "mongoose";



  const BlogSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Please insert a Title"]
        },
        description: {
            type: String,
            required: [true, "Please insert a Description"]
        },
        img: {
            type: [Object],
            required: true
        },
        list: {
            type: [String],
            required: true
        }
      
      
  })


const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;