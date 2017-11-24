import Chart from 'chart.js';
import './index.html';
import './main.css';

// add bar chart
const barChartNode = document.getElementById('testChart').getContext('2d');
const totalMessageNode = document.getElementById('total-message-count');
const chartData = {
  type: 'bar',
  data: {
    labels: [], // array of users
    datasets: [
      {
        label: 'Posts',
        type: 'bar',
        data: [], // values
        backgroundColor: [], // bar colors
        borderColor: [], // bar border colors
        borderWidth: 1,
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Likes',
        type: 'bar',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Likes Per Post',
        type: 'line',
        data: [],
        fill: false,
        borderColor: '#00FF00',
        backgroundColor: '#00FF00',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '3#EC932F',
        yAxisID: 'y-axis-2',
      }],
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            beginAtZero: true,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        }],
    },
  },
};

const createChart = (domNode, data) => new Chart(domNode, data);

const mapResponseToChartData = (response, crtData) => {
  const newData = Object.assign({}, crtData.data);
  const userIds = Object.keys(response);

  // map user names to data labels
  newData.labels = userIds.map(userid => response[userid].name);

  // map message count to posts dataset
  newData.datasets[0].data = userIds.map(userid => response[userid].messages);

  // map like count to likes dataset
  newData.datasets[1].data = userIds.map(userid => response[userid].likes);

  // map like per post count to like per post dataset
  newData.datasets[2].data = userIds.map(userid => response[userid].likesPerMessage);

  // map color blue to backgroundColor array
  // eslint-disable-next-line no-unused-vars
  newData.datasets[0].backgroundColor = userIds.map(userid => 'rgba(0, 0, 255, 0.5)');

  // map color red to backgroundColor array for likes dataset
  // eslint-disable-next-line no-unused-vars
  newData.datasets[1].backgroundColor = userIds.map(userid => 'rgba(255, 0, 0, 0.5)');

  return newData;
};

// create charts
fetch('/api/messages')
  .then(data => data.json())
  .then((json) => {
    const newData = mapResponseToChartData(json.messageStats, chartData);
    totalMessageNode.innerHTML = json.count.toLocaleString();
    chartData.data = newData;
    createChart(barChartNode, chartData);
  })
  .catch(err => console.log(err));

