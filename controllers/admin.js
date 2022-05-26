const ErrorResponse = require("../helper/errorResponse");

exports.getRutaProtegida = async (req, res, next) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.userId
        }
    })
  };