/*==================================================START-GLOBAL==================================================*/
let currentDegree = document.querySelector(".currentDegree")
    , currentStatus = document.querySelector(".currentStatus")
    , currentAddress = document.querySelector(".currentAddress")
    , currentIcon = document.querySelector("img.currentIcon")
    , dayOne = document.querySelector(".dayOne")
    , afterTomowroo = document.querySelector(".afterTomowroo")
    , dayTwo = document.querySelector(".dayTwo")
    , days = ["Sunday", "Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday"]
    , months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    , nextDayDegreeUP = document.querySelector("p.nextDayDegreeUP")
    , nextDayDegreeDown = document.querySelector("p.nextDayDegreeDown")
    , expextedStatus = document.querySelector("p.expextedStatus")
    , nexDayIcon = document.querySelector("img.nexDayIcon")
    , DayAndMonth = document.querySelector(".DayAndMonth")
    , StatusText = document.querySelector(".StatusText")
    , thirdDayDegreeDown = document.querySelector(".thirdDayDegreeDown")
    , dayThreeImage = document.querySelector(".dayThreeImage")
    , thirdDayDegreeUp = document.querySelector(".thirdDayDegreeUp")
    , citySearch = document.querySelector(".citySearch")
    , searchValue = citySearch.value || "Cairo"
    , emailInputRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    , emailInputSub = document.querySelector(".emailInputSub")
    , boxmodal = document.querySelector(".box-modal")
    , alertMessage = document.querySelector(".alertMessage")
    , emailsubmit = document.querySelector(".emailsubmit");
/*==================================================END-GLOBAL==================================================*/

/*==================================================START-FUNCTIONS==================================================*/
function MAIN(nameOfRequest, serach) {
    nameOfRequest = new XMLHttpRequest();
    nameOfRequest.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=80c1054157d7426698e53151242312&q=${serach}&days=3`);
    nameOfRequest.send();
    nameOfRequest.responseType = 'json';
    function dayName(dayTarget, index) {
        let forecastDays = nameOfRequest.response.forecast.forecastday, dayNames = forecastDays.map(day => {
            let date = day.date;
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        });
        dayTarget.innerHTML = dayNames[index];
    }
    nameOfRequest.addEventListener("load", function () {
        /*DayOne DIV*/
        dayName(dayOne, 0);
        let location = nameOfRequest.response.location.name
            , conditionText = nameOfRequest.response.current.condition.text
            , currentTemp = nameOfRequest.response.current.temp_c + "<sup>O</sup>" + "C"
            , icon = nameOfRequest.response.current.condition.icon
            , nameMonth = +nameOfRequest.response.forecast.forecastday[0].date.split("-").reverse().splice(1, 1).join() - 1
            , monthApi = nameOfRequest.response.forecast.forecastday[0].date.split("-").reverse().splice(0, 1).join();
        currentAddress.textContent = location;
        currentStatus.textContent = conditionText;
        currentDegree.innerHTML = currentTemp;
        currentIcon.setAttribute("src", `${icon}`);
        DayAndMonth.innerHTML = monthApi + months[nameMonth];
        /*DayTwo DIV */
        dayName(dayTwo, 1);
        let mintemp_c = nameOfRequest.response.forecast.forecastday[1].day.mintemp_c + "<sup>O</sup>"
            , maxtemp_c = nameOfRequest.response.forecast.forecastday[1].day.maxtemp_c + "<sup>O</sup>" + "C"
            , conditionTextTwo = nameOfRequest.response.forecast.forecastday[1].day.condition.text
            , iconTwo = nameOfRequest.response.forecast.forecastday[1].day.condition.icon;
        nextDayDegreeDown.innerHTML = mintemp_c;
        nextDayDegreeUP.innerHTML = maxtemp_c;
        expextedStatus.textContent = conditionTextTwo;
        nexDayIcon.setAttribute("src", `${iconTwo}`);
        /*DayThree Div*/
        dayName(afterTomowroo, 2);
        let conditionTextThree = nameOfRequest.response.forecast.forecastday[2].day.condition.text
            , iconThree = nameOfRequest.response.forecast.forecastday[2].day.condition.icon
            , mintemp_cDayThree = nameOfRequest.response.forecast.forecastday[2].day.mintemp_c + "<sup>O</sup>"
            , maxtemp_cDayThree = nameOfRequest.response.forecast.forecastday[2].day.maxtemp_c + "<sup>O</sup>" + "C";
        StatusText.textContent = conditionTextThree;
        thirdDayDegreeDown.innerHTML = mintemp_cDayThree;
        thirdDayDegreeUp.innerHTML = maxtemp_cDayThree;
        dayThreeImage.setAttribute("src", `${iconThree}`);
    });
}
function getLocation() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            let searchbyPositionUser = `${position.coords.latitude} , ${position.coords.longitude}`
                , positionrequest = "postionrequest";
            MAIN(positionrequest, searchbyPositionUser);
        },
        function () {
            let errorLocate = "errorLocate";
            MAIN(errorLocate, searchValue);
        }
    );
}
getLocation();
/*==================================================END-FUNCTIONS==================================================*/

/*==================================================START-EVENTS==================================================*/
citySearch.addEventListener("input", function () {
    if (citySearch.value === "") {
        searchValue = "Cairo";
        let defualtRequest = "defualtRequest";
        MAIN(defualtRequest, searchValue);
    } else {
        searchValue = citySearch.value;
        let inputRequest = "inputRequest"
        MAIN(inputRequest, searchValue)
    }
});
emailsubmit.addEventListener("click", function () {
    if (emailInputRegex.test(emailInputSub.value)) {
        boxmodal.classList.remove("d-none")
        setTimeout(() => {
            boxmodal.classList.add("d-none")
        }, 2000);
        alertMessage.classList.add("d-none");
        emailInputSub.value = null;
    } else {
        alertMessage.classList.remove("d-none")
    }
});
/*==================================================END-EVENTS==================================================*/