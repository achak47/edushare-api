const useradds = (req,res,db,bcrypt)=>{
    const {email,book,desc,image,dep,contact1,contact2} = req.body ;
    if(!email||!dep||!book||!contact1)
    {
       if(!email)
       {
        return res.status(400).json('Pls enter your email id') ;
       }
       if(!book)
       {
        return res.status(400).json('Pls enter your password') ;
       }
       if(!dep)
       {
        return res.status(400).json('Oh! Pls enter the target department') ;
       }
       //if(!contact1)
       //{
       // return res.status(400).json('Oh! How shall the buyer contact you ? Pls enter your contact information') ; 
       //}
    }
 const id = email+book ;
 const hash = bcrypt.hashSync(id) ;
 db.select('*').from('ads')
 .where('id','=',id)
 .then(data=>{
   if(data.length == 0){
    db('ads').insert({
      email: email,
      book:book,
      desc:desc,
      image:image,
      dep:dep,
      contact1:contact1,
      contact2:contact2,
      id: id,
      price:req.body.price,
      name:req.body.name
    })
    .then(res.json('Ad placed Succesfully'))
    .catch(err => res.json('A problem occured in placing the ad'))
  }
  else{
    res.json('You have already placed this ad')
  }
  })
}
const postreply = (req,res,db)=>{
  db('replyad').insert({
    emailsender: req.body.emailsender,
    emailreceiver: req.body.emailreceiver,
    adid: req.body.adid,
    desc: req.body.desc,
    type: req.body.type,
    receiver: req.body.receiver,
    sender: req.body.sender,
    title:req.body.title
  }).then(data=>{
    res.json('Reply added succesfully')
  })
}
const replyads = (req,res,db)=>{
  db('replyad').insert({
    emailsender: req.body.emailsender,
    emailreceiver: req.body.emailreceiver,
    adid: req.body.adid,
    desc: req.body.desc,
    type: req.body.type,
    receiver: req.body.receiver,
    sender: req.body.sender,
    title:req.body.title
  }).then(data=>{
    console.log(req.body.content)
    db('replyad').where({title:req.body.content})
   .update({check:1})
   .then(user=>{
    res.json('Reply added succesfully')
  })
  })
}
const myreplies =(req,res,db)=>{
  db.select('*').from('replyad')
  .where('emailreceiver','=',req.body.email)
  .then(data=>{
    res.json(data) ;
  })
}
const updatereply=(req,res,db)=>{
  db('replyad').where({title:req.body.title,emailsender:req.body.emailsender,emailreceiver:req.body.emailreceiver})
   .update({desc:req.body.desc})
   .then(user=>{
    res.json('Reply updated succesfully')
  })
}
module.exports = {
    useradds : useradds,
    replyads:replyads,
    myreplies:myreplies,
    postreply:postreply,
    updatereply:updatereply
}