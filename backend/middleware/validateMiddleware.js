const validateRequiredFields = (fields = []) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field].toString().trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} is required.`,
        });
      }
    }

    next();
  };
};

export { validateRequiredFields };