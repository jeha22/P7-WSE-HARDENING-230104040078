const fs = require("fs");
const path = require("path");

// Gunakan path absolut supaya tidak salah direktori
const dataPath = path.resolve(__dirname, "../data/events.json");

// Fungsi baca file JSON
function readData() {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, "[]", "utf8");
    }
    const raw = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("❌ Gagal membaca data:", error.message);
    return []; // supaya tidak error 500
  }
}

// Fungsi tulis file JSON
function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("❌ Gagal menulis data:", error.message);
  }
}

// GET /api/events
exports.getAllEvents = (req, res) => {
  try {
    const events = readData();
    res.status(200).json({ status: "success", data: events });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// GET /api/events/:id
exports.getEventById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const events = readData();
    const event = events.find((e) => e.id === id);

    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event tidak ditemukan" });
    }
    res.status(200).json({ status: "success", data: event });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// POST /api/events
exports.createEvent = (req, res) => {
  try {
    const { title, date, location } = req.body;

    if (!title || !date || !location) {
      return res
        .status(400)
        .json({ status: "fail", message: "Semua field wajib diisi" });
    }

    const events = readData();
    const newId = events.length ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const newEvent = { id: newId, title, date, location };

    events.push(newEvent);
    writeData(events);

    res.status(201).json({ status: "success", data: newEvent });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT /api/events/:id
exports.updateEvent = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, date, location } = req.body;

    if (!title || !date || !location) {
      return res
        .status(400)
        .json({ status: "fail", message: "Semua field wajib diisi" });
    }

    const events = readData();
    const idx = events.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event tidak ditemukan" });
    }

    events[idx] = { id, title, date, location };
    writeData(events);

    res.status(200).json({ status: "success", data: events[idx] });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// DELETE /api/events/:id
exports.deleteEvent = (req, res) => {
  try {
    const id = Number(req.params.id);
    const events = readData();
    const idx = events.findIndex((e) => e.id === id);

    if (idx === -1) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event tidak ditemukan" });
    }

    events.splice(idx, 1);
    writeData(events);

    res
      .status(200)
      .json({ status: "success", message: "Event berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
