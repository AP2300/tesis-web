import axios from "axios";
import * as Cons from "./constants";

export async function EndSession() {

    axios.get("http://localhost:3001/logOut", {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
        .then(res => {
            console.log("hola");
            return res;
        })
        .catch(err => {
            console.error(err);
            console.log("hola que paso")
            // return false;
        })
}

export async function LogIn(params){
  
    try{
      const res = axios.post(Cons.LogIn, params, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    return res;
    }catch(e){
      console.error(e)
    }
  }