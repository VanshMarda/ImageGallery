function setupDragAndDrop(listSelector = ".image-list") {
    const list = document.querySelector(listSelector);
    if (!list)
        return;
    let draggedEl = null;
    list.querySelectorAll("li").forEach((li) => {
        li.addEventListener("dragstart", (e) => {
            draggedEl = li;
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = "move";
            }
            li.classList.add("opacity-50");
        });
        li.addEventListener("dragend", () => {
            draggedEl = null;
            li.classList.remove("opacity-50");
        });
        li.addEventListener("dragover", (e) => {
            e.preventDefault();
            li.classList.add("border-t-2", "border-blue-400");
        });
        li.addEventListener("dragleave", () => {
            li.classList.remove("border-t-2", "border-blue-400");
        });
        li.addEventListener("drop", (e) => {
            e.preventDefault();
            li.classList.remove("border-t-2", "border-blue-400");
            if (draggedEl && draggedEl !== li) {
                list.insertBefore(draggedEl, li);
            }
        });
    });
}
export { setupDragAndDrop };
