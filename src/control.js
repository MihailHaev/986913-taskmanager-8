import flatpickr from 'flatpickr';
import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import createElement from './element';

const tasksContainer = document.querySelector(`.board__tasks`);
const statisticContainer = document.querySelector(`.statistic`);
const statisticTagsWrap = document.querySelector(`.statistic__tags-wrap`);
const statisticColorWrap = document.querySelector(`.statistic__colors-wrap`);
let tagsCtx = document.querySelector(`.statistic__tags`);
let colorsCtx = document.querySelector(`.statistic__colors`);
let itHaveChart = false;

const reloadCanvas = (ctx, addedClass) => {
  ctx.remove();
  ctx = createElement(`<canvas class="statistic__${addedClass}" width="400" height="300"></canvas>`);
  return ctx;
};

export const openTasks = () => {
  tasksContainer.classList.remove(`visually-hidden`);
  statisticContainer.classList.add(`visually-hidden`);
};

export const openStatistic = (tasks) => {
  tasksContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);
  statisticTagsWrap.classList.remove(`visually-hidden`);
  statisticColorWrap.classList.remove(`visually-hidden`);
  const periodValue = document.querySelector(`.statistic__period-input`).value;

  if (periodValue.includes(` - `)) {
    const [startDay, endDay] = periodValue.split(` - `);
    const start = moment(startDay, `DD MMM`).toDate();
    const end = moment(endDay, `DD MMM`).toDate();
    tasks = tasks.filter((task) => {
      const dayOfTask = moment(task.dueDate).toDate();
      return (start <= dayOfTask && end >= dayOfTask);
    });
  } else if (periodValue === ``) {
    const weekStart = moment().startOf(`week`).toDate();
    const weekEnd = moment().endOf(`week`).toDate();
    tasks = tasks.filter((task) => {
      const dayOfTask = moment(task.dueDate).toDate();
      return (weekStart <= dayOfTask && weekEnd >= dayOfTask);
    });
  } else {
    return;
  }

  const tags = {};

  const colors = {};

  const dataColors = [];
  const dataTags = [];
  const labelsTags = [];
  const labelsColors = [];
  const bgColors = [];

  tasks.forEach((task) => {
    for (let tag of task.tags) {
      if (tags.hasOwnProperty(tag)) {
        tags[tag] = tags[tag] + 1;
      } else {
        tags[tag] = 1;
      }
    }

    if (colors.hasOwnProperty(task.color)) {
      colors[task.color] = colors[task.color] + 1;
    } else {
      colors[task.color] = 1;
    }
  });

  for (let key in tags) {
    if (tags.hasOwnProperty(key)) {
      dataTags.push(tags[key]);
      labelsTags.push(`#${key}`);
    }
  }

  for (let key in colors) {
    if (colors.hasOwnProperty(key)) {
      dataColors.push(colors[key]);
      labelsColors.push(`#${key}`);
      switch (key) {
        case `black`:
          bgColors.push(`#000000`);
          break;
        case `blue`:
          bgColors.push(`#0c5cdd`);
          break;
        case `yellow`:
          bgColors.push(`#ffe125`);
          break;
        case `green`:
          bgColors.push(`#31b55c`);
          break;
        case `pink`:
          bgColors.push(`#ff3cb9`);
          break;
      }
    }
  }
  if (itHaveChart) {
    tagsCtx = reloadCanvas(tagsCtx, `tags`);
    statisticTagsWrap.appendChild(tagsCtx);

    colorsCtx = reloadCanvas(colorsCtx, `colors`);
    statisticColorWrap.appendChild(colorsCtx);
  }

  const tagsChart = new Chart(tagsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: labelsTags,
      datasets: [{
        data: dataTags,
        backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`]
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: TAGS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });

  // В разрезе цветов
  const colorsChart = new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: labelsColors,
      datasets: [{
        data: dataColors,
        backgroundColor: bgColors
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
  itHaveChart = true;
};

flatpickr(`.statistic__period-input`, {altInput: true, altFormat: `d M`, mode: `range`, dateFormat: `d M`, locale: {rangeSeparator: ` - `}, weekNumbers: true});
const statisticInput = document.querySelector(`.statistic__period-input[type="text"]`);
const weekStart = moment().startOf(`week`).format(`DD MMM`);
const weekEnd = moment().endOf(`week`).format(`DD MMM`);
statisticInput.placeholder = `${weekStart} - ${weekEnd}`;

