const usersignin = (req,res,bcrypt,db) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).json('Wrong Password , Pls re-enter your password') ;
  }
    db.select('*').from('login')
   .where('email', '=', req.body.email)
   .then( data => {
   const isvalid = bcrypt.compareSync(req.body.password , data[0].hash) ;
   if(isvalid)
   {
    if(data[0].allowed){
      console.log(data[0].allowed)
    db.select('*').from('users')
    .where('email' , '=', req.body.email)
   .then(user =>{
       res.json(user[0]) ;
   })
   .catch(err => res.status(400).json('Unable to get user'))
  }
  else{
    console.log(data[0])
    res.json('You are temporarily banned for few days by the admin for either violating upload policy or report policy')
  }
 }
 else{
   res.status(400).json('Wrong Password , Pls re-enter your password') ; 
 }
  })
  .catch(err => res.status(400).json(err))
}
module.exports = {
    usersignin : usersignin
}