// TODO - Fetch Data

//Fetching Data

const key = "9c015b1d-fb2b-4af2-8d52-3343a74f6e36";

async function getMarketData() {
  try {
    const response = await fetch("https://api.mobula.io/api/1/all", {
      headers: {
        Authorization: `${key}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    renderData(data);
  } catch (error) {
    console.error(error.message);
  }
}

getMarketData();

function renderData(data) {
    const resData = data.data;
    
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; 
    let count = 0;
    for (const coin of resData) {
      const tableRow = document.createElement("tr");
      tableRow.className="even:dark:bg-neutral-800 bg-neutral-900"
    
      const countTd = document.createElement("td");
      countTd.className = "px-6 py-4 max-w-2";
      count++;
      countTd.innerText = count; 
      tableRow.appendChild(countTd);

      const nameTd = document.createElement("td");
      nameTd.className = "px-6 py-4 text-wrap max-w-4";
      nameTd.innerText = coin.name; 
      tableRow.appendChild(nameTd);
    
      tableBody.appendChild(tableRow);
      
    }
  }

  