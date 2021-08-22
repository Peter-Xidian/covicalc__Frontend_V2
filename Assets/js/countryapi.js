const selectOptions = document.querySelectorAll(".select__country--name");
const selectedCountryNameList = document.querySelector(
  ".select__country--name--selected"
);
const selectOptionsContainer = document.querySelector(
  ".select__country--name--list"
);
const customSelectToggleArrow = document.querySelector(
  ".select__country--arrowDown"
);
const customSelectFlag = document.querySelector(".select__flag--img");
const body = document.querySelector("body");

selectedCountryNameList.addEventListener("click", () => {
  selectOptionsContainer.classList.toggle("d-select");
  document.querySelectorAll(".select__country--name")[0].style.backgroundColor =
    "#eee";
});

customSelectToggleArrow.addEventListener("click", () => {
  selectOptionsContainer.classList.toggle("d-select");
  document.querySelectorAll(".select__country--name")[0].style.backgroundColor =
    "#eee";
});

async function getCountries() {
  try {
    const countries = await fetch("https://corona.lmao.ninja/v2/countries");
    const to_json = await countries.json();

    to_json.forEach((country) => {
      selectOptionsContainer.innerHTML += `<p class="select__country--name" data-flag-src="${country.countryInfo.flag}">${country["country"]}</p>`;
    });

    selectedCountryNameList.innerHTML = to_json[0]["country"];

    setCountryData(
      to_json[0]["cases"],
      to_json[0]["tests"],
      to_json[0]["active"],
      to_json[0]["critical"],
      to_json[0]["recovered"],
      to_json[0]["deaths"]
    );

    customSelectFlag.setAttribute("src", `${to_json[0].countryInfo.flag}`);

    document.querySelectorAll(".select__country--name").forEach((elm) => {
      elm.addEventListener("click", (event) => {
        const selectedItem = event.target.innerHTML;
        selectedCountryNameList.innerHTML = selectedItem;
        selectOptionsContainer.classList.add("d-select");
        const select__el = event.target;
        console.log(select__el.dataset.flagSrc);
        customSelectFlag.setAttribute("src", `${select__el.dataset.flagSrc}`);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

getCountries();

async function getSpecificCountry(c_name, c_date = null) {
  try {
    const country = await fetch(
      `https://corona.lmao.ninja/v2/countries/${c_name}?yesterday=true&strict=true&query`
    );
    const country_json = await country.json();

    setCountryData(
      country_json["cases"],
      country_json["tests"],
      country_json["active"],
      country_json["critical"],
      country_json["recovered"],
      country_json["deaths"]
    );
  } catch (e) {
    console.log(e);
  }
}

function setCountryData(
  cumulative_d,
  test_d,
  pCases_d,
  hospitalized_d,
  recovered_d,
  deaths_d
) {
  const test = document.querySelector("#test");
  const pCases = document.querySelector("#p__cases");
  const hospitalized = document.querySelector("#hospitalized");
  const recovered = document.querySelector("#recovered");
  const deaths = document.querySelector("#deaths");
  const cumulative = document.querySelector("#total__num");

  cumulative.innerHTML = cumulative_d;
  test.innerHTML = test_d;
  pCases.innerHTML = pCases_d;
  recovered.innerHTML = recovered_d;
  deaths.innerHTML = deaths_d;
  hospitalized.innerHTML = hospitalized_d;
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedDate = document.querySelector("#date").value;
  const selectedCountry = document.querySelector(
    ".select__country--name--selected"
  ).innerHTML;

  if (selectedDate && selectedCountry) {
    getSpecificCountry(selectedCountry, new Date(selectedDate).toISOString());
  }
});
