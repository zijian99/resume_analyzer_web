<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<template>
  <div class="upload-container">
    <h2>Upload Resume</h2>
    <input type="file" @change="handleFileUpload" accept=".pdf,.doc,.docx" />
    <button @click="submitResume" :disabled="!resumeFile">Upload</button>

    <div v-if="loading">Analyzing resume...</div>

    <div v-if="result">
      <h3>Analysis Result</h3>
      <p><strong>Score:</strong> {{ result.score }}</p>
      <p><strong>Feedback:</strong> {{ result.feedback }}</p>
      <h4>Suggestions:</h4>
      <ul>
        <li v-for="(suggestion, index) in result.suggestions" :key="index">
          {{ suggestion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      resumeFile: null,
      loading: false,
      result: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.resumeFile = event.target.files[0];
    },
    async submitResume() {
      if (!this.resumeFile) {
        alert("Please select a resume file.");
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.resumeFile);

      try {
        const response = await axios.post("http://127.0.0.1:8000/upload-resume/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.result = response.data.analysis;
        console.log(this.result)
        // console.log(this.result.analysis)
      } catch (error) {
        console.log("Error uploading resume:", error);
        alert("Failed to upload. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.upload-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
