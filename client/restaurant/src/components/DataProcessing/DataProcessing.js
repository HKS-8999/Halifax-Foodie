// bucketName: process.env.REACT_APP_BUCKET_NAME,
// region: process.env.REACT_APP_REGION,
// accessKeyId: process.env.REACT_APP_ACCESS,
// secretAccessKey: process.env.REACT_APP_SECRET,
// sessionKey : process.env.REACT_APP_SESSION


import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;
const restaurantId = 'rest11'


AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
    sessionToken : process.env.REACT_APP_SESSION
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractFile, setExtractFile] = useState(null);


    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                console.log(process.env.REACT_APP_BUCKET_NAME)
                if (err) console.log(err)
            })
    }

    const keyIngredients = async(file) =>{
        debugger
        const filename = file.name.split('.')[0]
        await fetch("https://bsem5fueaedmv4tdlvn6zkcelq0kwuti.lambda-url.us-east-1.on.aws/" ,
        {
            method: "POST",
            body: JSON.stringify({
              restaurantId: restaurantId,
              filename : filename
            })
          })
          .then((res) => res.json()).then((res)=>{ 
            debugger
            if(res.status){
                console.log(res.status)
                alert(res.message)
            }
            else{
                alert("Host down extractinh")
            }
          })
          }

    return (<div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        <button onClick={() => keyIngredients(selectedFile)}> Extract Key Data</button>
         </div>)
}

export default UploadImageToS3WithNativeSdk;