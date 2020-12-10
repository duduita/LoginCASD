const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
const mongoosePaginate = require('mongoose-paginate-v2');
const { schema } = require('./CandidateModel');

const CandidateStatusSchema = new mongoose.Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      description: "Id do Schema"
   },

   registrationStatus: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
      description: "Booleana que diz se a inscrição está ativa ou não"
   },

   exemptionStatus: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: "notRequired",
      description: "Booleana que diz se a pessoa esta isenta de pagar a inscrição"
   },

   exemptionJustification: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Motivo do pedido de isenção"
   },

   feePaid: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
      description: "Se a taxa de inscrição foi paga"
   },

   testPresence:{
      type: mongoose.Schema.Types.Boolean,
      default: false,
      description: "Booleana que fala se a pessoa esteve presente"
   },

   roomId: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Sala de prova do candidato"
   },

   ifSpecialRoom: {
      type: mongoose.Schema.Types.String,
      required: false,
	   default: "false",
      description: "Se a sala do aluno é especial"
   },

   summoned:{
      type: mongoose.Schema.Types.Boolean,
      required: false,
      default: false,
      description: "Se o aluno foi convocado para fazer matrícula"
   },

   specialRoomObservation: {
      type: mongoose.Schema.Types.String,
      required: false,
      description: "Observação sobre o uso da sala especial"
   },

   grade: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: false,
      description: "Nota do candidato"
   },

   testResult: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
      default: false,
      description: "Se o aluno foi convocado para fazer a entrevista socioeconômica"
   },

   esTime: {
      type: mongoose.Schema.Types.Date,
      required: false,
      description: "Horário em que o aluno deve se apresentar para a entrevista socioeconômica na data escolhida"
   },

   esPresence: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
      default: false,
      description: "Booleana que diz se a pessoa esteve presente na entrevista socioeconômica"
   },

   esResult: {
      type: mongoose.Schema.Types.Boolean,
      required: false,
      description: "Status de aprovação na entrevista socioeconômica",
   },

   summonNumber:{
      type: mongoose.Schema.Types.Number,
      required: false,
      description: "Número da chamada para matrícula do aluno"
   },

   enrollStatus:{
      type: mongoose.Schema.Types.Boolean,
      required: false,
      description: "Se o aluno está matriculado ou não no curso"
   }
}, {
   timestamps: true
});

///Index Creation
CandidateStatusSchema.index({createdAt: 1});
CandidateStatusSchema.index({createdAt: -1});

//Defining Protected Attributes
//A principio estou deixando todos protegidos (Usuário não pode mudar sua inscrição)
const protectedAttributes = [];

//Defining sortable attributes
const sortableAttributes = [
   'createdAt'
];

const schemaKeys = Object.keys(CandidateStatusSchema.tree);

//Creating the Schema BoilerPlate
CandidateStatusSchema.statics.getProtectedAttributes = () => protectedAttributes;
CandidateStatusSchema.statics.getSortableAttributes = () => sortableAttributes;
CandidateStatusSchema.statics.getKeys = () => schemaKeys;
CandidateStatusSchema.plugin(mongoosePaginate);
CandidateStatusSchema.plugin(mongoosePatchUpdate);


module.exports = mongoose.model('CandidateStatus',CandidateStatusSchema);
