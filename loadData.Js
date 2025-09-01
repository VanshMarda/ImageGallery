import {handleImageChange,setupEditableBinding} from './loadImage.js'
import{setupDragAndDrop} from './dragAndDrop.js'

/*
function for loading the list elements and calling handleImageChange and setupEditableBinding 
*/
async function loadData() {
    try {
        const response = await fetch("data.json")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()

        data.forEach((element,index) => {
            const unOrderedList = document.querySelector(".image-list") 

            const newList = document.createElement("li")
            newList.className = "flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
            newList.draggable=true
            const newImage = document.createElement("img")
            newImage.src = element.image
            newImage.alt = element.alt
            newImage.className = "w-10 h-10 rounded object-cover"

            const newSpan = document.createElement("span")
            newSpan.textContent = element.text
            
            newList.addEventListener("click",()=>handleImageChange(element,newList));
            if(index==0){
                handleImageChange(element,newList)
            }
            handleImageChange(element,newList)
            unOrderedList.prepend(newList)
            newList.append(newImage)
            newList.append(newSpan)
            
            setupEditableBinding()
        });
        setupDragAndDrop(".image-list");
    }
    catch(error) {
        console.log("Json error :" , error)
    }
}

loadData()