let id = (id) => document.getElementById(id);

let input = id("search");
mathchList = id("match-list");

input.addEventListener("input", (e) => {
  searchState(e.target.value);
});

//! create function to filter and invoke another function
async function searchState(inputText) {
  const res = await fetch("./states.json");
  const states = await res.json();

  let findings = states.filter((state) => {
    const regex = new RegExp(`^${inputText}`, "gi");

    return regex.test(state.name) || regex.test(state.abbr);
  });

  //  ! here is trick

  if (inputText.length === 0) {
    findings = [];
  }

  domDisplay(findings);
}

function domDisplay(elements) {
  let result;
  elements.forEach(
    (element) =>
      (result += `
   <div class="card card-body mb-4">
       <h1 class="">${element.name} (${element.abbr}) <span class="text-primary">${element.capital}</span></h1>
       <small>lat: ${element.lat} / long: ${element.long}</small>
     </div>
  `)
  );

  mathchList.innerHTML = result;
}
