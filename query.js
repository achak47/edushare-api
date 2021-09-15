const userqueries = (req,res,db)=>{
    if(!req.body.email||!req.body.dep||!req.body.contact1||!req.body.desc)
    {
       if(!req.body.email)
       {
        return res.status(400).json('Pls enter your email id') ;
       }
       if(!req.body.dep)
       {
        return res.status(400).json('Oh! Pls enter the target department') ;
       }
       if(!req.body.contact1)
       {
        return res.status(400).json('Oh! How shall we contact you ? Pls enter your contact information') ; 
       }
       if(!req.body.desc){
        return res.status(400).json('Pls Post your Question !') ;  
       }
    }
    db('queries').insert({
      email: req.body.email,
      type:req.body.type,
      desc:req.body.desc,
      dep:req.body.dep,
      contact1:req.body.contact1,
      contact2:req.body.contact2,
      name:req.body.name
    })
    .then(res.json('Your Query is Posted Succesfully !! Pls wait it will be solved by any student soon'))
    .catch(err => res.json('A problem occured in posting your Query'))
}
module.exports = {
    userqueries : userqueries
}