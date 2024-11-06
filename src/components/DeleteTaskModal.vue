<template>
    <div v-show="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Are you sure you want to delete this task?</h3>
        <button @click="deleteTask">Yes, Delete</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showDeleteModal: Boolean,
      taskId: Number
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      deleteTask() {
        this.$emit('delete-task', this.taskId);
        this.closeModal();
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
  