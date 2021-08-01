const express = require('express');
const mongoose = require('mongoose');

const { PostMessage } = require('../models/postMessage');

const router = express.Router();

const getPosts = async (req, res) => {
  const { page } = req.query;
  console.log("page###",page)
  try {
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await PostMessage.countDocuments({});
    console.log(total)
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  } catch (error) {    
    res.status(404).json({ message: error.message });
  }
}

const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    
    res.status(200).json(post);
  } catch (error) {
     res.status(404).json({ message: error.message });
  }
}

const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

module.exports = {
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost
}	


