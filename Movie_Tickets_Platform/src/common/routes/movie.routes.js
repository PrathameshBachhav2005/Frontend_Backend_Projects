import { Router } from "express";
import { movies } from "../data/movies.js";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    count: movies.length,
    movies,
  });
});

router.get("/:id", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found.",
    });
  }

  return res.status(200).json({ success: true, movie });
});

export default router;
