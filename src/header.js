function createHeader() {
    const header = document.createElement("header");
    const h1 = document.createElement("h1");

    header.classList.add("header");

    h1.textContent = "Todo List";
    header.append(h1);

    return header;
}

export default createHeader;