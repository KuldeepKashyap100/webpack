import jsWallpaper from "../../assets/jsWallpaper.png";

class ImageComponent {
    render() {
        const imgElement = document.createElement("img");
        imgElement.src = jsWallpaper;
        imgElement.style.width = "400px";
        imgElement.style.height = "200px";
        imgElement.alt = "JS";
    
        document.body.appendChild(imgElement);
    }
}

export default ImageComponent;