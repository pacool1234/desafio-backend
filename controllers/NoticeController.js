const Notice = require("../models/Notice");
// const User = require("../models/User");
const Tag = require("../models/Tag");


// ENDPOINT: CREATE Notice
const NoticeController = {

  async create(req, res) {
    try {
      let imgPath;
      if (req.file) {
        imgPath = req.file.path;
      }

      const notice = await Notice.create({
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        img: imgPath,
      });

      res.status(201).send({ message: "NOTICE successful created", notice });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There has been a problem creating the NOTICE" });
    }
  },
  //ENDPOINT: UPDATE Notice
  async update(req, res) {
    try {
      const notice = await Notice.findByIdAndUpdate(req.params._id, req.body,
        { new: true })
      res.send({ message: " This NOTICE has been successfully updated:", notice });
    } catch (error) {
      console.error(error);
    }
  },

  //ENDPOINT:  GET Notice by ID

  async getById(req, res) {
    try {
      const notice = await Notice.findById(req.params._id)
        .populate({
          path: 'commentIds',
          populate: {
            path: 'userId',
            select: 'username userType img',
            populate: {
              path: 'userType',
            },
          },
          select: 'body',
        })
        .populate('userId');
  
      res.send(notice);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'There has been a problem getting the notice' });
    }
  },
  

  //ENDPOINT:  GET ALL Notices

  async getAll(req, res) {
    try {
      const notices = await Notice.find();
      res.send(notices);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'There has been a problem showing ALL NOTICES' });
    }
  },


  //ENDPOINT: DELETE Notice
  async delete(req, res) {
    try {
      const notice = await Notice.findByIdAndDelete(req.params._id)
      res.send({ notice, message: 'NOTICE Removed' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'There has been a problem deleting the EVENT' })
    }
  },
};




module.exports = NoticeController;
