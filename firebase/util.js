import {db} from './setup.js';
import { collection, addDoc,deleteDoc,doc,setDoc,updateDoc } from "firebase/firestore";

async function add(colname,item){
    try{
        const docRef = await addDoc(collection(db, colname), item);
        console.log("Document written with ID: ", docRef.id);
    }catch(e){
        console.log(e);
    }
}
async function remove(id){
    try{
        const docRef=await deleteDoc(doc(db,"cal",id))
    }
    catch(e){
        console.log(e)
    }
}

export {add,remove}