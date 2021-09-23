const deletequery = (req,res,db)=>{
    const id = req.body.email + req.body.desc + req.body.type ;
    db('queries').where({id:id}).del().then(
       function(){
           console.log(id) ;
    res.json('This query is Succesfully deleted') ; 
       }) ;
    }
   module.exports = {
       deletequery:deletequery 
   }