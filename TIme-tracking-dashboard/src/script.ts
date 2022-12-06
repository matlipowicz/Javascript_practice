"use strict";

//* Buttons
const periodButtons = document.querySelectorAll(".user_period-button")!;

//? Dlaczego musze określać konkretnie, że dany element jest paragrafem? Widziałem też sposób z "!" na samym końcu, który wskazuje, że jestem świadomy o istnieniu tego elementu, próbowałem tak, ale jak chciałem użyć jakiejś metody na elemencie to wyrzucało mi, że nie mogę
//* Paragraphs hours (current)
const currHoursWork = document.querySelector(".report_work-description-time") as HTMLParagraphElement;
const currHoursPlay = document.querySelector(".report_play-description-time") as HTMLParagraphElement;
const currHoursStudy = document.querySelector(".report_study-description-time") as HTMLParagraphElement;
const currHoursExercise = document.querySelector(".report_exercise-description-time") as HTMLParagraphElement;
const currHoursSocial = document.querySelector(".report_social-description-time") as HTMLParagraphElement;
const currHoursSelfCare = document.querySelector(".report_self-care-description-time") as HTMLParagraphElement;

const currentTime = [currHoursWork, currHoursPlay, currHoursStudy, currHoursExercise, currHoursSocial, currHoursSelfCare];

//* Paragraphs hours (current)
const prevHoursWork = document.querySelector(".report_work-comparison-duration") as HTMLParagraphElement;
const prevHoursPlay = document.querySelector(".report_play-comparison-duration") as HTMLParagraphElement;
const prevHoursStudy = document.querySelector(".report_study-comparison-duration") as HTMLParagraphElement;
const prevHoursExercise = document.querySelector(".report_exercise-comparison-duration") as HTMLParagraphElement;
const prevHoursSocial = document.querySelector(".report_social-comparison-duration") as HTMLParagraphElement;
const prevHoursSelfCare = document.querySelector(".report_self-care-comparison-duration") as HTMLParagraphElement;

const previousTime = [prevHoursWork, prevHoursPlay, prevHoursStudy, prevHoursExercise, prevHoursSocial, prevHoursSelfCare];

const url = "../data.json";

//! Fetched data from JSON file

function getData(): void {
    fetch(url)
        .then((response) => response.json())
        .then((data) => activity(data))
        .catch((error) => {
            console.error(error);
        });
}

getData();

//? Jakie typy danych mógłbym przypisać do poniższych funkcji? Nie orientuje się jeszcze jak i co tutaj ;/
//! Display data
function activity(data: any) {
    eventHandler(data);
}

//! Active button

function activeBtn(btn: any) {
    periodButtons.forEach((e: any) => {
        e.classList.remove("active");
        btn.classList.add("active");
    });
}

//! Handle click

function eventHandler(data: any) {
    periodButtons.forEach((item: any) => {
        item.addEventListener("click", (e: Event) => {
            let dataType = item.dataset.period;
            activeBtn(e.target);

            if (dataType === "Daily") {
                for (let i = 0; i < data.length; i++) {
                    currentTime[i].textContent = data[i].timeframes.daily.current + "hrs";
                    previousTime[i].textContent = "Last Week - " + data[i].timeframes.daily.previous + "hrs";
                }
            } else if (dataType === "Weekly") {
                for (let i = 0; i < data.length; i++) {
                    currentTime[i].textContent = data[i].timeframes.weekly.current + "hrs";
                    previousTime[i].textContent = "Last Week - " + data[i].timeframes.weekly.previous + "hrs";
                }
            } else if (dataType === "Monthly") {
                for (let i = 0; i < data.length; i++) {
                    currentTime[i].textContent = data[i].timeframes.monthly.current + "hrs";
                    previousTime[i].textContent = "Last Week - " + data[i].timeframes.monthly.previous + "hrs";
                }
            }
        });
    });
}
