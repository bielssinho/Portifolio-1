const toastSucesso = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("toast-sucesso");

    const p = document.createElement("p");
    
    div.append(p);
    main.append(div);
}

const toastError = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("toast-erro");

    const p = document.createElement("p");
    
    div.append(p);
    main.append(div);
}