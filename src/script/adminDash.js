import { modalCriarDepartment, modalDefault, modalDeleteDepartment, modalDeleteUser, modalEditarDepartment, modalEditarUser } from "./modalAdmin.js";
import { getAllAdminDepartments, getAllCompany, getAllDepartmentsByCompany, getAllUsers } from "./request.js"

const eventLogout = () => {
    const botaoLogout = document.querySelector("#btn-logout");

    botaoLogout.addEventListener("click", () => {
        localStorage.clear()

        setTimeout(() => {
            window.location.replace("../../index.html")
        }, 2000);
    })
}

eventLogout()

const cabecalho = async () => {
    const empresas = await getAllCompany();
    
    const select = document.querySelector("#company")

    empresas.forEach(element => {
        const option = document.createElement("option");
        option.value = `${element.name}`;
        option.innerText = `${element.name}`;

        select.append(option);
    });
}

cabecalho()

const listDepartment = (company) =>{
    const ul = document.querySelector(".list-department");

    const li = document.createElement("li");
    li.classList.add("department");

    const h4 = document.createElement("h4");
    h4.innerText = `${company.name}`;

    const p = document.createElement("p");
    p.innerText = `${company.description}`;


    const pCompanyName = document.createElement("p");
    pCompanyName.innerText = `${company.companies.name}`;

    const div = document.createElement("div");
    div.classList.add("actions");

    const img1 = document.createElement("img");
    img1.src = "../../src/img/visualizar.png";
    img1.alt = "imagem vizualizar";

    const img2 = document.createElement("img");
    img2.src = "../../src/img/edit black.png";
    img2.alt = "imagem de editar";
    img2.addEventListener("click", (e) => {
        e.preventDefault()

        modalDefault()
        modalEditarDepartment(company)
    })

    const img3 = document.createElement("img");
    img3.src = "../../src/img/delete.png";
    img3.alt = "imagem delete";
    img3.addEventListener("click", (e) => {
        e.preventDefault()

        modalDefault()
        modalDeleteDepartment(company)
    })


    div.append(img1, img2, img3);
    li.append(h4, p, pCompanyName, div);

    ul.append(li)
}

const select = document.querySelector("#company")

select.addEventListener("input", () => {renderDepartments(select.value)})

const renderDepartments = async (filter) => {
    const ul = document.querySelector(".list-department")
    ul.innerHTML = ""
    
    if(filter == "Selecionar empresa"){
        const data = await getAllAdminDepartments()
        
        data.forEach(company => {
            listDepartment(company)
        });
    }else if(filter != "Selecionar empresa"){
        const empresas = await getAllCompany()
    
        empresas.forEach((element) => {
            if(element.name == filter){
                localStorage.setItem("@idEmpresaAdmin:", JSON.stringify(element.uuid))
            }
        });
        const idEmpresa =JSON.parse(localStorage.getItem("@idEmpresaAdmin:"))
        
        const departamentos = await getAllDepartmentsByCompany(idEmpresa)
        
        departamentos.forEach(element => {
            listDepartment(element)
        })
    }
}

renderDepartments(select.value);

const renderUser = async () => {
    const data = await getAllUsers();

    data.forEach(element => {
        const ul = document.querySelector(".list-users")
        ul.innerHTML =  "";

        const li = document.createElement("li");
        li.classList.add("users");

        const h4 = document.createElement("h4");
        h4.innerText = `${element.username}`

        const p = document.createElement("p");
        p.innerText = `${element.professional_level}`

        const pCompanyName = document.createElement("p");
        pCompanyName.innerText = `${element.kind_of_work}`

        const div = document.createElement("div");

        const img = document.createElement("img");
        img.src = "../../src/img/edit blue.png"
        img.alt = "imagem editar"
        img.addEventListener("click", (e) => {
            e.preventDefault()

            modalDefault()
            modalEditarUser(element)
        })

        const img2 = document.createElement("img");
        img2.src = "../../src/img/delete.png"
        img2.alt = "imagem deletar"
        img2.addEventListener("click", (e) => {
            e.preventDefault()

            modalDefault()
            modalDeleteUser(element)
        })

        div.append(img, img2)
        li.append(h4, p, pCompanyName, div)
        ul.append(li)
    })
}

renderUser();

const eventCriar = async () => {
    const buttonCriar = document.querySelector("#criar-department");

    buttonCriar.addEventListener("click", async (e) => {
        e.preventDefault()

        const allCompany = await getAllCompany()
        modalDefault()
        modalCriarDepartment(allCompany)
    })
}

eventCriar();