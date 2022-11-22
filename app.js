
const express = require('express')
const stripe = require('stripe')('sk_test_51H32d8DcLa5pUV8grTcV3vj3r7xK9Yac5iahH1Og1KQNtTmxXa1B753EHW9dK1YdzeKxdLrwWX6OkmXMLpLA1Jtn00KcrTAdN9')
const bodyParser = require('body-parser')
const handlebars= require('express-handlebars')

const app = express()

//handelbars middleware
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
//app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))
//state static folder
app.use(express.static(`${__dirname}/public`))
//index Route::
app.get('/',(req,res)=>{
res.render('index',{layout: false})
})

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`app is connected in ${port}`)
})