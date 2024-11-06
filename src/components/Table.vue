<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="openAddTaskModal" class="add-task-btn">Add Task</button>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in data" :key="d.id">
                <td>{{ d.id }}</td>
                <td>{{ d.title }}</td>
                <td>{{ d.description }}</td>
                <td>{{ d.status }}</td>
                <td class="action-btns">
                    <button class="edit-btn" @click="editRow(d)">Edit</button>
                    <button class="delete-btn" @click="confirmDelete(d.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="fetchTasks(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="fetchTasks(currentPage + 1)" :disabled="currentPage === lastPage">Next</button>
    </div>

    <!-- Modal -->
    <TaskModal 
      :showModal="showAddTaskModal || showEditModal" 
      :task="editTask?.id ? editTask : newTask" 
      @close-modal="closeModal" 
      @update-task="updateTask" 
      @add-task="addTask" 

    />

    <!-- Delete Confirmation Modal -->
     <DeleteTaskModal
        :showDeleteModal="showDeleteModal"
        @delete-task="deleteTask"
        @close-modal="closeModal"

     />

  </div>
</template>

<script>
import TaskModal from './TaskModal.vue';
import DeleteTaskModal from './DeleteTaskModal.vue';

export default {
  name: 'TaskTable',
  props: {
    msg: String,
    data: Array,
    totalPages: Number,
    currentPage: Number,
    lastPage: Number,
  },
  components: {
    TaskModal,
    DeleteTaskModal,
  },
  data() {
    return {
      showAddTaskModal: false,
      showEditModal: false,
      showDeleteModal: false,
      newTask: {
        title: '',
        description: '',
        status: 'pending'
      },
      editTask: {},
      taskToDelete: null
    };
  },
  methods: {
    fetchTasks(page = 1) {
      // Fetch tasks for the current page
      this.$emit('fetch-tasks', page);  // Pass the page number to the parent
    },
    openAddTaskModal() {
      this.showAddTaskModal = true;
    },
    closeModal() {
      this.showAddTaskModal = false;
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.editTask = {};  // Reset edit task data
      this.newTask = { title: '', description: '', status: 'pending' }; // Reset new task data
    },
    addTask(data) {
      if (!data.title || !data.description) {
        alert("Title and Description are required!");
        return;
      }

      this.$emit('add-task', data);  // Emit the add task data back to the parent
      this.closeModal();
    },
    editRow(task) {
      this.editTask = task; // Make a copy of the task data
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showModal = false;
      this.editTask = { id: null, title: '', description: '', status: 'pending' };
    },
    updateTask(data) {
      this.$emit('update-task', data);  // Emit the update task data back to the parent
      this.closeModal();
    },
    confirmDelete(taskId) {
      this.taskToDelete = taskId;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.taskToDelete = null;
    },
    deleteTask() {
      this.$emit('delete-task', this.taskToDelete); // Emit the delete task event
      this.closeDeleteModal(); // Close the modal after deleting
      alert("Task deleted successfully");
    }
  }
}
</script>

<style scoped>
/* Basic table styling */
table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

/* Style for the action buttons */
.action-btns {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
}

.delete-btn:hover {
  background-color: #e53935;
}

/* Optional: Adding a hover effect on rows */
tr:hover {
  background-color: #f1f1f1;
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal input,
.modal select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal button {
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.modal button:hover {
  opacity: 0.8;
}

/* Add Task Button */
.add-task-btn {
  margin: 10px;
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.add-task-btn:hover {
  background-color: #1976D2;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
}

.pagination button:hover {
  background-color: #1976D2;
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>
