const Comment = require("../models/Comment");
const Notice = require("../models/Notice");
const User = require("../models/Notice");


const CommentController = {

    //ENDPOINT: CREATE COMMENT  (login required)
    async create(req, res) {
        try {
            const comment = await Comment.create({
                body: req.body.body,
                userId: req.user._id,
                noticeId: req.params._id,
            });

            await Notice.findByIdAndUpdate(req.params._id, {
                $push: { commentIds: comment._id },
            });

            res.status(201).send({ message: "Comment created successfully", comment });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: `There was a problem creating the comment: ${error.message}` });
        }
    },



    //ENDPOINT: UPDATE COMMENT
    async update(req, res) {
        try {
            const updateFields = {
                ...req.body,
                userId: req.user._id
            };
            const comment = await Comment.findByIdAndUpdate(
                req.params._id,
                updateFields,
                { new: true }
            );
            if (!comment) {
                return res.status(404).send({ message: "Comment not found" });
            }
            res.send({ message: "Comment updated successfully", comment });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem updating the comment: ${error.message}` });
        }

    },
    //ENDPOINT:  GET COMMENT by ID (login required)

    async getById(req, res) {
        try {
            const comment = await Comment.findById(req.params._id)
            res.send(comment)
        } catch (error) {
            console.error(error);
        }
    },

    //ENDPOINT:  GET ALL COMMENTS (login required)

    async getAll(req, res) {
        try {
            const comments = await Comment.find().populate('userId');
            res.send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There has been a problem showing ALL COMMENTS' });
        }
    },


    //ENDPOINT: DELETE COMMENT (login required)

    async delete(req, res) {
        try {
          const comment = await Comment.findByIdAndDelete(req.params._id);
      
          if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
          }
      
          const notice = await Notice.findById(comment.noticeId);
          if (!notice) {
            return res.status(404).send({ message: "Notice not found" });
          }
      
          notice.commentIds.pull(comment._id);
          await notice.save();
      
          res.send({ message: "Comment deleted", comment });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ message: `There was a problem deleting the comment: ${error.message}` });
        }
      }
      
      
      
}

module.exports = CommentController;
