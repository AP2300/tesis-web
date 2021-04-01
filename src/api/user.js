import axios from "axios";
import * as Cons from "./constants";

export async function GetUserData(){
  try{
    const request = await axios.get(Cons.Home,  {
      headers: {
          'Content-Type': 'application/json',    
      },
      withCredentials: true
  })
  return request.data.data
  }catch(e){
    console.error(e)
  }
}

export async function GetGraphData(){
  axios.get(Cons.Graph,{
      headers: {
          'Content-Type': 'application/json',    
      },
      withCredentials: true
  })
    .then(res => {
      console.log(res)
      return res.data.data;
    })
    .catch(err => {
      console.error(err.stack)
      return "Error";
    })
}

