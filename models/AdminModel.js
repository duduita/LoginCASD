const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePatchUpdate = require('mongoose-patch-update');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nconf = require('nconf');

///Schema declaration
const AdminSchema = new mongoose.Schema({
   _id:{
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Auto generated id for the submitted form"
   },

   password:{
      type: mongoose.Schema.Types.String,
      auto: true,
      default: nconf.get("__ADMIN_PASSWORD__"),
      description: "Senha de acesso do ADMIN"
   },

   casdvestStatus:{
      year: {type: mongoose.Schema.Types.Number, default: (new Date().getFullYear())+1},
      stage:{type:mongoose.Schema.Types.Number, default: 0, enum: [0,1,2,3,4,5]},
      distributedRooms:{type:mongoose.Schema.Types.Boolean, default: false},
      distributedSchedules:{type:mongoose.Schema.Types.Boolean, default: false},
      assignedTestResult: {type: mongoose.Schema.Types.Boolean, default: false},
      summonData:{type: mongoose.Schema.Types.Array, default: []},
      noticeLink: {type: mongoose.Schema.Types.String, default: false},
      exemptionReqResDeadline: {type: mongoose.Schema.Types.Date, default: new Date()},
      lateFeePaymentInitialDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      lateFeePaymentFinalDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      lateFeePaymentInitialTime: {type: mongoose.Schema.Types.String, default: false},
      lateFeePaymentFinalTime: {type: mongoose.Schema.Types.String, default: false},
      feeValue: {type: mongoose.Schema.Types.Number, default: 10.00},
      testDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      testAddress: {type: mongoose.Schema.Types.String, default: false},
      nTestQuestions: {type: mongoose.Schema.Types.Number, default: false},
      testResultDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      ESResultDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      registrationCallDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      privateSpaces: {type: mongoose.Schema.Types.Number, default: false}
   },

   casdinhoStatus:{
      year: {type: mongoose.Schema.Types.Number, default: (new Date().getFullYear())+1},
      stage:{type:mongoose.Schema.Types.Number, default: 0, enum:[0,1,2,3,4,5]},
      distributedRooms:{type:mongoose.Schema.Types.Boolean, default: false},
      distributedSchedules:{type:mongoose.Schema.Types.Boolean, default: false},
      assignedTestResult: {type: mongoose.Schema.Types.Boolean, default: false},
      summonData:{type: mongoose.Schema.Types.Array, default: []},
      noticeLink: {type: mongoose.Schema.Types.String, default: false},
      exemptionReqResDeadline: {type: mongoose.Schema.Types.Date, default: new Date()},
      lateFeePaymentInitialDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      lateFeePaymentFinalDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      lateFeePaymentInitialTime: {type: mongoose.Schema.Types.String, default: false},
      lateFeePaymentFinalTime: {type: mongoose.Schema.Types.String, default: false},
      feeValue: {type: mongoose.Schema.Types.Number, default: 10.00},
      testDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      testAddress: {type: mongoose.Schema.Types.String, default: false},
      nTestQuestions: {type: mongoose.Schema.Types.Number, default: false},
      testResultDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      ESResultDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      registrationCallDate: {type: mongoose.Schema.Types.Date, default: new Date()},
      privateSpaces8Grade: {type: mongoose.Schema.Types.Number, default: false},
      privateSpaces9Grade: {type: mongoose.Schema.Types.Number, default: false}
   }
})

///Index Creation
AdminSchema.index({createdAt: 1});
AdminSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [ 
   'password',
];

//Creating the Schema BoilerPlate
AdminSchema.statics.getProtectedAttributes = () => protectedAttributes;
AdminSchema.plugin(mongoosePatchUpdate);

module.exports = mongoose.model('Admin',AdminSchema);

