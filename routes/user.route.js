const express = require('express');

const { userModel } = require("../models");

const router = express.Router();

router.get("/user", async (req, res) => {
    const dataUser = await userModel.findAll();

    return res.status(200)
        .json({
            message: "Berhasil mendapatkan semua data user.",
            data: dataUser,
        });
});

router.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    const dataUser = await userModel.findOne({
        where: {
            id: id,
        },
    });

    if (!dataUser) {
        return res.status(404)
            .json({
                message: "Data user tidak ditemukan.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil mendapatkan data user",
            data: dataUser,
        });
});

router.post("/user", async (req, res) => {
    const { name, location, sensor_spesification, gps_location_latitude, gps_location_longitude, device_notification } = req.body;

    const createUser = await userModel.create({
        name: name,
        location: location,
        sensor_spesification: sensor_spesification,
        gps_location_latitude: gps_location_latitude,
        gps_location_longitude: gps_location_longitude,
        device_notification: device_notification

    });

    if (!createUser) {
        return res.status(400)
            .json({
                message: "Gagal menambahkan data user.",
                data: {},
            });
    }

    return res.status(201)
        .json({
            message: "Berhasil menambahkan data user.",
            data: createUser,
        });
})

router.put("/user/:id", async (req, res) => {
    const id = req.params.id;

    const { name, location, sensor_spesification, gps_location_latitude, gps_location_longitude, device_notification } = req.body;

    const updateUser = await userModel.update({
        name: name,
        location: location,
        sensor_spesification: sensor_spesification,
        gps_location_latitude: gps_location_latitude,
        gps_location_longitude: gps_location_longitude,
        device_notification: device_notification
    }, {
        where: {
            id: id,
        },
    });

    if (!updateUser) {
        return res.status(400)
            .json({
                message: "Gagal mengubah data user.",
                data: {},
            });
    }

    const dataUser = await userModel.findOne({
        where: {
            id: id,
        },
    });

    return res.status(200)
        .json({
            message: "Berhasil mengubah data user.",
            data: dataUser,
        });
});

router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;

    const deletUser = await userModel.destroy({
        where: {
            id: id,
        },
    });

    if (!deletUser) {
        return res.status(400)
            .json({
                message: "Gagal menghapus data user.",
                data: {},
            });
    }

    return res.status(200)
        .json({
            message: "Berhasil menghapus data user.",
            data: {},
        });
});

module.exports = router;