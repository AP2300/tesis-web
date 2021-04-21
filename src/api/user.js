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
    if ((await res).status === 200) {
      return (await res).data.data
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
