exports.validateEvent = (req, res, next) => {
  const { title, date, location } = req.body;

  if (!title || title.toString().trim() === "") {
    return res
      .status(400)
      .json({ status: "fail", message: "Field 'title' wajib diisi" });
  }

  if (!date || date.toString().trim() === "") {
    return res
      .status(400)
      .json({ status: "fail", message: "Field 'date' wajib diisi" });
  }

  if (!location || location.toString().trim() === "") {
    return res
      .status(400)
      .json({ status: "fail", message: "Field 'location' wajib diisi" });
  }

  // optional: simple date validity check (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res
      .status(400)
      .json({
        status: "fail",
        message: "Field 'date' harus berformat YYYY-MM-DD",
      });
  }

  next();
};
