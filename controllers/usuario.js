const { startSession } = require("mongoose");
const ErrorResponse = require("../helper/errorResponse");
const Usuario = require("../models/Usuario");
const UsuarioEstudiante=require("../models/UsuarioEstudiante");



  exports.postularOferta = async (req, res, next) => {
    const session = await startSession();
    try {
      session.startTransaction();
      const usuario1 = await Usuario.findById(
        req.params.id
      );
      console.log(usuario1.estudiante);
      var id= usuario1.estudiante;
      const updatedUser= await UsuarioEstudiante.updateOne(
        {_id:id},{
          $addToSet:{
            aplying:req.body.aplying
          }
        },{session}
      );
      await session.commitTransaction();
      if (!updatedUser) {
        return next(
          new ErrorResponse(
            "La oferta no existe con este id: " + req.params.id,
            404
          )
        );
      }
      res.status(200).json({
        status: 200,
        data: updatedUser
      });
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      next(
        new ErrorResponse(
          "La oferta no existe con este id: " + req.params.id,
          404
        )
      );
    }
  };

  exports.listarUsuarios = async(req, res, next) => {
    Usuario.find((err, usuarios) => {
      if(err) {
        return res.status(400).json({
          error: 'Server error: ' + err
        });
      }
      res.json(usuarios);
    })
    .populate('estudiante', 'emailInstitucional centroDeEstudios ciclo aplying')
    .populate('ofertador','emailRegular jobPosting')
    .populate('roles','name')
    .populate({path:'estudiante',populate:[{path:'aplying',select:'puestoDeTrabajo'}]});
  }