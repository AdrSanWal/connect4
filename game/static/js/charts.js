const url = 'http://localhost:8000'


class GameStatistics {
  constructor() {
    this.getStatistics()
  }

  async getStatistics() {
    const response = await fetch(`${url}/stats`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'stats': this.stats,
      })
    })

    const stats = (await response.json()).stats
    this.winners = stats.winners
    this.history = stats.history
    this.histLabels = stats.labels
  }


  async drawCharts(cpu, user) {

    //--------------------------------- Pie Chart ---------------------------------

    const ctxArea = document.querySelector('#areaChart')

    const areaData = {
      labels: [
        'Human',
        'Computer'
      ],
      datasets: [{
        label: ' Total',
        data: [
          this.winners[user.id],
          this.winners[cpu.id]
        ],
        backgroundColor: [
          user.color,
          cpu.color
        ],
        hoverOffset: 20
      }],
    };

    new Chart(ctxArea, {
      type: 'pie',
      data: areaData,
      options: {
        responsive: true,
        layout: {
          padding: 10
      },
        plugins: {
          legend: {
            display: false,
            position: 'right',
            labels: {
                color: 'black'
            },
          }
        }
      }
    })

    //--------------------------------- Line Chart ---------------------------------

    const ctxLine = document.querySelector('#lineChart')

    const lineData = {
      labels: this.histLabels,
      datasets: [{
        data: this.history,
        fill: false,
        borderColor: 'orange',
        tension: 0.3,
      }]
    };

    new Chart(ctxLine, {
      type: 'line',
      data: lineData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            ticks: {
              min: 1,
              max: 2,
              stepSize: 0.5,
              // Include a dollar sign in the ticks
              callback: function(value) {
                if (value == 2) {return 'Human'}
                else if (value == 1) {return 'Computer'}
                else {return ''}
              },
            }
          }
        }
      }
    })
  }
}
