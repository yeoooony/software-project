const time = document.querySelector(".clock-time");
const fullDate = document.querySelector(".clock-date");

function getClock() {
  const date = new Date();
  const hours = date.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  const hour12 = hours % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ];
  const month = months[date.getMonth()];

  time.textContent = `${ampm} ${hour12}:${minutes}:${seconds}`;
  fullDate.textContent = `${date.getFullYear()}년 ${month} ${date.getDate()}일 ${dayOfWeek}`;
}

getClock();
setInterval(getClock, 1000);
