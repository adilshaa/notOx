const jwt = require("jsonwebtoken");
const secretKey = "oxnotejwt56key_748392";

const signInToJwt = async (resid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: resid,
    };
    const signing = jwt.sign(payload, secretKey, { expiresIn: "100h" });

    if (signing) {
      try {
        verifyTokenafterSignin(signing).then(
          (res) => {
            if (res.status);
            resolve({
              status: true,
              token: res.token,
              user: res.user,
            });
          },
          (err) => {
            console.log(err);

            reject({ status: false });
          }
        );
      } catch (err) {
        console.error(err);
        reject({ status: false });
      }
    } else {
      reject({ status: false });
    }
  });
};

const verifyTokenafterSignin = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      verifyTokenByJwt(token, secretKey)
        .then((res) => {
          console.log(res);
          resolve({ status: true, token: token, user: res.user });
        })
        .catch((err) => {
          console.error(err);
          resolve({ status: false });
        });
    } else {
      resolve({ status: false });
    }
  });
};

const veifyRequestes = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json("You are not authenticated");
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json("You are not authenticated");
    verifyTokenByJwt(token, secretKey)
      .then((response) => {
        if (response.status) {
          req.user = response.user.id;
          next();
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(401).json("Your not authenticated ");
      });
  } catch (error) {}
};
const extractingRequest = (req, res) => {
  try {
    return new Promise((resolve, reject) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json("You are not authenticated");
      const token = authHeader.split(" ")[1];
      if (!token) return res.status(401).json("You are not authenticated");
      verifyTokenByJwt(token, secretKey)
        .then((response) => {
          if (response.status) {
            resolve({ status: true });
          } else {
            reject({ status: false });
          }
        })
        .catch((err) => {
          console.error(err);
          return res.status(401).json("Your not authenticated ");
        });
    });
  } catch (error) {
    console.log(error);
  }
};
const verifyTokenByJwt = (token, Skey) => {
  return new Promise((resolve, reject) => {
    if (token && Skey) {
      jwt.verify(token, Skey, (err, user) => {
        if (err) {
          reject({ status: false });
        } else {
          resolve({ status: true, user: user });
        }
      });
    } else {
      reject({ status: false });
    }
  });
};

module.exports = {
  signInToJwt,
  veifyRequestes,
  extractingRequest,
};
