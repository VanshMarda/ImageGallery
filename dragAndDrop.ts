/*
Handles drag-and-drop reordering of list items
*/

function setupDragAndDrop(listSelector = ".image-list") {
  const list = document.querySelector<HTMLUListElement>(listSelector);
  if (!list) return;

  let draggedEl:HTMLLIElement| null = null;

  list.querySelectorAll<HTMLLIElement>("li").forEach((li) => {

    li.addEventListener("dragstart", (e:DragEvent) => {
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

    li.addEventListener("dragover", (e:DragEvent) => {
      e.preventDefault();
      li.classList.add("border-t-2", "border-blue-400");
    });

    li.addEventListener("dragleave", () => {
      li.classList.remove("border-t-2", "border-blue-400");
    });

    li.addEventListener("drop", (e:DragEvent) => {
      e.preventDefault();
      li.classList.remove("border-t-2", "border-blue-400");
      if (draggedEl && draggedEl !== li) {
        list.insertBefore(draggedEl, li);
      }
    });
  });
}

export { setupDragAndDrop };
