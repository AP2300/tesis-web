export const url = "https://tesis-backend-dcsecurity.herokuapp.com/";
export const url_RBPI = " http://172.28.237.72:5000";

// Rutas
export const LogOut = `${url}/logOut`;
export const LogIn = `${url}/login`;
export const Home = `${url}/Home`;
export const Graph = `${url}/access_data`;
export const Search = `${url}/Search`
export const SearchData = `${url}/UserHistory`
export const profile = `${url}/profile`
export const changeData = `${url}/editProfile`
export const updateBio = `${url}/bioUpdate`
export const updatePass = `${url}/updateUserPass`
export const AdminDataUpdate = `${url}/AdminUpdateData`
export const AdminPassUpdate = `${url}/AdminUpdatePass`
export const deleteMethod = `${url}/deleteMethod`
export const Register = `${url}/register`
export const changeState= `${url}/changeState`
export const Delete = `${url}/deleteUser`
export const UpdateProf = `${url}/updateProfile`
export const setFinger = `${url}/setFinger`
export const setFace = `${url}/setFace`
export const DeleteProf = `${url}/deleteProfile`
export const CheckSession = `${url}/checkSession`

// Rutas Raspberry Pi
export const getFace = `${url_RBPI}/getFace`
export const getFinger = `${url_RBPI}/getFingerprint`

// Constantes db
export const colors = [
    [{ color: "#0c3148b2", stop: 0.3 }, { color: "#135659b2", stop: 0.5 }, { color: "#1a7769a2", stop: 1 }],
    [{ color: "#2956b5b2", stop: 0 }, { color: "#7abcbab2", stop: 0.48 }, { color: "#86ed6952", stop: 1 }], 
    [{ color: "#2a9d8fb2", stop: 0.10 }, { color: "#d0bf6fb2", stop: 0.95 }, { color: "#e9c46ab2", stop: 1 }],
    [{ color: "#cf0e1fb2", stop: 0.30 }, { color: "#f3b13bb2", stop: 0.85 }, { color: "#f9ce40b2", stop: 1 }],
    [{ color: "#22f8ffb2", stop: 0.20 }, { color: "#a07fffb2", stop: 0.60 }, { color: "#c15fffb2", stop: 1 }],
    [{ color: "#f5f5f5e2", stop: 0 }, { color: "#82b4dcd2", stop: 0.50 }, { color: "#0569b9d2", stop: 1 }], 
    [{ color: "#f20089b2", stop: 0 }, { color: "#b100e8b2", stop: 0.50 }, { color: "#2d00f7b2", stop: 1 }],
    [{ color: "#0c3148a2", stop: 0.30 }, { color: "#587e8cb2", stop: 0.60 }, { color: "#99c0c6c2", stop: 1 }],
];



