const multer = require("multer");
const mimetypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

/*
The following code returns storage path, unique name for each file and 
defines limits. The exact file paths are defined by calling upload 
function (below) and adding the subfolder for user, post, comments
*/

const upload = function (subfolder) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./uploads/" + subfolder);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); //date is added to create a unique filename
      },
    }),
    limits: { filesize: "2000000" },
    fileFilter: (req, file, cb) => {
      if (mimetypes.includes(file.mimetype)) {
        return cb(null, true);
      } else {
        return cb("File format not accepted");
      }
    },
  });
};

const uploadUserImg = upload("users"); //passing subfolder as parameter
const uploadEventsImg = upload("events");
const uploadCommentImg = upload("comments");
const uploadNoticesImg = upload("notices");

module.exports = { uploadUserImg, uploadEventsImg, uploadCommentImg, uploadNoticesImg };
