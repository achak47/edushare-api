const registeruser = (req,res,bcrypt,db)=>{
    const { email,name,password,dep,year } = req.body ;  //Destructuring
    if(!email||!name||!password)
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
    }
   // const hash = bcrypt.hashSync(password) ;
    // A transaction is used as a codeblock to ensure if one request fails then the other must also fail , as otherwise it would lead to unambiguity
   // We create a transaction when we have to do more than one things at one go
   const hash = bcrypt.hashSync(password) ;
   db('login').insert({
     hash:hash,
     email:email
   }).then(console.log('Enterred into the login table'))
   db('users').insert({
       email : email ,
       Name : name ,
       Department: dep,
       Year: year
   }).then(console.log('DONE'))
   res.json('Registered') ;
}  

module.exports = {
    registeruser : registeruser
}