import { Router } from "express";
import db from "../config/db.js";
import authMiddleware from "../middleware/auth.js";
import { movies } from "../data/movies.js";

const router = Router();

// GET SEATS (protected)
router.get("/seats", authMiddleware, (req, res) => {
  try {
    const seats = db.prepare(`
      SELECT s.id, s.isBooked, s.bookedBy, u.username
      FROM seats s
      LEFT JOIN users u ON s.bookedBy = u.id
      ORDER BY s.id
    `).all();

    res.json({ seats });
  } catch {
    res.status(500).json({ message: "Error fetching seats" });
  }
});

// BOOK SEAT (protected)
router.post("/book", authMiddleware, (req, res) => {
  const { seatId, movieId } = req.body;
  const userId = req.user.id;

  const movie = movies.find(m => m.id === movieId);
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  const already = db
    .prepare("SELECT id FROM bookings WHERE userId = ? AND movieId = ?")
    .get(userId, movieId);

  if (already) {
    return res.status(409).json({ message: "Already booked for this movie" });
  }

  const seat = db
    .prepare("SELECT * FROM seats WHERE id = ? AND isBooked = 0")
    .get(seatId);

  if (!seat) {
    return res.status(409).json({ message: "Seat not available" });
  }

  try {
    db.prepare("UPDATE seats SET isBooked = 1, bookedBy = ? WHERE id = ?")
      .run(userId, seatId);

    const result = db
      .prepare("INSERT INTO bookings (userId, seatId, movieId) VALUES (?, ?, ?)")
      .run(userId, seatId, movieId);

    res.status(201).json({
      message: "Seat booked",
      bookingId: result.lastInsertRowid,
    });
  } catch {
    res.status(500).json({ message: "Booking failed" });
  }
});

// MY BOOKINGS (protected)
router.get("/my", authMiddleware, (req, res) => {
  try {
    const bookings = db
      .prepare("SELECT * FROM bookings WHERE userId = ? ORDER BY id DESC")
      .all(req.user.id)
      .map(b => {
        const movie = movies.find(m => m.id === b.movieId);
        return {
          ...b,
          movieTitle: movie?.title || "Unknown",
          price: movie?.price || 0,
          moviePoster: movie?.posterImage || null,
          movieEmoji: "🎬",
        };
      });

    res.json({ bookings });
  } catch {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

export default router;