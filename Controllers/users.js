const { signInToJwt, extractingRequest } = require("../Middlewares/jwt.auth");
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
          .send({ message: "This account is already reisters", key: "signin" });

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
      console.log(savedData);
      signInToJwt(savedData._id)
        .then((respose) => {
          console.log(respose);
          if (respose.status == false) {
            return res
              .status(404)
              .send({ message: "Your Not authenticated", key: "signup" });
          }
          req.user = respose.user.id;
          res.send({ message: true, token: respose.token });
        })
        .catch((err) => {
          return res
            .status(404)
            .send({ message: "Your Not authenticated", key: "signup" });
        });
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

      signInToJwt(findUser._id)
        .then((respose) => {
          console.log(respose);
          if (respose.status == false) {
            return res
              .status(404)
              .send({ message: "Your Not authenticated", key: "signup" });
          }
          req.user = respose.user.id;
          res.send({ message: true, token: respose.token });
        })
        .catch((err) => {
          return res
            .status(404)
            .send({ message: "Your Not authenticated", key: "signup" });
        });
    } catch (error) {
      console.log(error);
    }
  },
  async authentication(req, res) {
    try {
      extractingRequest(req, res).then(
        (resposnse) => {
          if (resposnse.status) {
            res.send(true);
          } else {
            return res
              .status(404)
              .send({ message: "Your Not authenticated", key: "signup" });
          }
        },
        (err) => {
          return res
            .status(404)
            .send({ message: "Your Not authenticated", key: "signup" });
        }
      );
    } catch (error) {}
  },
  async addNote(req, res) {
    try {
      const { title, description, points, userid } = req.body;
      const userId = req.user;

      const Notes = new Note({
        userd: "",
        title: "",
        description: "",
        points: "",
        userId: userId,
        date: Date.now(),
      });
      const addingNote = await Notes.save();

      if (!addingNote) return res.status({ message: "Note not added" });
      console.log(addingNote);
      res.send({ note: addingNote });
    } catch (error) {
      console.log(error);
    }
  },
  async getNotes(req, res) {
    try {
      let userId = req.user;
      const Notes = await Note.find({ userId: userId })
        .sort({ date: -1 })
        .exec();
      if (!Notes) return res.status(404).send({ message: "No Notes found" });

      res.send(Notes);
    } catch (error) {}
  },

  async updateDesc(req, res) {
    try {
      let { text } = req.body;
      let { id } = req.params;
      const userId = req.user;

      let updating = await Note.updateOne(
        { _id: id, userId: userId },
        { $set: { description: text, date: Date.now() } }
      ).exec();
      if (updating.modifiedCount == 1) {
        const updatedDocument = await Note.findOne({
          _id: id,
          userId: userId,
        }).exec();
        res.send({ status: true, resNote: updatedDocument });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async updateTitle(req, res) {
    try {
      let { text } = req.body;
      let { id } = req.params;
      const userId = req.user;
      let updating = await Note.updateOne(
        { _id: id, userId: userId },
        { $set: { title: text, date: Date.now() } }
      ).exec();
      if (updating.modifiedCount == 1) {
        const updatedDocument = await Note.findOne({
          _id: id,
          userId: userId,
        }).exec();
        res.send({ status: true, resNote: updatedDocument });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async deleteNote(req, res) {
    try {
      if (req.params) {
        const { id } = req.params;
        const deletingNote = await Note.findByIdAndRemove(id);
        if (deletingNote)
          return res.send({ status: true, id: deletingNote._id });
      }
    } catch (error) {}
  },
};

module.exports = userController;
