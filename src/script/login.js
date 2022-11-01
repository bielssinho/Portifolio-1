import { login } from "./request.js";

const eventLogin = () => {
    const form = document.querySelector(".form");
    const elements = [...form.elements];
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const body = {};

        elements.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.name] = element.value
            }
        })
        await login(body)
    })
}

eventLogin();