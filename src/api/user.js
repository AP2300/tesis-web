import axios from "axios";
import * as Cons from "./constants";
const FormData = require('form-data');

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
    if ((await res).status === 200) {
      return [(await res).data.data,(await res).data.history]
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
  }
}

export async function GetHistoryData() {
  try {
    const res = axios.get(Cons.Search, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function GetHistoryUserData(id) {
  try {
    const res = axios.get(Cons.SearchData, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { id: id },
      withCredentials: true,
    })
    if ((await res).status === 200) {
      return res
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
  }
}

export async function DeleteMethod(id) {
  try {
    const res = axios.delete(Cons.deleteMethod, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id: id },
      withCredentials: true,
    })
    if ((await res).status === 200) {
      return res
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
  }
}

export async function GetFullUserData() {
  try {
    const res = axios.get(Cons.profile, {
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
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function GetSecurityUserData(id) {
  try {
    const res = axios.get(Cons.profile, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: id
      },
      withCredentials: true,
    })
    if ((await res).status === 200) {
      return res
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
    if (e.response.status === 401) return false
  }
}

export async function UpdateBasicData(params) {
  try {
    const res = axios.post(Cons.changeData, params, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function UpdateAuthMethods(params) {
  try {
    const res = axios.post(Cons.updateBio, params, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function UpdateUserPassword(params) {
  try {
    const res = axios.post(Cons.updatePass, params, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function UpdateProfPicture(data) {
  const form = new FormData();
  form.append("picture", data.img)
  form.append("id", data.id)
  form.append("actualPicture", data.actualPicture)
  
  try {
    const res = axios.post(Cons.UpdateProf, form, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function setFinger(data) {
  const form = new FormData();
  form.append("finger", data.finger)
  form.append("id", data.id)
  form.append("fingerName", data.fingerName)
  try {
    const res = await axios.post(Cons.setFinger, form, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function setFace(data) {
  const form = new FormData();
  form.append("face", data.face)
  form.append("id", data.id)
  try {
    const res = await axios.post(Cons.setFace, form, {
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
  } catch (e) {
    console.error(e)
  }
}

export async function DeletePicture(params){
  try{
    const res = axios.post(Cons.DeleteProf, params ,{
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
