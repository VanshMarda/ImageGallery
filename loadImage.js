let currentListElement = null; // store reference to clicked <li>
let currentDataElement = null; // store reference to clicked data object


/*
function for changing the image based on the selected element in the list
*/
async function handleImageChange(element,newList){
    console.log("hello")
  document.querySelectorAll(".image-list li").forEach(li => {
    li.classList.remove("bg-blue-200");
    li.classList.add("hover:bg-gray-200");
  });

  // Highlight the clicked one
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

/*
function for editing the text of the image on clicking the text
*/
function setupEditableBinding() {
  const displayText = document.querySelector(".display-text");
  displayText.addEventListener("input", () => {
    if (currentListElement && currentDataElement) {
      const newValue = displayText.textContent;

      currentListElement.textContent = newValue;

      currentDataElement.text = newValue;
    }
  });
}

export {handleImageChange,setupEditableBinding};