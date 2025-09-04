let currentListElement:HTMLSpanElement | null = null; // store reference to clicked <li>
let currentDataElement : ImageData | null = null; // store reference to clicked data object

type ImageData = {
    image:string;
    alt:string;
    text:string;
}


/*
function for changing the image based on the selected element in the list
*/
async function handleImageChange(element : ImageData,newList:HTMLLIElement):Promise<void>{
  document.querySelectorAll<HTMLLIElement>(".image-list li").forEach(li => {
    li.classList.remove("bg-blue-200");
    li.classList.add("hover:bg-gray-200");
  });

  // Highlight the clicked one
  newList.classList.add("bg-blue-200");
  newList.classList.remove("hover:bg-gray-200");

  const displayImage = document.querySelector<HTMLImageElement>(".display-image");
  const displayText = document.querySelector<HTMLDivElement>(".display-text");

  if (displayImage && displayText) {
    displayImage.src = element.image;
    displayImage.alt = element.alt;
    displayText.textContent = element.text;
  }
  currentListElement = newList.querySelector<HTMLSpanElement>("span");
  currentDataElement = element;

}

/*
function for editing the text of the image on clicking the text
*/
function setupEditableBinding():void {
  const displayText = document.querySelector<HTMLDivElement>(".display-text");
  if(!displayText)return;
  displayText.addEventListener("input", () => {
    if (currentListElement && currentDataElement) {
      const newValue = displayText.textContent;

      currentListElement.textContent = newValue;

      currentDataElement.text = newValue || "";
    }
  });
}

export {handleImageChange,setupEditableBinding};