import { getTokenLocalStorage } from "./localStorage.js"
import { toastError, toastSucesso } from "./toast.js"

const baseUrl = "http://localhost:6278/"

const getAllCompany = async () => {
    try{
        const request = await fetch(baseUrl + "companies")

        const response = await request.json()
        
        return response
    }catch(err) {
        console.log(err)
    }
}

const getCompanyBySector = async (filter) => {
    try{
        const request = await fetch(baseUrl + `companies/${filter}`)

        const response = await request.json()
        
        return response
    }catch(err) {
        console.log(err)
    }
}

const login = async (body) => {
    try{
        const request = await fetch(baseUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if(request.ok){
            const response = await request.json();

            localStorage.setItem("@token:", JSON.stringify(response.token))

            // window.location.replace("../../src/pages/socialDash.html")
            const verificandoAdmin = await isAdmOrNot(response.token);
            if(verificandoAdmin.is_admin){
                window.location.replace("../../src/pages/adminDash.html")
            }else{
                window.location.replace("../../src/pages/socialDash.html")
            }

        }else {
            toastError()
        }
    }catch(err){
        console.log("algo deu errado!")
    }
}

const register = async (body) => {
    try{
        const request = await fetch(baseUrl + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if(request.ok){
            toastSucesso()

            setTimeout(() => {
                window.location.replace("../../src/pages/login.html")
            }, 4000);
        }else{
            console.log("algo deu errado registro!")
        }
    }catch(err){
        console.log(err)
    }
}

const isAdmOrNot = async (token) => {
    try{
        const request = await fetch(baseUrl + "auth/validate_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        const response = await request.json();
        console.log(response)
        return response
    }catch(err){
        console.log(err)
    }
}

const getAllSectors = async () => {
    try{
        const request = await fetch(baseUrl + "sectors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const response = await request.json()
        
        return response
    }catch(err) {
        console.log(err)
    }
}

const getUserProfile = async () => {
    const token = getTokenLocalStorage()
    try{
        const request = await fetch(baseUrl + "users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();
        
        return response
    }catch(err){
        console.log(err)
    }
}

const getAllDepartament = async () => {
    const token = getTokenLocalStorage();
    try{
        const request = await fetch(baseUrl + "users/departments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const response = await request.json();
        console.log(response)
        return response
    }catch(err){
        console.log(err)
    }
}

const getAllFriendswork = async () => {
    const token = getTokenLocalStorage();
    try{
        const request = await fetch(baseUrl + "users/departments/coworkers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const response = await request.json();

        return response
    }catch(err){
        console.log(err)
    }
}

const updateProfile = async (body) => {
    const token = getTokenLocalStorage();
    try{
        const request = await fetch(baseUrl + "users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        const response = await request.json();

        return response
    }catch(err){
        console.log(err)
    }
}

const getAllAdminDepartments = async () => {
    const token = getTokenLocalStorage();
    try{
        const request = await fetch(baseUrl + "departments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();

        return response
    }catch(err){
        console.log(err)
    }
}

const getAllDepartmentsByCompany = async (id) => {
    const token = getTokenLocalStorage()
    try{
        const request = await fetch(baseUrl + `departments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();

        return response
    }catch(err){
        console.log(err)
    }
}

const getAllUsers = async () => {
    const token = getTokenLocalStorage();
    try{
        const request = await fetch(baseUrl + "users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();

        return response
    }catch(err){
        console.log(err)
    }
}

const createDepartment = async (body) => {
    const token = getTokenLocalStorage()
    try{
        const request = await fetch(baseUrl + "departments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(body)
        });
        const response = await request.json();

        return response
    }catch(err){
        console.log(err)
    }
}

export {
    getAllCompany,
    getCompanyBySector,
    login,
    register,
    getAllSectors,
    getUserProfile,
    getAllDepartament,
    getAllFriendswork,
    updateProfile,
    getAllAdminDepartments,
    getAllDepartmentsByCompany,
    getAllUsers,
    createDepartment,
}