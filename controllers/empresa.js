const ErrorResponse = require("../helper/errorResponse");
const Empresa = require("../models/Empresa");

exports.crearEmpresa = async (req, res, next) => {
  try {
    const empresaData = await Empresa.create(req.body);
    res.status(200).json({
      status: 200,
      data: empresaData,
    });
  } catch (err) {
    next(
      new ErrorResponse(
        "No es posible crear la empresa "+err.message,
        404
      )
    );
  }
};

exports.getEmpresa = async (req, res, next) => {
  try {
    const empresaLista = await Empresa.find();
    res.status(200).json({
      empresaLista,
    });
  } catch (err) {
    
    next(
      new ErrorResponse(
        "No se pudo procesar el request" + err.message,
        404
      )
    );
  }
};

exports.getEmpresaById = async (req, res, next) => {
  try {
    const empresa = await Empresa.findById(req.params.id);
    if(!empresa){
      return next(
        new ErrorResponse(
          "La empresa no existe en la bd con este id: " + req.params.id,
          404
        )
      );
    }
    
    res.status(200).json({
      empresa,
    });
  } catch (err) {
    next(
      new ErrorResponse(
        "La empresa no existe con este id: " + req.params.id,
        404
      )
    );
  }
};

exports.updateEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body);
    if (!empresa) {
      return next(
        new ErrorResponse(
          "La empresa no existe con este id: " + req.params.id,
          404
        )
      );
    }
    res.status(200).json({
      status: 200,
      data: empresa,
    });
  } catch (err) {
    
    next(
      new ErrorResponse(
        "La empresa no existe con este id: " + req.params.id,
        404
      )
    );
  }
};

exports.deleteEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      next(
        new ErrorResponse(
          "La empresa no existe con este id: " + req.params.id,
          404
        )
      );
    }
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    next(
      new ErrorResponse(
        "La empresa no existe con este id: " + req.params.id,
        404
      )
    );
  }
};
