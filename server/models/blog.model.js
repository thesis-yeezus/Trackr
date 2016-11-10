var Blog = require('../db').Blog;
var Keyword = require('../db').Keyword;
var User = require('../db').User;
var async = require('async');

var blogModel = {};

blogModel.postBlog = function(newBlog, keywords, username) {
  return User.findOne({
    where: {
      username: username
    }
  })
  .then(function(user) {
    console.log("This is user", user)
    return Blog.create({
      userId: user.dataValues.id,
      content: newBlog.content
    })
    .then(function(blog) {
      var blogPost = blog;
      var keywordArr = [];
      async.eachSeries(keywords, function(name, callback) {
        console.log("this is name", name)
        Keyword.findOrCreate({
          where: {
            tag: name
          }
        })
        .then(function(result) {
          console.log("This is result", result)
          keywordArr.push(result[0].dataValues.id)
          callback()
        })
        .then(function() {
          blogPost.setKeywords(keywordArr, blogPost.id)
        })
      })
    })
  })
  
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.err(err)
    })
}

// exports.noteCreate = function(req, res, newNote, categories, tags) {
// //    console.log("line 19: note",newNote);
//     db.Note.create(newNote)
//         .then(function(note){
//         var noteRecord = note;
//         var tagArr     = [];
//            note.setCategories(categories, note.id)
//                .then(function(NotesCategories){
//                 console.log("NotesCategories has been update !!: ", tags);
// //                console.log("the array of tags",tags);
//                     async.eachSeries(tags, function(tag, callback) {
//                         db.Tag.findOrCreate({
//                             where: {
//                                 name: tag
//                             }
//                         })
//                         .then(function(result) {
//                             tagArr.push(result[0].dataValues.id);
//                             callback()
//                         })
//                         .then(function(){
//                             noteRecord.setTags(tagArr, noteRecord.id)

//functions to grab from the db
blogModel.getBlog = function(Blogname, password) {
  return Blog.find({
      where: {
      }
    })
    .then(function() {
    })
}

module.exports = blogModel