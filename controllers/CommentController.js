const Comment = require("../models/Comment");
const Notice = require("../models/Notice");


const CommentController = {

    //ENDPOINT: CREATE COMMENT  (login required)
    async create(req, res) {
        try {
            const comment = await Comment.create(req.body)
            const notice = await Notice.findByIdAndUpdate(
                req.params._id,
                { $push: { commentIds: req.comment._id } },
                { new: true });
            res.status(201).send({ message: 'You have published the following comment:', comment })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: '(500) There has been a problem creating the COMMENT' })
        }
    },



 //ENDPOINT: UPDATE COMMENT
 async update(req, res) {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params._id, req.body,
            { new: true })
        res.send({ message: " This COMMENT has been successfully updated:", comment });
    } catch (error) {
        console.error(error);
    }
},
    //ENDPOINT:  GET COMMENT by ID (login required)

    async getById(req, res) {
        try {
            const comment = await Comment.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },

        //ENDPOINT:  GET ALL COMMENTS (login required)

        async getAll(req, res) {
            try {
              const comments = await Comment.find();
              res.send(comments);
            } catch (error) {
              console.error(error);
              res.status(500).send({ message: 'There has been a problem showing ALL COMMENTS' });
            }
          },
          
   
    //ENDPOINT: DELETE COMMENT (login required)

    async delete(req, res) {
        try {
            const comment = await Notice.findByIdAndDelete(req.params._id)
            res.send({ message: 'This COMMENT has been deleted', comment })
        } catch (error) {
            console.error(error)
            res.status(500).send ({message: 'There was a problem trying to remove the COMMENT'})
        }
    },
}

module.exports = CommentController;
