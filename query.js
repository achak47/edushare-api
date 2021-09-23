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
    const id = req.body.email + req.body.desc  ;
    db.select('*').from('queries')
    .where('email','=',req.body.email).then(user=>{
    if(user.length<10){
    db.select('*').from('queries')
    .where('desc','=',req.body.desc).then(data=>{
      if(data.length == 0){
    db('queries').insert({
      email: req.body.email,
      desc:req.body.desc,
      dep:req.body.dep,
      contact1:req.body.contact1,
      contact2:req.body.contact2,
      name:req.body.name,
      id:id
    })
    .then(res.json('Your Query is Posted Succesfully !! Pls wait it will be solved by any student soon'))
  }
  else{
    res.json('This question already exists , Go to the student forum and search')
  }
  })
}
else{
  res.json('You have reached the maximum limit of queries , either delete some or wait for some time ')
}
})
    .catch(err => res.json('A problem occured in posting your Query'))
}

const answer =(req,res,db)=>{
  db.select('*').from('answers')
  .where('content','=',req.body.content)
  .then(user=>{
   if(user.length == 0){
  db('answers').insert({
    id:req.body.id,
    author:req.body.author,
    content:req.body.content,
    dep:req.body.dep,
    year:req.body.year,
    email:req.body.email
  })
  .then(data=>{
    res.json('Answer posted Succesfully !')
  })
}
else{
  res.json('Such an answer already exists') 
}
}).catch(err => res.json('A problem occured in posting your Answer'))
}
const retanswer=(req,res,db)=>{
  db.select('*').from('answers')
  .where('id','=',req.body.id)
  .then(data=>{
    res.json(data) ;
  })
}
const myanswer=(req,res,db)=>{
  db.select('*').from('answers')
  .where('email','=',req.body.email)
  .then(data=>{
    res.json(data) ;
  })
}
const getquestion=(req,res,db)=>{
  console.log(req.body.id)
  db.select('*').from('queries')
  .where('id','=',req.body.id)
  .then(data=>{
    if(data.length){
    res.json(data[0].desc) ;
    console.log("Data is" + data[0].desc) ;
    }
    else{
      res.json('Question is deleted')
    }
  })
}
module.exports = {
    userqueries : userqueries,
    answer : answer,
    retanswer:retanswer,
    myanswer:myanswer,
    getquestion:getquestion
}