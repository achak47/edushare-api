
const viewad = (req,res,db)=> {
    db.select('*').from('ads')
   .then(user =>{
       console.log(req.body.dep)
       res.json(user) ;
   })
   .catch(err => res.status(400).json('Error !!!'))
}
module.exports = {
    viewad: viewad 
}