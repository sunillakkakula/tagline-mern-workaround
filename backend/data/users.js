import bcrypt from "bcryptjs";

const users = [
  {
    name: "sunil",
    email: "sunil@tagline.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "ganesh",
    email: "ganesh@tagline.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "ksp",
    email: "ksp@tagline.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
