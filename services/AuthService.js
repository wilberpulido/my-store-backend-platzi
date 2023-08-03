const  service = require('./UsersService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config')


class AuthService {

  async getUser(email,password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role,
    }

    const token = jwt.sign(payload,config.jwtSecret);
//    delete user.dataValues.password;

    return { user,token };
  }

  async sendMail(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.forwardemail.net",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: config.smptEmail,
        pass: config.smptPassword,
      }
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return { message: 'mail sent' };
  }

}


module.exports = AuthService;
