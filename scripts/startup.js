/** Utilities */
const getResources = async function () {
  const response = await fetch("./resources.json");

  return await response.json();
};

/** Startup */
const resources = await getResources();

const bio = document.getElementById("bio");
const donations = document.getElementById("donations");
const projects = document.getElementById("projects");
const donationContainer = donations.firstElementChild;
const projectContainer = projects.firstElementChild;

bio.innerHTML = resources.bio.join(" "); // Allow the resource to include html

let donationNodes = [];
let projectNodes = [];

for (const option of resources.donations) {
  const node = donationContainer.cloneNode(true);
  node.removeAttribute("style");

  node.href = option.url;
  node.querySelector("img").src = option.img;
  node.querySelector("span").textContent = option.name;

  donationNodes.push(node);
}

for (const option of resources.projects) {
  let cover = option.cover || option.img;
  if (cover.startsWith("./")) cover = "." + cover;

  const node = projectContainer.cloneNode(true);
  node.removeAttribute("style");

  node.href = option.url;
  node.querySelector("img").src = option.img;
  node.querySelector(".subtitle").textContent = option.name;
  node.querySelector(".description").textContent = option.desc;
  node.style.setProperty("--bg-image", `url("${cover}")`);

  projectNodes.push(node);
}

donations.append(...donationNodes);
projects.append(...projectNodes);
