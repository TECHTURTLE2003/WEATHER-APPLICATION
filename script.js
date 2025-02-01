document.addEventListener("DOMContentLoaded", () => {
  const cityinput = document.getElementById("city-input");
  const getweatherbtn = document.getElementById("get-weather-btn");
  const weatherinfo = document.getElementById("weather-info");
  const citynamedisplay = document.getElementById("city-name");
  const temperaturedisplay = document.getElementById("temperature");
  const descriptiondisplay = document.getElementById("description");
  const errormessage = document.getElementById("error-message");

  const apikey = "3956ebf07040ac8479058ba5635ddbc4";

  getweatherbtn.addEventListener("click", async () => {
    const city = cityinput.value.trim();
    if (!city) return;

    // it may through an error
    // server/database is always in another continent

    try {
      const weatherdata = await fetchweatherdata(city);
      displayweatherdata(weatherdata);
    } catch (error) {
      showerror();
    }
  });

  async function fetchweatherdata(city) {
    //rets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey} `;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error(" City Not Found ");
    }
    const data = await response.json();
    return data;
  }

  function displayweatherdata(weatherdata) {
    //display
    console.log(weatherdata);
    const { name, main, weather } = weatherdata;
    citynamedisplay.textContent = name;
    temperaturedisplay.textContent = `Temperature : ${main.temp}`;
    descriptiondisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }
  function showerror() {
    weatherinfo.classList.remove("hidden");
    errormessage.classList.add("hidden");
  }
});
