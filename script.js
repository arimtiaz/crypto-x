// TODO - Fetch Data

//Fetching Data

const key = 	
'9c015b1d-fb2b-4af2-8d52-3343a74f6e36'

async function getMarketData() {
  try {
    const response = await fetch('https://api.mobula.io/api/1/market/data?asset=Bitcoin', {
        headers: {
            'Authorization': `${key}`
        }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    renderData(data)
  } catch (error) {
    console.error(error.message);
  }
}

getMarketData()


function renderData(data){
    
}