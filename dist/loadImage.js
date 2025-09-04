let currentListElement = null;
let currentDataElement = null;
async function handleImageChange(element, newList) {
    document.querySelectorAll(".image-list li").forEach(li => {
        li.classList.remove("bg-blue-200");
        li.classList.add("hover:bg-gray-200");
    });
    newList.classList.add("bg-blue-200");
    newList.classList.remove("hover:bg-gray-200");
    const displayImage = document.querySelector(".display-image");
    const displayText = document.querySelector(".display-text");
    if (displayImage && displayText) {
        displayImage.src = element.image;
        displayImage.alt = element.alt;
        displayText.textContent = element.text;
    }
    currentListElement = newList.querySelector("span");
    currentDataElement = element;
}
function setupEditableBinding() {
    const displayText = document.querySelector(".display-text");
    if (!displayText)
        return;
    displayText.addEventListener("input", () => {
        if (currentListElement && currentDataElement) {
            const newValue = displayText.textContent;
            currentListElement.textContent = newValue;
            currentDataElement.text = newValue || "";
        }
    });
}
export { handleImageChange, setupEditableBinding };
