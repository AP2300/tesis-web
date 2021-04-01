import axios from "axios";

export function EndSession() {

    axios.get("http://localhost:3001/logOut", {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })
        .then(res => {

            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        })
}

export async function LogIn(params){
  
    try{
      const res = axios.post('http://localhost:3001/login', params, {
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