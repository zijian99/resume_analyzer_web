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

    <hr />

    <!-- Text Correction Section -->
    <h2>Text Grammar & Spell Check</h2>
    <textarea v-model="userText" placeholder="Enter text here..." rows="5"></textarea>
    <button @click="checkText" :disabled="!userText">Check</button>

    <div v-if="textAnalysis">
      <h3>Corrected Text</h3>
      <p class="corrected-text" v-html="highlightedCorrectedText"></p>

      <h4>Spelling Mistakes</h4>
      <table class="error-table">
        <thead>
          <tr>
            <th>Misspelled Word</th>
            <th>Corrected Word</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(error, index) in textAnalysis.spelling_errors" :key="'spelling' + index">
            <td>{{ error.original }}</td>
            <td>{{ error.corrected }}</td>
          </tr>
        </tbody>
      </table>

      <h4>Grammar Mistakes</h4>
      <table class="error-table">
        <thead>
          <tr>
            <th>Original Text</th>
            <th>Corrected Text</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(error, index) in textAnalysis.grammar_errors" :key="'grammar' + index">
            <td>{{ error.original }}</td>
            <td>{{ error.corrected }}</td>
            <td>{{ error.suggestion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      resumeFile: null,
      userText: "", // Editable text input
      loading: false,
      result: null,
      textAnalysis: null,
    };
  },
  computed: {
    highlightedCorrectedText() {
      if (!this.textAnalysis) return "";
      let correctedText = this.textAnalysis.corrected_text;

      // Highlight changed words
      this.textAnalysis.grammar_errors.forEach((error) => {
        const regex = new RegExp(error.corrected, "gi");
        correctedText = correctedText.replace(regex, `<span class="highlight">${error.corrected}</span>`);
      });

      return correctedText;
    },
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
        const response = await axios.post("http://127.0.0.1:8000/upload_resume/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.result = response.data.analysis;
      } catch (error) {
        console.log("Error uploading resume:", error);
        alert("Failed to upload. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    async checkText() {
      if (!this.userText) {
        alert("Please enter text for analysis.");
        return;
      }

      try {
        const response = await axios.post("http://127.0.0.1:8000/check_text/", {
          text: this.userText,
        });

        this.textAnalysis = response.data;
      } catch (error) {
        console.error("Error analyzing text:", error);
        alert("Failed to analyze text. Please try again.");
      }
    },
  },
};
</script>

<style>
.upload-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

.corrected-text {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white; /* No background color */
}

.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* Table Styles */
.error-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.error-table th, .error-table td {
  border: 1px solid #ddd;
  background-color: white;
  padding: 8px;
}

.error-table th {
  background-color: white;
  font-weight: bold;
}
</style>
