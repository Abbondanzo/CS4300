interface Assignment {
  title: string;
  dueDate: string;
  description: string;
  fileName: string;
}

const ASSIGNMENTS: Assignment[] = [
  {
    title: "A1 - Simple 2D Triangle",
    dueDate: "Sept 15",
    description: "A trivial WebGL application that renders a simple triangle",
    fileName: "assignment1.html",
  },
  {
    title: "A2 - A WebGL Mini CAD",
    dueDate: "Sept 22",
    description:
      "A simple CAD (Computer Aided Design) application using HTML and WebGL",
    fileName: "assignment2.html",
  },
  {
    title: "A3 - Interacting with WebGL",
    dueDate: "Sept 29",
    description:
      "A take on A2 where you can interact with the WebGL canvas using the mouse",
    fileName: "assignment3.html",
  },
  {
    title: "A4 - WebGL Transformations",
    dueDate: "Oct 8",
    description:
      "Apply matrix multiplications on shapes to perform transformations",
    fileName: "assignment4.html",
  },
];

const buildLineItem = (assignment: Assignment) => {
  const container = document.createElement("a");
  container.className = "list-group-item list-group-item-action";
  container.href = assignment.fileName;
  //
  const headingMeta = document.createElement("div");
  headingMeta.className = "d-flex w-100 justify-content-between";
  const title = document.createElement("h5");
  title.className = "mb-1";
  title.textContent = assignment.title;
  headingMeta.appendChild(title);
  const smallDate = document.createElement("small");
  smallDate.className = "text-muted";
  smallDate.textContent = assignment.dueDate;
  headingMeta.appendChild(smallDate);
  container.appendChild(headingMeta);
  //
  const body = document.createElement("p");
  body.className = "mb-1";
  body.textContent = assignment.description;
  container.appendChild(body);
  //
  const smallName = document.createElement("small");
  smallName.className = "text-muted";
  smallName.textContent = assignment.fileName;
  container.appendChild(smallName);
  //
  return container;
};

const buildListGroup = () => {
  const list = document.createElement("div");
  list.className = "list-group";
  ASSIGNMENTS.forEach((assignment) =>
    list.appendChild(buildLineItem(assignment))
  );
  return list;
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  container.appendChild(buildListGroup());
});
