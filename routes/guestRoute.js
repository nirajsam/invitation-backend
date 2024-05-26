const express = require('express');
const Guest = require('../models/guestModel');
const router = express.Router();

router.get("/getGuests", async (req, res) => {
    try {
        const getGuests = await Guest.find({});
        res.send(getGuests);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/guestDetail', async (req, res) => {
    const { name, address, acceptOrDecline, memberCount, availabilityDates, familyType,attendedMemberCount } = req.body;

    // Create an update object with only the fields that are provided
    const updateFields = {};
    if (acceptOrDecline !== undefined) updateFields.acceptOrDecline = acceptOrDecline;
    if (memberCount !== undefined) updateFields.memberCount = memberCount;
    if (availabilityDates !== undefined) updateFields.availabilityDates = availabilityDates;
    if (familyType !== undefined) updateFields.familyType = familyType;
    if (attendedMemberCount !== undefined) updateFields.attendedMemberCount = attendedMemberCount;

    try {
        const updatedGuest = await Guest.findOneAndUpdate(
            { name, address },
            { $set: updateFields },
            { new: true, upsert: true }
        );

        if (updatedGuest) {
            res.send({
                _id: updatedGuest.id
            });
        } else {
            res.status(401).send({ msg: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

module.exports = router;
