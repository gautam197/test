const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Polygon = require('../models/polygon')
const User = require('../models/user')

router.post('/geocoder', async(req, res)=>{
    const polygon = new Polygon(req.body)
    try{
        await polygon.save()
        res.status(201).send(polygon)
    } catch(e){
        res.status(400).send(e)
    }
})
router.get('/geocoder/check/:id', async(req, res)=>{
    const polygon  = Polygon.findById( req.params.id)
    if(!polygon){
        return res.status(400).send()
    } 
    const longitude = req.query.longitude
    const latitude = req.query.latitude
    //console.log(longitude, latitude)
    
    try {
        const check = await Polygon.findByCoordinate([latitude, longitude], req.params.id)
        res.send("Coordinate located inside a polygon")
    } catch (error) {
        res.status(401).send("Coordinates doesnt fall inside polygon")
    }


})
module.exports = router