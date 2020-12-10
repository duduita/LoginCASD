const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
const mongoosePaginate = require('mongoose-paginate-v2');

const ScheduleSchema = new mongoose.Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Id do Schema"
   },

   selectionProcess: {
      type: mongoose.Schema.Types.String,
      required: true,
      enum: ["CASDINHO", "CASDVEST"],
      description:"Qual processo seletivo o candidato está participando"
   },

   scheduleDate: {
      type: mongoose.Schema.Types.Date,
      required:false,
      description: "DD/MM/AAHH:MMHH:MM"
   },

   studentsNumber: {
      type: mongoose.Schema.Types.Number,
      required: true,
      description: "Número de Alunos no Horario"
   },
}, {
   timestamps: true
});

///Index Creation
ScheduleSchema.index({createdAt: 1});
ScheduleSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = ['name_schedule'];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

//Creating the Schema BoilerPlate
ScheduleSchema.statics.getProtectedAttributes = () => protectedAttributes;
ScheduleSchema.statics.getSortableAttributes = () => sortableAttributes;
ScheduleSchema.plugin(mongoosePaginate);
ScheduleSchema.plugin(mongoosePatchUpdate);


module.exports = mongoose.model('ScheduleSchema',ScheduleSchema);
