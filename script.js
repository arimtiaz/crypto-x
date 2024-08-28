// TODO - Pagination, Watchlist, Search, Filter & LocalStorage

// Api Key
const key = "9c015b1d-fb2b-4af2-8d52-3343a74f6e36";
const searchBar = document.getElementById("search-bar");

let resData = [];
// Getting Data
async function getMarketData() {
  try {
    const response = await fetch(
      "https://api.mobula.io/api/1/all?fields=price&fields=logo&fields=price_change_24h&fields=price_change_7d",
      {
        headers: {
          Authorization: `${key}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    resData = data.data;
    // searchData(data)
    renderData(resData);
  } catch (error) {
    console.error(error.message);
  }
}

getMarketData();

// Searching Data
searchBar.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  console.log(query)
  // console.log(data)
  const searchedData = [];
});

// Rendering Data
function renderData(resData) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  let count = 0;
  for (const coin of resData) {
    const tableRow = document.createElement("tr");
    tableRow.className = "even:dark:bg-neutral-800 bg-neutral-900";

    const countTd = document.createElement("td");
    countTd.className = "px-6 py-4 max-w-2";
    count++;
    countTd.innerText = count;
    tableRow.appendChild(countTd);

    const nameTd = document.createElement("td");
    nameTd.className = "px-6 py-4 text-wrap max-w-4";
    const logoImg = document.createElement("img");
    logoImg.src = coin.logo;
    logoImg.className = "w-6 h-6 mr-2";
    nameTd.innerText = coin.name;
    nameTd.appendChild(logoImg);
    tableRow.appendChild(nameTd);

    const priceTd = document.createElement("td");
    priceTd.className = "px-6 py-4 text-wrap";
    priceTd.innerText = `$${coin.price}`;
    tableRow.appendChild(priceTd);

    const dayChange = document.createElement("td");
    dayChange.className = "px-6 py-4 text-wrap";
    const badge1 = document.createElement("span");
    if (coin.price_change_24h >= 0) {
      badge1.className =
        "font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
    } else {
      badge1.className =
        "font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
    }
    badge1.innerText = coin.price_change_24h;
    dayChange.appendChild(badge1);
    tableRow.appendChild(dayChange);

    const weekChange = document.createElement("td");
    weekChange.className = "px-6 py-4 text-wrap";
    const badge2 = document.createElement("span");
    if (coin.price_change_7d >= 0) {
      badge2.className =
        "font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
    } else {
      badge2.className =
        "font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
    }
    badge2.innerText = coin.price_change_7d;
    weekChange.append(badge2);
    tableRow.appendChild(weekChange);

    tableBody.appendChild(tableRow);
  }
}
