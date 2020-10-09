<template>
  <div class="container">
    <div class="row mb-2">
      <div class="col">
        <h1>Dashboard</h1>
      </div>
    </div>
    <b-card-group deck>
      <b-card
        bg-variant="primary"
        text-variant="white"
        header="Tasks"
        class="text-center"
      >
        <h1>{{ tasks.length }}</h1>
      </b-card>

      <b-card
        bg-variant="secondary"
        text-variant="white"
        header="Projects"
        class="text-center"
      >
        <h1>{{ projects.length }}</h1>
      </b-card>

      <b-card
        bg-variant="success"
        text-variant="white"
        header="Users"
        class="text-center"
      >
        <h1>{{ users.length }}</h1>
      </b-card>
    </b-card-group>
    <div class="row mb-5">
      <div class="col-lg">
        <div>
          <PieChart
            style="max-with: 600px !important"
            v-if="PieChartLoaded"
            class="pt-5"
            :data="pieChartData"
            :options="pieChartOptions"
            :height="250"
          />
        </div>
      </div>

      <div class="col-lg">
        <BarChart
          v-if="PieChartLoaded"
          class="pt-5"
          :data="barChartData"
          :options="barChartOptions"
          :height="250"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      PieChartLoaded: false,
      barChartData: {
        labels: null,
        datasets: [
          {
            label: "Tasks",
            data: null,
            backgroundColor: "#007bff",
          },
        ],
      },
      pieChartData: {
        labels: ["Complete", "Incomplete"],
        datasets: [
          {
            label: "Tasks",
            data: null,
            backgroundColor: ["#28a745", "#6c757d"],
          },
        ],
      },
      pieChartOptions: {
        responsive: true,
        title: {
          display: true,
          text: "Completed Tasks",
          fontSize: 24,
          fontColor: "#212529",
        },
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Top Tasks per Project",
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
                precision: 0,
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
  computed: {
    ...mapGetters("tasks", ["tasks", "getCompletedTasks"]),
    ...mapGetters("projects", ["projects"]),
    ...mapGetters("users", ["users"]),
  },
  async mounted() {
    try {
      let pieChartDataArray = [];
      let { data: axiosTasks } = await this.$axios.$get("/tasks");

      let completedTasks = axiosTasks.filter((task) => task.finished == true);

      pieChartDataArray.push(completedTasks.length);

      let incompleteTasks =
        Number(axiosTasks.length) - Number(completedTasks.length);

      pieChartDataArray.push(incompleteTasks);

      // Assign the Data
      this.pieChartData.datasets[0].data = pieChartDataArray;

      let BarChartLabelsArray = [];
      let BarChartDataArray = [];

      var counts = {};

      axiosTasks.forEach(function (x) {
        if (x.project) {
          counts[x.project.title] = (counts[x.project.title] || 0) + 1;
        }
      });

      for (const [key, value] of Object.entries(counts)) {
        BarChartLabelsArray.push(key);
        BarChartDataArray.push(value);
      }

      // Assign the Data
      this.barChartData.labels = BarChartLabelsArray;
      this.barChartData.datasets[0].data = BarChartDataArray;

      this.PieChartLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  watch: {},
  created() {},
};
</script>

<style>
</style>