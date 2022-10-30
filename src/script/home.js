import { getAllCompany, getCompanyBySector } from "./request.js";
const select = document. querySelector("#select");
select.addEventListener("input", () => {renderHome(select.value)})

const renderHome = async (filter)  => {
    const ul = document.querySelector(".list-empresas");
    ul.innerHTML = "";

    if(filter == "Selecionar Setor"){
        const data = await getAllCompany();
        
        data.forEach(company => {
            createLi(company)
        });
    }else if(filter != "Selecionar Setor"){
        const filter = select.value;
        const dataBySector = await getCompanyBySector(filter);

        dataBySector.forEach(company => {
            createLi(company);
        })
    }
}

const createLi = (company) => {
    const ul = document.querySelector(".list-empresas")

    const li = document.createElement("li");
    li.classList.add("empresa");

    const div = document.createElement("div");
    div.classList.add("info")

    const h3 = document.createElement("h3");
    h3.innerText = `${company.name}`;

    const p = document.createElement("p");
    p.innerText = `${company.opening_hours} Horas`;

    const span = document.createElement("span")
    span.innerText = `${company.sectors.description}`;

    div.append(p, span);
    li.append(h3, div);

    ul.append(li);
}