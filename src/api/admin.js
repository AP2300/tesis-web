import axios from "axios";
import * as Cons from "./constants";

export async function AdminDataUpdate(params){
    try{
        const res = axios.post(Cons.AdminDataUpdate, params, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          })
        if ((await res).status === 200) {
            return res
          } else {
            return false
          }

    }catch(e){
        console.error(e)
    }
}


export async function AdminPassUpdate(params){
    try{
        const res = axios.post(Cons.AdminPassUpdate, params, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          })
        if ((await res).status === 200) {
            return res
          } else {
            return false
          }

    }catch(e){
        console.error(e)
    }
}

export async function CreateUser(params){
  try{
    const res = axios.post(Cons.Register,params, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    if ((await res).status === 200) {
      return res
    } else {
      return false
    }
  }catch(e){
    console.error(e)
  }
}