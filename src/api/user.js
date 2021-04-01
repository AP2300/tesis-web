import axios from "axios";

export async function GetUserData(){
  
  try{
    const request = await axios.get("http://localhost:3001/Home",  {
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

// export function GetUserData(){
//       axios.get("http://localhost:3001/Home", {
//       headers: {
//           'Content-Type': 'application/json',    
//       },
//       withCredentials: true
//   })
//     .then(res => {
//       console.log(res.data.data);
//       return res.data.data
//     })
//     .catch(err => {
//       console.error(err); 
//     })

// }

