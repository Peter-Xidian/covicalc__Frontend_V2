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

selectOptions.forEach((elm) => {
  elm.addEventListener("click", (event) => {
    const selectedItem = event.target.innerHTML;
    selectedCountryNameList.innerHTML = selectedItem;
    selectOptionsContainer.classList.add("d-select");
    customSelectFlag.setAttribute(
      "src",
      "https://disease.sh/assets/img/flags/br.png"
    );
  });
});

selectedCountryNameList.addEventListener("click", () => {
  selectOptionsContainer.classList.toggle("d-select");
});

customSelectToggleArrow.addEventListener("click", () => {
  selectOptionsContainer.classList.toggle("d-select");
});

async function getCountries(){
    try{
    const countries = await fetch("https://corona.lmao.ninja/v2/countries");
    const to_json = await countries.json();

    console.log(to_json);

    to_json[0].forEach((country) => {
        selectOptionsContainer.innerHTML += `<p class="select__country--name">${country["country"]}</p>`;
    });
}
    catch(e){
        console.log(e)
    }
}

getCountries();

function getSpecificCountry(countryName){
    try{
        const country = fetch(`https://corona.lmao.ninja/v2/countries/${countryName}?yesterday=true&strict=true&query`);
        const country_json = country.json();


    }catch(e){
        console.log(e);
    }
}