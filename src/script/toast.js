const toastSucesso = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("toast-sucesso");

    const p = document.createElement("p");
    p.innerText = "Criação de usário bem sucedida!"
    
    div.append(p);
    main.append(div);
}

const toastError = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("toast-erro");

    const p = document.createElement("p");
    p.innerText = "Email ou senha invalidos!"
    
    div.append(p);
    main.append(div);
}

export {
    toastSucesso,
    toastError
}