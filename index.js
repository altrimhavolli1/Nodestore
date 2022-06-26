const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost:'

app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(PORT, () => console.log(`Server running on: ${HOST}${PORT}`))