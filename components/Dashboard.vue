<template>
  <div class="container">
    <b-card-group deck>
      <b-card
        bg-variant="primary"
        text-variant="white"
        header="Tasks"
        class="text-center"
      >
        <b-card-text>
          <h1>37</h1>
        </b-card-text>
      </b-card>

      <b-card
        bg-variant="secondary"
        text-variant="white"
        header="Projects"
        class="text-center"
      >
        <b-card-text>
          <h1>7</h1>
        </b-card-text>
      </b-card>

      <b-card
        bg-variant="success"
        text-variant="white"
        header="Users"
        class="text-center"
      >
        <b-card-text>
          <h1>15</h1>
        </b-card-text>
      </b-card>
    </b-card-group>
    <div class="row">
      <div class="col">
        <bar-chart
          class="pt-5"
          :data="barChartData"
          :options="barChartOptions"
          :height="250"
        />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barChartData: {
        labels: ["Mindz", "Pitonsark", "Natta", "Juan", "Paco"],
        datasets: [
          {
            label: "Tasks",
            data: [10, 15, 22, 30, 40],
            backgroundColor: "#007bff",
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Users Assigned to Tasks",
          fontSize: 24,
          fontColor: "#212529",
        },
        tooltips: {
          backgroundColor: "#17BF62",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style>
</style>