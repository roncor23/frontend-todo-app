<template>
    <div v-show="showModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ TaskData?.id ? 'Edit Task' : 'Add Task' }}</h3>
        <input class="text" v-model="TaskData.title" placeholder="Title" />
        <input class="text" v-model="TaskData.description" placeholder="Description" />
        <select class="dropdown" v-model="TaskData.status">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button @click="TaskData?.id ? updateTask(TaskData) : addTask(TaskData)">{{ TaskData?.id ? 'Update' : 'Save' }}</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showModal: Boolean,
      task: Object
    },
    data() {
      return {
        // Make a copy of the task prop so it's safe to mutate
        TaskData: { ...this.task }
      };
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');  // Emit event to close modal in the parent component
      },
      updateTask(data) {
        // Emit the updated task data back to the parent
        this.$emit('update-task', data);
      },
      addTask(data) {
        // Emit the add task data back to the parent
        this.$emit('add-task', data);
      }
    },
    watch: {
      // Watch for changes to the task prop, and update editTask if necessary
      task(newTask) {
        this.TaskData = { ...newTask };
      }
    }
  };
  </script>
  
  <style scoped>
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

  .text {
    width: 90% !important;
  }
  .dropdown {
    width: 96% !important;
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
  </style>
  