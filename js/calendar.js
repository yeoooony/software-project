function createCalendar(year, month) {
  const calTitle = document.querySelector(".cal-title");
  const calMonth = calTitle.querySelector(".cal-month");
  const calYear = calTitle.querySelector(".cal-year");
  const calBody = document.querySelector(".cal-body");

  const prevBtn = calTitle.querySelector(".cal-prev");
  const nextBtn = calTitle.querySelector(".cal-next");
  prevBtn.addEventListener("click", () => changeMonth(-1));
  nextBtn.addEventListener("click", () => changeMonth(1));

  updateCalendar(year, month);

  calBody.addEventListener("click", (event) => {
    const selectedDate = event.target.textContent;
    if (selectedDate) {
      const currentDate = new Date(year, month - 1, selectedDate);
      const dates = calBody.querySelectorAll("td");
      dates.forEach((date) => date.classList.remove("selected"));
      event.target.classList.add("selected");
      // 선택한 날짜에 대한 추가 동작 수행
      console.log("Selected date:", currentDate);
    }
  });

  function changeMonth(diff) {
    const newDate = new Date(year, month - 1 + diff);
    year = newDate.getFullYear();
    month = newDate.getMonth() + 1;
    updateCalendar(year, month);
  }

  function updateCalendar(year, month) {
    calMonth.textContent = month + "월";
    calYear.textContent = year;

    calBody.innerHTML = "";

    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();

    let date = 1;
    for (let row = 0; row < 6; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDay) {
          const td = document.createElement("td");
          tr.appendChild(td);
        } else if (date > lastDate) {
          break;
        } else {
          const td = document.createElement("td");
          td.textContent = date;
          tr.appendChild(td);
          const currentDate = new Date(year, month - 1, date);
          if (currentDate.toDateString() === new Date().toDateString()) {
            td.classList.add("today");
          }
          tr.appendChild(td);
          date++;
        }
      }
      calBody.appendChild(tr);
    }
  }
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

createCalendar(currentYear, currentMonth);

