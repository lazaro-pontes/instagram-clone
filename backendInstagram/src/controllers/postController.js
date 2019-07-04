const Post = require('../models/post')
const jimp = require('jimp')
const path = require('path')
const fs = require('fs')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')

        return res.json(posts)
    },
    async store(req, res){
        const {author, place, description, hashtags} = req.body
        const {filename: image} = req.file
        
        let jimpImg = await jimp.read(req.file.path)

        jimpImg.resize(500, 500)
            .quality(60)
            .write(
                path.resolve(req.file.destination, 'resized', image)
            )
        fs.unlinkSync(req.file.path)

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        })

        req.io.emit('post', post)

        return res.json(post)
    }
}