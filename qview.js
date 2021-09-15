const viewquery = (req,res,db)=> {
    db.select('*').from('queries')
   .then(user =>{
       res.json(user) ;
   })
   .catch(err => res.status(400).json('Error !!!'))
}
module.exports = {
    viewquery: viewquery
}