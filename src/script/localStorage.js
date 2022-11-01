const getTokenLocalStorage = () => {
    const token = JSON.parse(localStorage.getItem("@token:"));

    return token 
}

const getIdDepartament = () => {
    const idDepartament = JSON.parse(localStorage.getItem("@idDepartament:"));

    return idDepartament
}

export{
    getTokenLocalStorage,
    getIdDepartament
}