/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollTop);

/*==================== API ====================*/

/* ==== PER COUNTRY ====*/

// const totalNumber = document.querySelector('#total__num')

// async function getCountry(countryName) {
//     const countries = await fetch("https://corona.lmao.ninja/v2/countries/:query?yesterday=true&strict=true&query");
//     const to_json = await countries.json();

//     console.log(to_json);
// }

/* ==== PER CONTINENTS ====*/
(async function perContinents() {
  try {
    const continent = await fetch("https://corona.lmao.ninja/v2/continents");
    const data = await continent.json();

    let data1 = "";
    data.map((continentValues) => {
      data1 += `<div class="thumbnail">
      <div class="t__info">
        <h3>${continentValues.continent}</h3>
        <h2>${continentValues.todayCases}</h2>
        <p>New Cases</p>
        <span>All Cases: ${continentValues.cases}</span>
      </div>

      <div class="t__stats">
        <div class="ts__a">
          <h2>${continentValues.todayDeaths}</h2>
          <p>New Deaths</p>
          <span>Total Deaths: ${continentValues.deaths}</span>
        </div>
        <div class="ts__b">
          <h2>${continentValues.todayRecovered}</h2>
          <p>Newly Recovered</p>
          <span>Total Recovered: ${continentValues.recovered}</span>
        </div>
        <div class="ts__c">
          <h2>1,878,564</h2>
          <p>New Vaccinated</p>
          <span>Total Vaccinated: 14,784,254</span>
        </div>
      </div>
    </div>`;
    });
    document.getElementById("slider").innerHTML = data1;
  } catch (e) {
    console.log(e);
  }
})();
