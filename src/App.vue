<template>
  <Table msg="Todo App" 
        :data="tasks"
        @update-task="updateTask"
        @add-task="addTask"
        @delete-task="deleteTask"
        @fetch-tasks="fetchTasks"
        :totalPages=totalPages
        :currentPage="currentPage"
        :lastPage="lastPage"
  />
</template>

<script>
//Components
import Table from './components/Table.vue'
//Services
import api from './services/api';

export default {
    data() {
        return {
            tasks: [],
            page: 1,
            totalPages: 0,
            currentPage: 1,
            lastPage: 1,
        };
    },
    components: {
      Table
    },
    created() {
        this.fetchTasks(this.page);
    },
    methods: {
        async fetchTasks(page) {
            try {
                const response = await api.getTasks(page);
                this.tasks = response?.data.data;
                this.totalPages = response?.data.meta.total;
                this.currentPage = response?.data.meta.current_page;
                this.lastPage = response?.data.meta.last_page;
            } catch (error) {
                console.error("Error fetching tasks", error);
            }
        },
        async updateTask(updatedData) {
            try {
                const response = await api.updateTask(updatedData.id, updatedData);

                // Find the index of the updated task in the local tasks array
                const index = this.tasks.findIndex(task => task.id === updatedData.id);
                
                // Update the item in the tasks array
                if (index !== -1) {
                    this.tasks[index] = response.data; // Directly updating the item triggers reactivity in Vue 3
                }

            } catch (error) {
                console.error("Error updating task", error);
            }
        },
        async addTask(data) {
            try {
                const response = await api.addTask(data);

                // Append the newly created task to the `tasks` array
                this.tasks.push(response.data);

            } catch (error) {
              if (error.response && error.response.status === 422) {
                  console.error("Validation error:", error.response.data.errors?.title[0]);
              } else {
                  console.error("Error adding task", error);
              }
            }
        },
        async deleteTask(tId) {
            try {
                await api.deleteTask(tId);

                // Filter out the deleted task from the `tasks` array
                this.tasks = this.tasks.filter(task => task.id !== tId);

            } catch (error) {
                console.error("Error deleting task", error.response);
            }
        }


    },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
