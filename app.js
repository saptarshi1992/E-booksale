
const express = require('express')
const key = require('./config/keys')
const path = require('path')
const stripe = require('stripe')(key.stripeSecretKey)
const bodyParser = require('body-parser')
const hbars= require('express-handlebars')
//const { stripePublishableKey } = require('./config/keys_prod')

const app = express()
//middlewar//

//handelbars middleware

app.engine('handlebars', hbars.engine({ 
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts'
 }));
//app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, 'views'))


//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))
//state static folder
app.use(express.static(`${__dirname}/public`))
//route::

//index Route::
app.get('/',(req,res)=>{
res.render('main',{
    layout: 'index',
    stripePublishableKey:key.stripePublishableKey
})
})

//charge Route::

app.post('/charge',(req,res)=>{
 const amount = 100
 stripe.customers.create({
    email:req.body.stripeEmail,
    source:req.body.stripeToken
 })
.then(customer => stripe.charges.create({
    amount,
    description: 'web developement Book',
    currency:'inr',
    customer:customer.id
}))
.then(charge => res.render('success',{layout: 'index'}))
})

//PORT::

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`app is connected in ${port}`)
})