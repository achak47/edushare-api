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
const del = require('./delete') ;
const report = require('./report') ;
const update = require('./update') ;
const knex = require('knex') ;
const port = 3001 ;
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
app.post('/deletequery',(req,res)=>{ del.deletequery(req,res,db)}) 
app.post('/update',(req,res)=>{update.updatefile(req,res,db)})
app.post('/retrieve',(req,res)=>{update.getfile(req,res,db)})
app.post('/myres',(req,res)=>{update.getUserfile(req,res,db)})
app.post('/deleteres',(req,res)=>{ del.deleteres(req,res,db)}) 
app.post('/report',(req,res)=>{report.postreport(req,res,db)})
app.post('/checkreport',(req,res)=>{report.checkreport(req,res,db)})
app.post('/delreport',(req,res)=>{del.deletereport(req,res,db)})
app.post('/checkin',(req,res)=>{report.oncheckin(req,res,db)})
app.post('/answer',(req,res)=>{ queries.answer(req,res,db)})
app.post('/retanswer',(req,res)=>{ queries.retanswer(req,res,db)}) 
app.post('/delanswer',(req,res)=>{ del.delanswer(req,res,db)}) 
app.post('/myanswer',(req,res)=>{ queries.myanswer(req,res,db)}) 
app.post('/getquestion',(req,res)=>{ queries.getquestion(req,res,db)}) 
app.post('/replyad',(req,res)=>{adds.replyads(req,res,db)})
app.post('/myreplies',(req,res)=>{adds.myreplies(req,res,db)})
app.post('/delreply',(req,res)=>{ del.delreply(req,res,db)}) 
app.post('/postreply',(req,res)=>{adds.postreply(req,res,db)})
app.post('/updatereply',(req,res)=>{adds.updatereply(req,res,db)})
app.listen(port||process.env.PORT , ()=> {
    console.log("App is running") ;
  })