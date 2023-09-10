const { signInToJwt } = require("../Middlewares/jwt.auth");
const Note = require("../Models/notes");
const User = require("../Models/users");
const bcrypt = require("bcrypt");
const userController = {
  async signupUser(req, res) {
    try {
      if (!req.body) {
        return res.status(404).send({ message: "Resourses not found" });
      }

      const { name, email, password } = req.body;

      if (!name && !email) {
        return res.status(404).send({ message: "Resourses not found" });
      }
      let cheackDetiails = await User.findOne({ email: email });
      if (cheackDetiails)
        return res
          .status(404)
          .send({ message: "This account is already reisters" });

      let saltkey = await bcrypt.genSalt(10);

      let encryptPassword = await bcrypt.hash(password, saltkey);

      const userData = new User({
        name: name,

        email: email,

        encryptedPassword: encryptPassword,

        password: password,

        status: true,
      });

      let savedData = await userData.save();
      if (!savedData) return res.status(404).send({ message: "Not saved" });
      res.send(true);
    } catch (error) {
      console.log(error);
    }
  },
  async signinUser(req, res) {
    try {
      if (!req.body) {
        return res.status(404).send({ message: "Resourses not found" });
      }
      const { email, password } = req.body;

      if (!email) return res.status(404).send({ message: "Email is requried" });
      const findUser = await User.findOne({ email: email }).exec();
      if (!findUser)
        return res
          .status(404)
          .send({ message: "Your Not authenticated", key: "signup" });
      let encodePassowrd = await bcrypt.compare(
        password,
        findUser.encryptedPassword
      );
      if (!encodePassowrd)
        return res
          .status(404)
          .send({ message: "Your Not authenticated", key: "login" });

      let signintoJwt = signInToJwt(findUser._id);
      if (!signintoJwt)
        return res
          .status(404)
          .send({ message: "Your Not authenticated", key: "signup" });

      res.send({ message: true });
    } catch (error) {
      console.log(error);
    }
  },
  async addNote(req, res) {
    try {
      const { title, description, points, userid } = req.body;

      const Notes = new Note({
        userd: userid,
        title: title,
        description: description,
        points: points,
        date: Date.now(),
      });
      const addingNote = await Notes.save();

      if (!addingNote) return res.status({ message: "Note not added" });

      res.send(true);
    } catch (error) {
      console.log(error);
    }
  },
  async getNotes(req, res) {
    try {
      const Notes = await Note.find({}).exec();
      if (!Notes) return res.status(404).send({ message: "No Notes found" });

      res.send(Notes);
    } catch (error) {}
  },
  async editNote(req, res) {
    try {
      const { title, description, points, userid } = req.body;

      const editdata = {
        title: title,
        description: description,
        points: points,
      };

      const editingDate = await Note.findByIdAndUpdate(
        { userd: userid },
        editdata
      ).exec();
      if (!editingDate) return res.status(400).send(false);
      res.send(true);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
