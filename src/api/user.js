import axios from "axios";
import * as Cons from "./constants";

export async function GetUserData() {
  try {
    const res = await axios.get(Cons.Home, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    return { res: res.data.data, success: true }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}

export async function GetGraphData() {
  try {
    const res = axios.get(Cons.Graph, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    return (await res).data.data
  } catch (e) {
    console.error(e)
  }
}

export async function GetHistoryData(){
  try{
    const res = axios.get(Cons.Search,{
      headers:{
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    return res
  }catch(e){
    console.error(e)
  }
}

