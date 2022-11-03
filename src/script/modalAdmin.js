import { renderDepartments, renderUser } from "./adminDash.js";
import { contratar, createDepartment, deleteDepartment, deleteUser, demitir, getAllUsers, getUsersNoContrated, updateDepartment, updateFuncionario} from "./request.js";

const modalDefault = () => {
    const main = document.querySelector("main")
    const section = document.createElement("section");
    section.classList.add("bg-modal");

    const div = document.createElement("div");
    div.classList.add("modal");

    const divHeader = document.createElement("div");
    divHeader.classList.add("header-modal");

    const img = document.createElement("img");
    img.src = "../../src/img/x-close menor.png";
    img.alt = "fechar modal";

    img.addEventListener("click", () => {
        const sec = document.querySelector(".bg-modal");

        sec.remove()
    })

    divHeader.append(img);
    div.append(divHeader);
    section.append(div);

    main.append(section);
}

const modalCriarDepartment = (empresas) => {
    const divP = document.querySelector(".modal")
    const div = document.createElement("div");
    div.classList.add("modal-body");

    const h3 = document.createElement("h3");
    h3.innerText = "Criar Departamento";

    const form = document.createElement("form");
    form.classList.add("form-criar");

    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "name";
    inputName.value = "";
    inputName.placeholder ="Nome do departamento";

    const inputDescription = document.createElement("input");
    inputDescription.type = "text";
    inputDescription.name = "description";
    inputDescription.value = "";
    inputDescription.placeholder ="Descrição";

    const select = document.createElement("select");
    select.name = "company_uuid";
    select.id = "select-company";

    const optionFixed = document.createElement("option");
    optionFixed.value = "Selecionar empresa";
    optionFixed.selected = true;
    optionFixed.disabled = true;
    optionFixed.innerText = "Selecionar empresa";

    empresas.forEach(element => {
        const option = document.createElement("option");
        option.value = `${element.uuid}`;
        option.innerText = `${element.name}`;

        select.append(option);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Criar departamento";

    select.append(optionFixed);
    form.append(inputName, inputDescription, select, button);
    div.append(h3, form);

    divP.append(div);

    const elements = [...form.elements]
    
    form.addEventListener("submit", async(e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.name] = element.value
            }else if(element.tagName == "SELECT" && element.value !== ""){
                body[element.name] = element.value
            }
        })
        await createDepartment(body)
        renderDepartments("Selecionar empresa")
        const sec = document.querySelector(".bg-modal");
        sec.remove()
    })
}

const modalEditarDepartment = (company) => {
    const divP = document.querySelector(".modal");

    const div = document.createElement("div");
    div.classList.add("modal-body");

    const h3 = document.createElement("h3");
    h3.innerText = "Editar departamento";

    const form = document.createElement("form");
    form.classList.add("form-editar")

    const input = document.createElement("input");
    input.type = "text";
    input.name = "description";
    input.value = `${company.description}`;

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Salvar alterações";

    form.append(input, button);
    div.append(h3, form);

    divP.append(div);

    const elements = [...form.elements]

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((elemt) => {
            if(elemt.tagName == "INPUT" && elemt.value !== ""){
                body[elemt.name] = elemt.value
            }
        })

        await updateDepartment(body, company.uuid)
        renderDepartments("Selecionar empresa")
        const sec = document.querySelector(".bg-modal");
        sec.remove()
    })
}

const modalEditarUser = (element) => {
    const divP = document.querySelector(".modal");

    const div = document.createElement("div");
    div.classList.add("modal-body");

    const h3 = document.createElement("h3");
    h3.innerText = "Editar Usuário";

    const form = document.createElement("form");
    form.classList.add("form-editar-user");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "kind_of_work";
    input.value = `${element.kind_of_work}`;
    input.placeholder = "Modalidade de trabalho";

    const inputNivel = document.createElement("input");
    inputNivel.type = "text";
    inputNivel.name = "professional_level";
    inputNivel.value = `${element.professional_level}`;
    inputNivel.placeholder = "Nivel profissional";

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Editar";

    form.append(input, inputNivel, button);
    div.append(h3, form);
    
    divP.append(div);

    const elements = [...form.elements]

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((elemt) => {
            if(elemt.tagName == "INPUT" && elemt.value !== ""){
                body[elemt.name] = elemt.value
            }
        })
        
        await updateFuncionario(body, element.uuid)
        renderUser()
        const sec = document.querySelector(".bg-modal");
        sec.remove()
    })
}

const modalDeleteUser = (element) => {
    const divP = document.querySelector(".modal");

    const div = document.createElement("div");
    div.classList.add("modal-body");

    const divText = document.createElement("div");
    divText.classList.add("text");

    const h3 = document.createElement("h3");
    h3.innerText = `Realmente deseja remover o usuário ${element.username} ?`;

    const button = document.createElement("button");
    button.id = "delete-user";
    button.innerText = "Remover";

    divText.append(h3, button);
    div.append(divText);

    divP.append(div);

    button.addEventListener("click", async () => {
        await deleteUser(element.uuid)

        renderUser()
        const sec = document.querySelector(".bg-modal");
        sec.remove()
    })
}

