import { Router } from "express";
import { prisma } from "../db.js";
import httpStatus from "http-status";
import formatDateAndTime from "../helpers/date-formated.helper.js";

const router = Router();

router.post('/select-partido', async (req, res) => {
    const data = req.body;

    try {
        const partidoSeleccionado = await prisma.votante.create({
            data: data,
        });
        res.status(201).json(partidoSeleccionado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;