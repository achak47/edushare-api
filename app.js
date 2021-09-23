const app = (req,res,db)=>{
const {google} = require('googleapis') ;
const path = require('path') ;
const fs = require('fs') ;
const CLIENT_ID = '171024582376-s8veu9qpcld4u8nl6ognb3osbn8bllv1.apps.googleusercontent.com' ;
const CLIENT_SECRET = 'QJPu59sJgarzCAZ408vdF30d' ;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground' ;
const REFRESH_TOKEN = '1//040_56g2iKGuLCgYIARAAGAQSNwF-L9IrXJrl6_Yle9mGrVf4AVD8AQLZfBjk_VxXPgX5gdXQ0DcA4SEgr8b_4Iq_9JjnEC1UB0M' ;
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})
const filepath = path.join(__dirname,'blue grad.png') ;

    try{
         const response = drive.files.create({
            requestBody: {
                name:'testupload.png',
                mimeType: 'image/png'
            } ,
            media:{
                mimeType: 'image/png' ,
                body: fs.createReadStream(filepath)  
            }
         })
         console.log(response.data) ;
    } catch(error){
        console.log(error.message) ;
        return res.status(400).json(error.message) ;  
    }
// async function deleteFile(){
//     try{
//        const response = await drive.files.delete({
//            fileId:''
//        });
//     }
//     catch{
//         console.log(error.message) ;
//     }
// }
    try{
       const fileId = '1YqwrBw6o_-MEUffIuoBNRKJ1jG7JwaUd' ;
         drive.permissions.create({
          fileId: fileId ,
          requestBody:{
              role:'reader',
              type:'anyone'
          }
       }) ;
       const result = drive.files.get({
           fileId: fileId,
           fields: 'webViewLink, webContentLink' 
       }) ;
       console.log(result.data) ;
       res.json(result.data) ;
    }
    catch{
        console.log(error.message) ;
        return res.status(400).json(error.message) ;
    }
}
module.exports = {
    app:app
}