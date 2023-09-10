const jwt = require("jsonwebtoken");
const secretKey = "oxnotejwt56key_748392";

const signInToJwt = (resid) => {
  const payload = {
    id: resid,
  };
  const signing = jwt.sign(payload, secretKey, { expiresIn: "100h" });
  console.log(signing);
  if (signing) return true;
  else return false;
};

const verifyTokenafterSignin = (token) => {

    
    
};

const verifyTokenByJwt = (token,Skey) => {
    
}

module.exports = {
  signInToJwt,
};
