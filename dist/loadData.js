import { handleImageChange, setupEditableBinding } from './loadImage.js';
import { setupDragAndDrop } from './dragAndDrop.js';
function truncateTextToTwoLines(span, text) {
    span.textContent = text;
    const lineHeight = parseInt(window.getComputedStyle(span).lineHeight, 10);
    const maxHeight = lineHeight * 1.5;
    if (span.scrollHeight <= maxHeight) {
        return;
    }
    let startLen = Math.floor(text.length * 0.6);
    let endLen = Math.floor(text.length * 0.3);
    let truncated = text.slice(0, startLen) + "..." + text.slice(text.length - endLen);
    span.textContent = truncated;
    while (span.scrollHeight > maxHeight && startLen > 5 && endLen > 5) {
        startLen--;
        endLen--;
        truncated = text.slice(0, startLen) + "..." + text.slice(text.length - endLen);
        span.textContent = truncated;
    }
}
async function loadData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((element, index) => {
            const unOrderedList = document.querySelector(".image-list");
            if (!unOrderedList)
                return;
            const newList = document.createElement("li");
            newList.className = "flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded";
            newList.draggable = true;
            const newImage = document.createElement("img");
            newImage.src = element.image;
            newImage.alt = element.alt;
            newImage.className = "w-10 h-10 rounded object-cover";
            const newSpan = document.createElement("span");
            newSpan.textContent = element.text;
            newList.addEventListener("click", () => handleImageChange(element, newList));
            if (index == 0) {
                handleImageChange(element, newList);
            }
            handleImageChange(element, newList);
            unOrderedList.prepend(newList);
            newList.append(newImage);
            newList.append(newSpan);
            requestAnimationFrame(() => {
                truncateTextToTwoLines(newSpan, element.text);
            });
            setupEditableBinding();
        });
        setupDragAndDrop(".image-list");
    }
    catch (error) {
        console.log("Json error :", error);
    }
}
loadData();
