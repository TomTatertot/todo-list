import checkLogo from "./images/favicon.png";

function createHeader() {
    const header = document.createElement("header");

    const logo = document.createElement("img");
    logo.src = checkLogo;

    const h1 = document.createElement("h1");

    header.classList.add("header");

    h1.textContent = "ToDone";
    header.append(logo, h1);
    // h1.append(logo);

    return header;
}

export default createHeader;