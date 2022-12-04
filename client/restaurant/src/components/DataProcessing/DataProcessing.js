import React ,{useState} from 'react';
import AWS from 'aws-sdk'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;
const restaurantId = 'test@dal.ca'


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
    const navigate = useNavigate();


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
            if(res.status){
                console.log(res.status)
                return(
                    <div class = "div3">
                        <h3>{res.status}</h3>
                        alert({res.status})
                    </div>
                )
            }
            else{
                alert("Host down extractinh")
            }
          })
          }

    return (<div>
        <div> Upload Progress : {progress}%</div>
        <p>
        <input type="file" onChange={handleFileInput}/>
        </p>
        
        <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => uploadFile(selectedFile)}>Upload Recipe</Button>
            <Button variant="contained" onClick={() => keyIngredients(selectedFile)}>
            Extract Key Data            
            </Button>
            <Button  variant="contained" onClick={() => navigate('/') }> 
            Back to Home
            </Button>

        </Stack>
        <div class = "div3"></div>
         </div>)
}

export default UploadImageToS3WithNativeSdk;