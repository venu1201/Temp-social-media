import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    username: String,
    tags: [String],
    selectedfile: [String], // Store an array of compressed image data as a binary buffer
    likeCount:[String],
    Comments: [
      {
        username: String,
        commentText: String,
      },
    ],
  },
  // Set timestamps option to true to enable createdAt and updatedAt fields
  { timestamps: true }
);

const PostModel = mongoose.model('PostModel', postSchema);

export default PostModel;
