const toastSucesso = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList = "toast-sucesso toast";

    const p = document.createElement("p");
    p.innerText = "Criação de usário bem sucedida!"
    
    div.append(p);
    main.append(div);
}

const toastError = () => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList = "toast-erro toast";

    const p = document.createElement("p");
    p.innerText = "Email ou senha invalidos!"
    
    div.append(p);
    main.append(div);
}

export {
    toastSucesso,
    toastError
}