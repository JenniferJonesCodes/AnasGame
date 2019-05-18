/*This is for testing the Phaser game locally. This will be edited implemented with Kentico. 
 * Created by: Analilia Fierro
 * */

const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(1337, function () {
    console.log('Listening on port 1337!')
})
