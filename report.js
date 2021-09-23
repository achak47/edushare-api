const postreport = (req,res,db)=>{
    var d = new Date();
    let date = ("0" + d.getDate()).slice(-2);
  
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  
  let year = d.getFullYear();
  
  let hours = d.getHours();
  
  let minutes = d.getMinutes();
  
  let seconds = d.getSeconds();
  var n = year+'/'+month+'/'+date ;
  var t = hours+':'+minutes+':'+seconds ;
  db.select('*').from('report')
  .where('email','=',req.body.email)
  .then(user=>{
    if(user.length<10){
    db.select('*').from('resources')
    .where('link','=',req.body.link)
    .then(data=>{
        db('report').insert({
            email: req.body.email,
            desc:  req.body.desc,
            name:  req.body.name,
            link:  req.body.link,
            reportemail: req.body.reportemail,
            file:data[0].file,
            folder: data[0].folder,
            date:n,
            time:t
        }).then(res.json('Reported Succesfully'))
        }) 
    }
    else{
        res.json('You have reached the maximum limit for report , Wait for some time until they are resolved by the Admin')
    }
    })
}
const checkreport = (req,res,db)=>{
    db.select('*').from('report')
    .where('reportemail','=',req.body.email)
    .then(user=>{
        console.log(user)
        res.json(user)
    })
}
const oncheckin = (req,res,db)=>{
   db('report').where({link:req.body.link})
   .update({check:1})
   .then(user=>{
    res.json(user)
})
}
module.exports = {
    postreport:postreport,
    checkreport:checkreport,
    oncheckin:oncheckin
 }