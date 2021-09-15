const deletead = (req,res,db,bcrypt)=>{
 const id = req.body.email + req.body.book ;
 db('ads').where({id:id}).del().then(
    function(){
 res.json(req.body.book +' is Succesfully deleted') ; 
    }) ;
 }
module.exports = {
    deletead:deletead  
}