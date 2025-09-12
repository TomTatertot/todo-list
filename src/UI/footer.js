import githubLogo from "./images/github-mark.png";

function createFooter(){
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.innerHTML = 
    `<p> Logo made by Pixel Perfect from <a href="https://flaticon.com">FlatIcon</a> </p>
    <div> <a href="https://github.com/TomTatertot/todo-list"><img src=${githubLogo}></a> 2025 © TomTatertot</div>             
    `
    return footer;
}

export default createFooter;