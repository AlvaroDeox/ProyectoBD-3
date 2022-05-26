const ofertaLaboralSchema = require("../models/OfertaLaboral");
const ErrorResponse = require("../helper/errorResponse");
const OfertaLaboral = require("../models/OfertaLaboral");

exports.getOfertasLaborales = async (req, res, next) => {
  try {
    const ofertaLaboralLista = await ofertaLaboralSchema.find();
    res.status(200).json(ofertaLaboralLista);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 404)
    );
  }
};
exports.getOfertaLaboralById = async (req, res, next) => {
  try {
    const ofertaLaboralUnique = await ofertaLaboralSchema.findById(
      req.params.id
    );

    if (!ofertaLaboralUnique) {
      return next(new ErrorResponse("No se pudo encontrar libro", 404));
    }

    res.status(200).json(ofertaLaboralUnique);
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 404)
    );
  }
};
exports.crearOfertaLaboral = async (req, res, next) => {
  try {
    const ofertaLaboralUnique = await ofertaLaboralSchema.create(req.body);

    res.status(200).json({
      status: 200,
      data: ofertaLaboralUnique,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 404)
    );
  }
};
exports.updateOfertaLaboral = async (req, res, next) => {
  try {
    const ofertaLaboralUnique = await ofertaLaboralSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(200).json({
      status: 200,
      data: ofertaLaboralUnique,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 404)
    );
  }
};
exports.deleteOfertaLaboral = async (req, res, next) => {
  try {
    const ofertaLaboralUnique = await ofertaLaboralSchema.findByIdAndDelete(
      req.params.id
    );

    if (!ofertaLaboralUnique) {
      return next(new ErrorResponse("No existe el libro", 400));
    }

    res.status(200).json({
      status: 200,
      data: ofertaLaboralUnique,
    });
  } catch (err) {
    next(
      new ErrorResponse("No se pudo procesar el request" + err.message, 404)
    );
  }
};

exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterValor = "";
    let filterPropiedad = "";
    let ofertasLaborales = [];

    let totalRows = 0;

    if (req.body.filterValue) {
      filterValor = req.body.filterValue.valor;
      filterPropiedad = req.body.filterValue.propiedad;
      ofertasLaborales = await OfertaLaboral.find({
        [filterPropiedad]: new RegExp(filterValor, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await OfertaLaboral.find({
        [filterPropiedad]: new RegExp(filterValor, "i"),
      }).count();


    } else {
      ofertasLaborales = await OfertaLaboral.find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await OfertaLaboral.find().count();
    }
    const pagesQuantity=Math.ceil(totalRows/pageSize);
    res.status(200).json({
        status:200,
        pageSize,
        page,
        sort,
        sortDirection,
        pagesQuantity,
        totalRows,
        data:ofertasLaborales
    })


  } catch (err) {
    next(
        new ErrorResponse("No se pudo procesar el request" + err.message, 404)
      );
  }
};
