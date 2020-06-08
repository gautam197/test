const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


router.post('/users', auth, async(req, res) => {
    const user = new User(req.body)
    console.log(user);
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res)=>{
    try{

        const user = await User.findByData(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send()

    }
})



router.post('/users/logout', auth, async(req, res)=>{
    try {
        const logoutUser = req.user
        logoutUser.tokens = logoutUser.tokens.filter((token)=>{
            return token.token!== req.token
        })
        
        await logoutUser.save()
        res.send()
    } catch (e) {
        res.send(500).send()
        
    }
})

router.post('/users/logoutAll',auth, async(req, res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.get('/users/me',auth, async(req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res)=>{
    const updates= Object.keys(req.body)
    const allowedUpadtes =['name','age', 'email', 'password']
    const isValdOperation = updates.every((update)=> allowedUpadtes.includes(update))
    if(!isValdOperation){
        res.status(400).send({error: "Invalid Updates!!"})

    }
    try {
        updates.forEach((update)=>req.user[update]= req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()    }
})
router.delete('/users/me',auth, async(req, res)=>{

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }


})



module.exports = router