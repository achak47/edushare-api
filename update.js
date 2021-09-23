const updatefile = (req,res,db)=>{
    db('resources').insert({
        email : req.body.email ,
        folder : req.body.folder,
        link : req.body.url,
        file: req.body.file
    }).then(console.log('Uploaded'))
    .catch(err => console.log(err))
    res.json('Uploaded')
}
const getfile = (req,res,db)=>{
 db.select('*').from('resources')
 .where('folder','=',req.body.folder)
 .then(user=>{
     res.json(user) ;
 }).catch(err => res.status(400).json(err))
}
const getUserfile = (req,res,db)=>{
    db.select('*').from('resources')
 .where('email','=',req.body.email) 
 .then(user=>{
    res.json(user) ; 
 }).catch(err => res.status(400).json('Couldn not Find your upload'))
}
module.exports = {
   updatefile:updatefile ,
   getfile:getfile,
   getUserfile:getUserfile
}