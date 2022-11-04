import { getTokenLocalStorage } from "./localStorage.js";
import { getAllDepartament, getAllFriendswork, getUserProfile, updateProfile } from "./request.js"

const verifyPermission = () => {
    const user = getTokenLocalStorage();

    if(user == ""){
        window.location.replace("../../index.html");
    }
}

verifyPermission();

const eventLogout = () => {
    const botaoLogout = document.querySelector("#btn-logout");

    botaoLogout.addEventListener("click", () => {
        localStorage.clear()

        setTimeout(() => {
            window.location.replace("../../index.html")
        }, 2000);
    })
}

eventLogout();

const modal = () => {
    const main = document.querySelector("main");

    const section = document.createElement("section");
    section.classList.add("bg-modal-user");

    const div = document.createElement("div");
    div.classList.add("modal");

    const divHeader = document.createElement("div");
    divHeader.classList.add("modal-header");

    const h2 = document.createElement("h2");
    h2.innerText = "Editar perfil";

    const img = document.createElement("img");
    img.src = "../../src/img/x-close menor.png";
    img.alt = "X fechar modal";
    img.classList.add("close-modal");

    img.addEventListener("click", () => {
        const section = document.querySelector(".bg-modal-user");

        section.remove()
    })

    const divBody = document.createElement("div");
    divBody.classList.add("modal-body");

    const form = document.createElement("form");
    form.classList.add("form-modal-user");

    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "username";
    inputName.value = "";
    inputName.placeholder = "Seu nome";

    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.name = "email";
    inputEmail.value = "";
    inputEmail.placeholder = "Seu email";

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.name = "password";
    inputPassword.value = "";
    inputPassword.placeholder = "Seu senha";

    const button = document.createElement("button");
    button.innerText = "Editar perfil";

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const inputs = [...e.target]

        const body = {}

        inputs.forEach(({name, value}) => {
            if(name){
                body[name] = value
            }
        })
        await updateProfile(body)
        const section = document.querySelector(".info-user");
        section.innerHTML = ""
        infoUserLogado()
    })

    form.append(inputName, inputEmail, inputPassword, button);
    divBody.append(form);
    divHeader.append(h2, img);
    div.append(divHeader, divBody);

    section.append(div);
    main.append(section);
}

const infoUserLogado = async () => {
    const infoUser = await getUserProfile();
    
    departamentArea(infoUser.department_uuid);
    localStorage.setItem("@idDepartament:", JSON.stringify(infoUser.department_uuid))
    const section = document.querySelector(".info-user");

    const div = document.createElement("div");
    div.classList.add("user")

    const divCabecalho = document.createElement("div");
    divCabecalho.classList.add("user-cabecalho")

    const h2 = document.createElement("h2");
    h2.innerText  = `${infoUser.username}`;

    const divInfo = document.createElement("div");

    const spanEmail = document.createElement("span");
    spanEmail.innerText = `Email:${infoUser.email}`;

    const spanNivel = document.createElement("span");
    spanNivel.innerText = `${infoUser.professional_level}`;

    const spanPref = document.createElement("span");
    spanPref.innerText = `${infoUser.kind_of_work}`;

    const button = document.createElement("button");

    const img = document.createElement("img");
    img.classList.add("open-modal-editar-user");
    img.src = "../../src/img/edit blue.png";
    img.alt = "botão editar";

    img.addEventListener("click", (e) => {
        e.preventDefault()

        modal()
    })

    button.append(img);
    divInfo.append(spanEmail, spanNivel, spanPref);
    divCabecalho.append(h2, divInfo);
    div.append(divCabecalho, button);

    section.append(div);
}

infoUserLogado();

const noContrated = () => {
    const section = document.querySelector(".sec-departament");

    const div = document.createElement("div");
    div.classList.add("no-contrated");

    const p = document.createElement("p");
    p.innerText = "Você ainda não foi contratado";

    div.append(p)

    section.append(div)
}

const contrated = (empresa, departamento) => {
    const section = document.querySelector(".sec-departament");

    const div = document.createElement("div");
    div.classList.add("contrated");

    const h3 = document.createElement("h3");
    h3.innerText = `${empresa.name} - ${departamento.name}`;

    const ul = document.createElement("ul");
    ul.classList.add("list-friendwork")

    div.append(h3, ul);

    section.append(div);
}

const criaLi = (element) => {
    const ul = document.querySelector(".list-friendwork");

    const li = document.createElement("li");
    li.classList.add("friendwork");

    const h4 = document.createElement("h4");
    h4.innerText = `${element.username}`;

    const span = document.createElement("span");
    span.innerText = `${element.professional_level}`;

    li.append(h4, span);
    ul.append(li);
}

const departamentArea = async (id) => {
    const departamentIdUser = id;
    
    if(departamentIdUser){
        const listaDepartamentos = await getAllDepartament();

        const pegandoDepartamento = listaDepartamentos.departments

        const departamentoUser = pegandoDepartamento.find(element => element.uuid == departamentIdUser)

        contrated(listaDepartamentos, departamentoUser);

        const listFrendsWork = await getAllFriendswork();
        
        const lista = listFrendsWork[0].users
        lista.forEach(element => {
            criaLi(element)
        });
    }else{
        noContrated();
    }
}









