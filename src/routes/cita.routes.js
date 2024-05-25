import { Router } from "express";
import { prisma } from "../db.js";
import httpStatus from "http-status";
import formatDateAndTime from "../helpers/date-formated.helper.js";

const router = Router();

router.get('/', async (req, res) => {
    const citas = await prisma.cita.findMany();

    const formatedCita = citas.map(cita => {
        const { formattedDate, formattedTime } = formatDateAndTime(cita.date);

        return {
            ...cita,
            date: formattedDate,
            time: formattedTime
        };
    });

    res.status(200).json(formatedCita);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cita = await prisma.cita.findUnique({
        where: {
            id: id,
        },
    });

    if (!cita) {
        return res.status(httpStatus.NOT_FOUND).send();
    }

    const { formattedDate, formattedTime } = formatDateAndTime(cita.date);

    const formatedCita = {
        ...cita,
        date: formattedDate,
        time: formattedTime
    };


    res.status(httpStatus.OK).json(formatedCita);
});



router.post('/', async (req, res) => {
    const { name, reason, date, time } = req.body;

    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const fullDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const data = {
        name: name,
        reason: reason,
        date: fullDate,
    };

    try {
        const newCita = await prisma.cita.create({
            data: data,
        });
        res.status(201).json(newCita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;

    const { name, reason, date, time } = req.body;

    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const fullDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const data = {
        name: name,
        reason: reason,
        date: fullDate,
    };

    const cita = await prisma.cita.update({
        where: {
            id: id,
        },
        data: data,
    });
    res.status(httpStatus.OK).json(cita);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.cita.delete({
        where: {
            id: id,
        },
    });
    res.status(httpStatus.NO_CONTENT).send();
});

export default router;