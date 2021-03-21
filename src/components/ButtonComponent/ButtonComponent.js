import "./button.scss";

class ButtonComponent {
    buttonTextClass = "button-added-text"
    render() {
        const button = document.createElement("button");
        button.classList.add("button");
        button.innerText = "Button";
        button.onclick = () => {
            const buttonAddedText = document.createElement("p");
            buttonAddedText.innerText = "text added by button";
            buttonAddedText.classList.add(this.buttonTextClass);
            document.body.appendChild(buttonAddedText);
        }
        document.body.appendChild(button);
    }
}

export default ButtonComponent;