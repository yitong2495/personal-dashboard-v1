// fetch(
//     "https://api.unsplash.com/photos/random?query=spring&orientation=landscape&client_id=V0AIGKhJgUqYl_nLhBrvLlR_zNi4cblaEEJ_zvg2w1c"
// )
// "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=spring"
//
//  Background Image
fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=spring"
)
    .then((res) => res.json())
    .then((data) => {
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch((err) => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTgyODkyNjM&ixlib=rb-1.2.1&q=80)`;
        document.getElementById("author").textContent = `By: Marivi Pazos`;
    });

// Bitcoin Info Section
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then((res) => res.json())
    .then((data) => {
        document.querySelector(".coinInfo").innerHTML = `
    <div class="coinTitle">
        <img src = ${data.image.small}/>
        <p>${data.name} </p>
    </div>
    <div class="coinPrice"> 
        <p>🎯:  ¥ ${data.market_data.current_price.cny}</p>
        <p>👆:  ¥ ${data.market_data.high_24h.cny}</p>
        <p>👇:  ¥ ${data.market_data.low_24h.cny}</p>
    </div>
    `;
    })
    .catch((err) => console.err(err));

// Time Zone
function getCurrentTime() {
    var date = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    }); // for now
    document.querySelector(".time").textContent = `${date}`;
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
    fetch(
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    )
        .then((res) => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="temp">${Math.round(data.main.temp)}°</p>
                <p class="city">${data.name}</p>
            `;
        })
        .catch((err) => console.error(err));
});
