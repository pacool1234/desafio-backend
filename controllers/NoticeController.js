const Notice = require("../models/Notice");
// const User = require("../models/User");
const Tag = require("../models/Tag");

const NoticeController = {

  async create(req, res) {
    try {
      let imgPath;
      if (req.file) {
        imgPath = req.file.path;
      }

      const noticeTags = await Notice.findById(req.body.noticeTags);

      const notice = await Notice.create({
        title: req.body.title,
        description: req.body.description,
        noticeTags: noticeTags,
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
