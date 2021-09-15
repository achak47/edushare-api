var express = require('express') ;
var app = express() ;
const signin = require('./signin') ;
const register = require('./register') ;
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const adds = require('./adds') ;
const queries = require('./query') ;
const adview = require('./adview') ;
const queryview = require('./qview') ;
const del = require('./deletead') ;
const knex = require('knex') ;
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Anurag12#',
      database : 'edushare'
    }
  });
  db.select('*').from('users').then(data=>console.log(data)) ;
  app.use(express.json()) ;
  app.use(cors()) ;
  app.get('/' , (req,res)=>{
    res.json('Hello World') ;
})
// app.post('/signin' , (req,res)=>{
//   db.select('email' , 'hash').from('login')
//   .where('email', '=', req.body.email)
//   .then( data=>{
//     const isvalid = bcrypt.compareSync(req.body.password , data[0].hash) ;
//     if(isvalid){
//       db.select('*').from('users')
//     .where('email' , '=', req.body.email)
//    .then(user =>{
//        res.json(user[0]) ;
//        console.log(user) ;
//    })
//    .catch(err => res.status(400).json('Unable to get user'))
//     }
//     else{
//      res.status(400).json('No user found') ;
//     }
//   })
//   .catch(err => res.status(400).json(err))
// } ) 
app.post('/signin' , (req,res)=>{ signin.usersignin(req,res,bcrypt,db)} ) 
app.post('/register',(req,res)=>{ register.registeruser(req,res,bcrypt,db)}) 
app.post('/adds',(req,res)=>{ adds.useradds(req,res,db,bcrypt)}) 
app.get('/adview',(req,res)=>{ adview.viewad(req,res,db)}) 
app.post('/deletead',(req,res)=>{ del.deletead(req,res,db,bcrypt)}) 
app.post('/queries',(req,res)=>{ queries.userqueries(req,res,db)}) 
app.get('/queryview',(req,res)=>{ queryview.viewquery(req,res,db)}) 
app.listen(3001 , ()=> {
    console.log("App is running") ;
  })