const modalDeleteDepartment = (company) => {
    const divP = document.querySelector(".modal");

    const div = document.createElement("div");
    div.classList.add("modal-body");

    const divText = document.createElement("div");
    divText.classList.add("text-d");

    const h3 = document.createElement("h3");
    h3.innerText = `Realmente deseja deletar o Departamento ${company.name} e demitir seus funcionários?`;

    const button = document.createElement("button");
    button.id = "delete-dd";
    button.innerText = "Confirmar";

    divText.append(h3, button);
    div.append(divText);

    divP.append(div);

    button.addEventListener("click", async () => {
        await deleteDepartment(company.uuid)

        renderDepartments("Selecionar empresa")
        const sec = document.querySelector(".bg-modal");
        sec.remove()
    })
}

const criaLi = (list) =>{
    const ulDemitir = document.querySelector(".uldemitir");
    ulDemitir.innerHTML = "";
    list.forEach((user) => {
        if(user.department_uuid == company.uuid){
            const li = document.createElement("li");

            const h4 = document.createElement("h4");
            h4.innerText = `${user.username}`;

            const pNivel = document.createElement("p");
            pNivel.innerText = `${user.professional_level}`;

            const pPref = document.createElement("p");
            pPref.innerText = `${user.kind_of_work}`;

            const divLi = document.createElement("div");

            const buttonDemitir = document.createElement("button");
            buttonDemitir.id = "btn-demitir"
            buttonDemitir.innerText = "Desligar";

            divLi.append(buttonDemitir);
            li.append(h4, pNivel, pPref, divLi);
            ulDemitir.append(li);

            buttonDemitir.addEventListener("click", async () => {
                demitir(user.uuid)

                li.remove()
            })
        }
    })
}

const modalVizualizarDepartment = async (company) => {
    const divP = document.querySelector(".modal");

    const div = document.createElement("div");
    div.classList.add("modal-body-vizu");

    const h3 = document.createElement("h3");
    h3.innerText = `${company.name}`;

    const divContratar = document.createElement("div");
    divContratar.classList.add("contratar");

    const divInfo = document.createElement("div");
    divInfo.classList.add("info-department");

    const span = document.createElement("span");
    span.innerText = `${company.description}`;

    const p = document.createElement("p");
    p.innerText = `${company.companies.name}`;

    const divForm = document.createElement("div");

    const form = document.createElement("form");
    form.classList.add("form-contrated");

    const select = document.createElement("select");
    select.name = "user_uuid";
    select.id = "select-no-contrated";
    

    const optionFixed = document.createElement("option");
    optionFixed.value = "Selecionar usuário";
    optionFixed.innerText = "Selecionar usuário";
    optionFixed.disabled = true;
    optionFixed.selected = true;

    const usersNoContrated = await getUsersNoContrated();

    usersNoContrated.forEach((user) => {
        const option = document.createElement("option");
        option.value = `${user.uuid}`;
        option.innerText = `${user.username}`;

        select.append(option);
    })

    const buttonContratar = document.createElement("button");
    buttonContratar.innerText = "Contratar";

    const divDemitir = document.createElement("div");
    divDemitir.classList.add("demitir");

    const ulDemitir = document.createElement("ul");
    ulDemitir.classList.add("uldemitir")
    ulDemitir.innerHTML = "";

    const allUsers = await getAllUsers();

    allUsers.forEach((user) => {
        if(user.department_uuid == company.uuid){
            const li = document.createElement("li");

            const h4 = document.createElement("h4");
            h4.innerText = `${user.username}`;

            const pNivel = document.createElement("p");
            pNivel.innerText = `${user.professional_level}`;

            const pPref = document.createElement("p");
            pPref.innerText = `${user.kind_of_work}`;

            const divLi = document.createElement("div");

            const buttonDemitir = document.createElement("button");
            buttonDemitir.id = "btn-demitir"
            buttonDemitir.innerText = "Desligar";

            divLi.append(buttonDemitir);
            li.append(h4, pNivel, pPref, divLi);
            ulDemitir.append(li);

            buttonDemitir.addEventListener("click", async () => {
                demitir(user.uuid)

                li.remove()
            })
        }
    })

    
    divDemitir.append(ulDemitir);
    select.append(optionFixed);
    form.append(select, buttonContratar);
    divForm.append(form);
    divInfo.append(span, p);
    divContratar.append(divInfo, divForm);
    div.append(h3, divContratar, divDemitir);

    divP.append(div);

    const info = [...form.elements]

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const body = {}

        info.forEach((elemt) => {
            if(elemt.tagName == "SELECT" && elemt.value !== ""){
                body[elemt.name] = elemt.value
                body["department_uuid"] = company.uuid
            }
        })
        contratar(body)
    })
}

export{
    modalDefault,
    modalCriarDepartment, 
    modalEditarDepartment,
    modalEditarUser,
    modalDeleteUser,
    modalDeleteDepartment,
    modalVizualizarDepartment,
}