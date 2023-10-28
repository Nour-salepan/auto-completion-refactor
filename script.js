const search = document.getElementById("search");
const mathchList = document.getElementById("match-list");

const searchState = async (searchText) => {
  const res = await fetch("states.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    // return state.name.match(regex) || state.abbr.match(regex);
    return regex.test(state.name) || regex.test(state.abbr);
  });

  if (searchText.length === 0) {
    matches = [];
    mathchList.innerHTML = "";
  }

  output(matches);
};

function output(matches) {
  let output;
  if (matches.length > 0) {
    // const html = matches
    //   .map(
    //     (match) => `

    // <div class="card card-body mb-4">
    //   <h1 class="">${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h1>
    //   <small>lat: ${match.lat} / long: ${match.long}</small>
    // </div>

    // `
    //   )
    //   .join(" ");

    // mathchList.innerHTML = html;

    matches.forEach((match) => {
      output += `
      <div class="card card-body mb-4">
       <h1 class="">${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h1>
       <small>lat: ${match.lat} / long: ${match.long}</small>
     </div>`;
    });

    mathchList.innerHTML = output;
  }
}

search.addEventListener("input", () => {
  searchState(search.value);
});

// async function searchState(searchText) {
//   const res = await fetch("states.json");
//   const states = await res.json();

//   console.log(states);
// }
