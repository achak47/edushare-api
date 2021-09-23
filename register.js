const registeruser = (req,res,bcrypt,db)=>{
   
    const { email,name,password,dep,year,roll } = req.body ;  //Destructuring
    if(!email||!name||!password||!roll)
    {
       if(!email)
       {
        return res.status(400).json('Pls enter your email id') ;
       }
       if(!password)
       {
        return res.status(400).json('Pls enter your password') ;
       }
       if(!name)
       {
        return res.status(400).json('Oh! What shall we call you ? Pls enter your name') ;
       }
       if(!roll)
       {
        return res.status(400).json('Pls Enter Your Roll Number') ;
       }
    }
   // const hash = bcrypt.hashSync(password) ;
    // A transaction is used as a codeblock to ensure if one request fails then the other must also fail , as otherwise it would lead to unambiguity
   // We create a transaction when we have to do more than one things at one go
  let isvalid = 1 ;
  db.select('*').from('users')
  .where('roll' , '=', roll)
  .then(u =>{
    if(u.length > 0)
      { isvalid = 0 ; }  
    if(isvalid){  
   db.select('*').from('users')
    .where('email' , '=', email)
   .then(user =>{
      if(user.length > 0)
      { isvalid = 0 ; }   
      console.log(user)
   if(isvalid == 1){
   const hash = bcrypt.hashSync(password) ;
   db('login').insert({
     hash:hash,
     email:email,
     roll:roll
   }).then(console.log('Enterred into the login table'))
   db('users').insert({
       email : email ,
       Name : name ,
       Department: dep,
       Year: year,
       roll:roll
   }).then(res.json('Registered') )
}
else{
    res.json('This Email id is already registered !')
}
} )}
else{
    res.json('This Roll number is already registered !')
}
})
}
module.exports = {
    registeruser : registeruser
}