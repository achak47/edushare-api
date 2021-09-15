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
module.exports = {
    useradds : useradds
}