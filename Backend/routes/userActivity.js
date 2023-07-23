const express = require('express')
const router = express.Router();
const Data = require('../modals/userdata')
const fetchuser = require('../middleware/fetchuser')

router.get('/get-data',fetchuser,async(req,res)=>{
    try {
        const data = await Data.find({ user: req.user.id });
        res.json(data)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
   
})
router.post('/add-favsongs',fetchuser,async(req,res)=>{
    try {
        const {FavSongs, SongId} = req.body;

        const existingData = await Data.findOne({ user: req.user.id });

        if (existingData) {
            existingData.FavSongs.push({ song:FavSongs,SongId });
            const updatedData = await existingData.save();
            res.json({ updatedData });
        }

        else {
            // If the user doesn't have a document yet, create a new one and save the song
            const newData = new Data({ user: req.user.id, FavSongs: [{ song:FavSongs ,SongId}] });
            const savedData = await newData.save();
            res.json({ savedData });
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
   
})
router.post('/add-favArtist',fetchuser,async(req,res)=>{
    try {
        const {FavArtists, ArtistId} = req.body;

        const existingData = await Data.findOne({ user: req.user.id });

        if (existingData) {
            existingData.FavArtists.push({ artist:FavArtists ,ArtistId});
            const updatedData = await existingData.save();
            res.json({ updatedData });
        }

        else {
            // If the user doesn't have a document yet, create a new one and save the song
            const newData = new Data({ user: req.user.id, FavArtists: [{ artist:FavArtists,ArtistId }] });
            const savedData = await newData.save();
            res.json({ savedData });
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
   
})
router.post('/add-history',fetchuser,async(req,res)=>{
    try {
        const {histories, SongId} = req.body;

        const existingData = await Data.findOne({ user: req.user.id });

        if (existingData) {
            existingData.histories.push({ histery:histories, SongId });
            const updatedData = await existingData.save();
            res.json({ updatedData });
        }

        else {
            // If the user doesn't have a document yet, create a new one and save the song
            const newData = new Data({ user: req.user.id, histories: [{ histery:histories, SongId }] });
            const savedData = await newData.save();
            res.json({ savedData });
        }
    } catch (error) {
        res.send(error)
        console.log(error)
    }
   
})
router.delete('/delete-favsong/:songId', fetchuser, async (req, res) => {
    try {
        const songIdToDelete = req.params.songId;
        const existingData = await Data.findOne({ user: req.user.id });

        if (!existingData) {
            return res.status(404).json({ error: "User's data not found" });
        }

        existingData.FavSongs = existingData.FavSongs.filter(song => song.SongId !== songIdToDelete);
        await existingData.save();

        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
});
router.delete('/delete-all-favsong', fetchuser, async (req, res) => {
    try {
        const existingData = await Data.findOne({ user: req.user.id });

        if (!existingData) {
            return res.status(404).json({ error: "User's data not found" });
        }

        existingData.FavSongs = [];
        await existingData.save();

        res.json({ message: 'All Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
});
router.delete('/delete-artist/:artistid', fetchuser, async (req, res) => {
    try {
        const ArtistIdToDelete = req.params.artistid;
        const existingData = await Data.findOne({ user: req.user.id });

        if (!existingData) {
            return res.status(404).json({ error: "User's data not found" });
        }

        existingData.FavArtists = existingData.FavArtists.filter(artist => artist.ArtistId !== ArtistIdToDelete);
        await existingData.save();

        res.json({ message: 'FavArtists deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
});
router.delete('/delete-all-artist', fetchuser, async (req, res) => {
    try {
        const existingData = await Data.findOne({ user: req.user.id });

        if (!existingData) {
            return res.status(404).json({ error: "User's data not found" });
        }

        existingData.FavArtists = [];
        await existingData.save();

        res.json({ message: 'All FavArtists deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
});
router.delete('/delete-history/:songId', fetchuser, async (req, res) => {
    try {
        const songIdToDelete = req.params.songId;
        const existingData = await Data.findOne({ user: req.user.id });

        if (!existingData) {
            return res.status(404).json({ error: "User's data not found" });
        }

        existingData.histories = existingData.histories.filter(song => song.SongId !== songIdToDelete);
        await existingData.save();

        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
});
router.delete('/delete-all-history', fetchuser, async (req, res) => {
    try {
        const existingData = await Data.findOne({ user: req.user.id });

        if (!existingData) {
            return res.status(404).json({ error: "User's data not found" });
        }

        existingData.histories = [];
        await existingData.save();

        res.json({ message: 'All Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error);
    }
});

module.exports = router