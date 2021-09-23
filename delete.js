const deletead = (req,res,db,bcrypt)=>{
 const id = req.body.email + req.body.book ;
 db('ads').where({id:id}).del().then(
    function(){
 res.json(req.body.book +' is Succesfully deleted') ; 
    }) ;
 }
 const deletequery = (req,res,db)=>{
   const id = req.body.email + req.body.desc ;
   db('queries').where({id:id}).del().then(
      function(){
          console.log(id) ;
   res.json('This query is Succesfully deleted') ; 
      }) ;
   }
const deleteres = (req,res,db)=>{
   db('resources').where({link:req.body.link}).del().then(
     function(){
        res.json('File deleted succesfully !')
     } 
   )
}
const deletereport =(req,res,db)=>{
   db('report').where({link:req.body.link}).del().then(
      function(){
         res.json('File deleted succesfully !')
      } 
    )
}
const delanswer=(req,res,db)=>{
   db('answers').where({id:req.body.id}).del().then(
      function(){
   res.json('This query is Succesfully deleted') ; 
      }) ;
   }
const delreply=(req,res,db)=>{
   db('replyad').where({emailsender:req.body.emailsender,emailreceiver:req.body.emailreceiver,desc:req.body.desc})
   .del().then(
      function(){
         res.json('Succesfully Deleted !') ;
      })
}
module.exports = {
    deletead:deletead ,
    deletequery:deletequery,
    deleteres:deleteres,
    deletereport:deletereport,
    delanswer:delanswer,
    delreply:delreply  
}