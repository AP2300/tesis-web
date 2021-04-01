import axios from "axios";
import * as Cons from "./constants";

export async function EndSession() {
    try {
        const res = axios.get(Cons.LogOut, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
        return res
    } catch (e) {
        console.error(e)
    }


}

export async function LogIn(params) {

    try {
        const res = axios.post(Cons.LogIn, params, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        return res;
    } catch (e) {
        console.error(e)
    }
}