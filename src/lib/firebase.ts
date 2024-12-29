// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, StorageError, uploadBytesResumable, UploadTaskSnapshot} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAfuQdGR6YPimpCkvFG807FQggAU5iN7I",
  authDomain: "githubanalyzer-337b9.firebaseapp.com",
  projectId: "githubanalyzer-337b9",
  storageBucket: "githubanalyzer-337b9.firebasestorage.app",
  messagingSenderId: "523935460505",
  appId: "1:523935460505:web:b332782e780fc1515d5c08",
  measurementId: "G-EL6BXEQK8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export async function uploadFile(file:File,setProgress?:(progress:number)=>void) {
    return new Promise((resolve,reject)=>{
        try {
            const storageRef = ref(storage,file.name);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on('state_changed',(snapshot:UploadTaskSnapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                if (setProgress) setProgress(progress)

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('uploading paused.')
                            break;
                        case 'running':
                            console.log('upload is running.')
                    }
            },(error:StorageError)=>{
                reject(error)
            },() => {
               getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
                resolve(downloadUrl)
               })
            })

        } catch(error) {
            console.error(error)
            reject(error)
        }
    })
}