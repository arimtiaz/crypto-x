// TODO - Pagination, Filter
// TODO - Project Technical Description & Deploy

// Api Key
const key = "9c015b1d-fb2b-4af2-8d52-3343a74f6e36";
const searchBar = document.getElementById("search-bar");

let resData = [];
let watchList = JSON.parse(window.localStorage.getItem("my-watchlist")) || [];

// Getting Data
async function getMarketData() {
  try {
    const response = await fetch(
      "https://api.mobula.io/api/1/market/query?limit=10&fields=price&fields=logo&fields=price_change_24h&fields=price_change_7d",
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
    resData = data;
    renderData(resData);
  } catch (error) {
    console.error(error.message);
  }
}

getMarketData();

// Rendering Data
function renderData(resData) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  let count = 0;
  for (const coin of resData) {
    const tableRow = document.createElement("tr");
    tableRow.className = "even:dark:bg-neutral-800 bg-neutral-900";

    // Count Col
    const countTd = document.createElement("td");
    countTd.className = "px-6 py-4 max-w-2";
    count++;
    countTd.innerText = count;
    tableRow.appendChild(countTd);

    // Name Col
    const nameTd = document.createElement("td");
    nameTd.className = "px-6 py-4 text-wrap flex items-center";
    const logoImg = document.createElement("img");
    logoImg.src = coin.logo;
    logoImg.className = "w-6 h-6 mr-2";

    nameTd.appendChild(logoImg);
    const nameText = document.createTextNode(coin.name);
    nameTd.appendChild(nameText);

    tableRow.appendChild(nameTd);

    // Price Col
    const priceTd = document.createElement("td");
    priceTd.className = "px-6 py-4 text-wrap";
    priceTd.innerText = `$${coin.price.toFixed(4)}`;
    tableRow.appendChild(priceTd);

    // Day Change Col
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
    badge1.innerText = coin.price_change_24h.toFixed(2);
    dayChange.appendChild(badge1);
    tableRow.appendChild(dayChange);

    // Week Change Col
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
    badge2.innerText = coin.price_change_7d.toFixed(2);
    weekChange.append(badge2);
    tableRow.appendChild(weekChange);

    // Watchlist Col
    const watchListTd = document.createElement("td");
    const watchListBox = document.createElement("input");
    watchListBox.checked = watchList.some(localCoin => localCoin.name === coin.name);
    watchListBox.type = "checkbox";
    watchListBox.id = "watchlistbox";
    
    watchListBox.className =
      " w-4 h-4 text-orange-600 bg-neutral-100 border-neutral-300 rounded  dark:focus:ring-orange-600 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 watchListBox:border-neutral-60";
      watchListBox.addEventListener("change", (e) => {
      if (e.target.checked) {
        addToWatchList(coin);
      } else {
        removeFromWatchList(coin);
      }
      renderWatchList(watchList);
    });
    watchListTd.appendChild(watchListBox);
    tableRow.appendChild(watchListTd);

    tableBody.appendChild(tableRow);
  }
}

// Searching Data
searchBar.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();
  let searchedData = resData.filter((coin) => {
    return coin.name.toLowerCase().includes(query);
  });
  renderData(searchedData);
});

// Add To Watch List
function addToWatchList(coin) {
  const exists = watchList.some((localCoin) => {
    return coin.name === localCoin.name;
  });
  if (!exists) {
    watchList.push(coin);
    renderWatchList(watchList);
    window.localStorage.setItem("my-watchlist", JSON.stringify(watchList));
  }
}

// Remove from Watchlist
function removeFromWatchList(coin) {
  watchList.filter((item) => {
    if (item.name == coin.name) {
      let index = watchList.indexOf(item);
      watchList.splice(index, 1);
    }
  });
  renderWatchList(watchList);
  window.localStorage.setItem("my-watchlist", JSON.stringify(watchList));
}

// Render Watch List
function renderWatchList() {
  const watchListContainer = document.getElementById("watchlist-container");
  const watchListTitle = document.getElementById("watchlist-title");
  const heading = document.createElement("h1");
  heading.className =
    "my-6 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white";
  console.log(watchList);

  watchListContainer.innerHTML = "";
  watchListTitle.innerHTML = ""; // Clear previous title

  if (watchList.length === 0) {
    heading.innerText = "Watchlist Empty. Add!";
    watchListTitle.append(heading);
  } else {
    heading.innerText = "Your Watchlist";
    watchListTitle.append(heading);
    for (const coin of watchList) {
      const coinCard = document.createElement("div");
      coinCard.className =
        "w-full max-w-sm border rounded-lg shadow dark:bg-neutral-800 dark:border-neutral-700 p-4 flex flex-col items-center";

      const coinLogo = document.createElement("img");
      coinLogo.className = "rounded-t-lg w-12 h-12 mb-2";
      coinLogo.src = coin.logo;
      coinCard.appendChild(coinLogo);

      const coinName = document.createElement("h2");
      coinName.className =
        "mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white";
      coinName.innerText = coin.name;
      coinCard.appendChild(coinName);

      const priceTd = document.createElement("p");
      priceTd.className = "dark:text-neutral-400";
      priceTd.innerText = `$${coin.price.toFixed(4)}`;
      coinCard.appendChild(priceTd);

      watchListContainer.appendChild(coinCard);
    }
  }
}

renderWatchList(watchList);
