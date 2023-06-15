const User = require("../models/User");
const UserType = require("../models/UserType");
const Degree = require("../models/Degree");
const Event = require("../models/Event");
const Notice = require("../models/Notice");
const Comment = require("../models/Comment");

const transporter = require("../config/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  //Endpoint register user
  async register(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let imgPath;
      if (req.file) {
        imgPath = req.file.path;
      }

      const userType = await UserType.findById(req.body.userType);
      const degree = await Degree.findById(req.body.degree);

      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        gender: req.body.gender,
        linkedIn: req.body.linkedIn,
        img: imgPath, // Agrega el campo de imagen a la base de datos
        userType: userType,
        degree: degree,
      });

      const emailToken = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
      const url = "http://localhost:8080/users/confirm/" + emailToken;

      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirm your registration",
        html: `<h3>Welcome, you're one step away from registering</h3>
                   <a href="${url}">Click to confirm your registration</a>
                  `,
      });

      res.status(201).send({
        message: "We have sent you an email to confirm your registration",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update a user
  async update(req, res, next) {
    try {
      let data = { ...req.body };
      const authenticatedUserId = req.user._id;
      const userToUpdateId = req.params._id;

      if (authenticatedUserId != userToUpdateId) {
        return res
          .status(403)
          .send({ message: "You do not have permission to update this user" });
      }

      if (req.file) {
        data.img = req.file.path;
      }

      delete data.password;
      delete data.role;
      delete data.confirmed;
      delete data.tokens;

      const user = await User.findByIdAndUpdate(userToUpdateId, data, {
        new: true,
      });

      res.send({ message: "User successfully updated", user });
    } catch (error) {
      next(error);
    }
  },

  // confirm register mail
  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      await User.updateOne({ email: payload.email }, { confirmed: true });

      res.status(201).send("User successfully confirmed");
    } catch (error) {
      console.error(error);
    }
  },

  // Endpoint login user with token
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      //Si el usuario no acierta introduciendo el campo de email, devuelve este mensaje
      if (!user) {
        return res.status(400).send({
          message: "Usuario o contraseña incorrectos. Vuelve a intentarlo",
        });
      }
      //Antes de hacer el login, accedemos internamente al perfil de usuario
      if (!user.confirmed) {
        // Si el campo 'confirmed' es false, significa que el correo no ha sido confirmado, seguirá mandando correos de confirmación hasta que lo valide una sola vez
        const emailToken = jwt.sign(
          { email: req.body.email },
          process.env.JWT_SECRET,
          { expiresIn: "48h" }
        );
        const url =
          "https://desafio-backend-production.up.railway.app/users/confirm/" +
          emailToken;
        //Esta es la orden del envío de correo al usuario para su validación
        await transporter.sendMail({
          to: req.body.email,
          subject: "Confirm your verification",
          html: `<h3>Welcome, you're one step away from verifying</h3>
                 <a href="${url}">Click to confirm your verification</a>`,
        });
        //Este es el mensaje que devuelve tras el primer login, o si no ha confirmado todavía ningún correo de verificación
        return res.status(401).send({
          message:
            "Revisa la bandeja de tu correo corporativo. Te hemos enviado un email para verificar la cuenta.",
        });
      }
      //Una vez haga el primer login, reciba el correo y verifique la cuenta, ya podrá logear y no recibirá más correos, seguirá la siguiente lógica

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      //Si el usuario no acierta introduciendo el campo de password, devuelve este mensaje
      if (!passwordMatch) {
        return res.status(400).send({
          message: "Usuario o contraseña incorrectos. Vuelve a intentarlo",
        });
      }

      // Agregar lógica para verificar contraseña y generar token de acceso

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();

      // Cuando los campos de usuario y contraseña son correctos, y el correo está verificado, en todos los login recibirá este mensaje
      res.status(200).send({ token });
      // send({ message: "Welcome " + user.username, token });
    } catch (error) {
      console.error(error);
    }
  },

  // Endpoint logout user
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });

      res.send({ message: `Logged out successfully ${req.user.username}` });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "There was a problem trying to log out the user",
      });
    }
  },

  //get all users

  async getAll(req, res, next) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      next(error);
    }
  },

  // Endpoint get authenticated user
  async getUser(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate("degree")
        .populate("userType")
        .populate("skills")
        .populate("hobbies")
        .populate("interest")
        .populate("chat")
        .populate("suscriptions")
        .populate("contacts");
      res.send(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        // .send({ error: "An error occurred while getting user information" });
        .send(error);
    }
  },

  // get user by Id
  async getById(req, res, next) {
    try {
      const user = await User.findById(req.params._id)
        .populate("degree")
        .populate("userType")
        .populate("skills")
        .populate("hobbies")
        .populate("interest")
        .populate("chat")
        .populate("contacts");
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  // get user by Username
  async getByUsername(req, res, next) {
    try {
      const users = await User.find({
        username: { $regex: req.params.username, $options: "i" },
      });
      if (!users || users.length === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(users);
    } catch (error) {
      next(error);
    }
  },

  async recoverPassword(req, res) {
    try {
      const recoverToken = jwt.sign(
        { email: req.params.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        }
      );
      function base64UrlEncode(str) {
        return str.replace(/\./g, "¿");
      }
      const encodedToken = base64UrlEncode(recoverToken);

      const url = "http://localhost:5173/recoverPass/" + encodedToken;
      // + recoverToken;
      await transporter.sendMail({
        to: req.params.email,
        subject: "Recover Password",
        html: `<h3> Recover Password </h3>          
          <a href="${url}">Recover Password</a>
          The link will expire in 48 hours`,
      });
      res.send({
        message:
          "Revisa la bandeja de tu correo corporativo. Te hemos mandado un mail para recuperar la contraseña.",
      });
    } catch (error) {
      console.error(error);
    }
  },

  async resetPassword(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const recoverToken = req.params.recoverToken;
      function base64UrlDecode(str) {
        return str.replace(/¿/g, ".");
      }
      const decodedToken = base64UrlDecode(recoverToken);
      const payload = jwt.verify(decodedToken, process.env.JWT_SECRET);
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: hashedPassword }
      );
      res.send({ message: "Contraseña cambiada con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error al cambiar la contraseña", error });
    }
  },

  //event inscription
  async suscription(req, res) {
    try {
      const event = await Event.findById(req.params._id);

      if (event.attendees.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You already liked this event" });
      }

      event.attendees.push(req.user._id);
      await event.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { suscriptions: req.params._id } },
        { new: true }
      );

      res.send(event);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

  //Likes notices
  async likesnotices(req, res) {
    try {
      const notice = await Notice.findById(req.params._id);

      if (notice.likesUsers.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You already liked this notice" });
      }

      notice.likesUsers.push(req.user._id);
      await notice.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likesNotices: req.params._id } },
        { new: true }
      );

      res.send(notice);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

  //unlike notices
  async unlikenotices(req, res) {
    try {
      const notice = await Notice.findById(req.params._id);

      if (!notice.likesUsers.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You have not liked this notice" });
      }

      notice.likesUsers = notice.likesUsers.filter(
        (likesUser) => likesUser.toString() !== req.user._id.toString()
      );
      await notice.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likesNotices: req.params._id } },
        { new: true }
      );

      res.status(200).send({ message: "You have unliked the notice", notice });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem unliking the notice" });
    }
  },

  //Likes comments
  async likescomments(req, res) {
    try {
      const comment = await Comment.findById(req.params._id);

      if (comment.likesUserC.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You already liked this comment" });
      }

      comment.likesUserC.push(req.user._id);
      await comment.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { likesCom: req.params._id } },
        { new: true }
      );

      res.send(comment);
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your like" });
    }
  },

  //unlike comments
  async unlikecomments(req, res) {
    try {
      const comment = await Comment.findById(req.params._id);

      if (!comment.likesUserC.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You have not liked this comment" });
      }

      comment.likesUserC = comment.likesUserC.filter(
        (likesUserC) => likesUserC.toString() !== req.user._id.toString()
      );
      await comment.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likesCom: req.params._id } },
        { new: true }
      );

      res
        .status(200)
        .send({ message: "You have unliked the comment", comment });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem unliking the comment" });
    }
  },

  //NO SE ESTÁN USANDO PERO SE PODRÍAN USAR EN UN FUTURO

  //To follow a user
  async follow(req, res) {
    try {
      const user = await User.findById(req.params._id);

      if (user.followers.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You already follow this user" });
      }

      user.followers.push(req.user._id);
      await user.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: req.params._id } },
        { new: true }
      );

      res
        .status(200)
        .send({ message: `Now you are following ${user.username}`, user });
    } catch (error) {
      console.error(error);

      res.status(500).send({ message: "There was a problem with your follow" });
    }
  },

  // Remove follow from user, only remove own follow
  async unfollow(req, res) {
    try {
      const user = await User.findById(req.params._id);

      if (!user.followers.includes(req.user._id)) {
        return res
          .status(400)
          .send({ message: "You are not following this user" });
      }

      user.followers = user.followers.filter(
        (follower) => follower.toString() !== req.user._id.toString()
      );
      await user.save();

      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.params._id } },
        { new: true }
      );

      res
        .status(200)
        .send({ message: `Now you are not following ${user.username}`, user });
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .send({ message: "There was a problem unfollowing the user" });
    }
  },

  // get loged user with post and followers and number of both
  async getUserFollowers(req, res) {
    try {
      const user = await User.findById(req.user._id);
      const posts = await Post.find({ author: req.user._id });
      const followers = user.followers.length;

      res.status(200).json({ user, posts, followers });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem getting the current user" });
    }
  },

  async getUserFollowersInfo(req, res) {
    try {
      const user = await User.findById(req.user._id).populate(
        "followers",
        "username"
      );
      const posts = await Post.find({ author: req.user._id });
      const followers = user.followers.length;
      const followerNames = user.followers.map((follower) => follower.username);

      res.status(200).json({ user, posts, followers, followerNames });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "There was a problem getting the user info" });
    }
  },

  async addContact(req, res) {
    try {
      const res = await User.findByIdAndUpdate(req.user._id, {
        $push: {
          contacts: req.body.userId,
        },
      });

      res.send({
        message: `User with ID: ${req.body.userId} added to contacts`,
        res
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem when adding contact", error });
    }
  },

  async removeContact(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          contacts: req.body.userId,
        },
      });

      res.send({
        message: `User with ID: ${req.body.userId} removed from contacts`,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem when removing contact", error });
    }
  },

  async updateImage(req, res) {
    try {
      const userId = req.params._id;
      const { img } = req.body;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { img },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
  
      if (req.file) {
        user.img = req.file.filename;
        await user.save();
      }
  
        
      res.send({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha ocurrido un error al actualizar el usuario' });
    }
  },

};

module.exports = UserController;
