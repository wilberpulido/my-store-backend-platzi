const UserService = require('./UsersService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config');
const { User } = require('../db/models/UserModel');

const service = new UserService();

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
  async resetRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const payload = { sub:user.id }
    const token = jwt.sign(payload,config.jwtSecret,{expiresIn:'15min'});//Podrias tener un token diferente para recuperar contraseñas
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update(user.id,{recoveryToken:token});


    const mail = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar contraseña.", // Subject line
      text: "Hello world?", // plain text body
      html: `<b> Ingresa a este link para recuperar la contraseña: ${link} </b>`, // html body
    };
    return await this.sendMail(mail);
  }



  async sendMail(infoMail){
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
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

}


module.exports = AuthService;
