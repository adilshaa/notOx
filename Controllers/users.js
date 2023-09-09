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
             if (!savedData)
               return res.status(404).send({ message: "Not saved" });
             res.send(true);
        } catch (error) {
            console.log(error);
        }
   
  },
};

module.exports = userController;
