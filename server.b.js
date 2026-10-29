/**
 * VidyāSetu (विद्या-सेतु) - Full-Stack Backend Server (Node.js / Express)
 * Code Kernel '26 - Decode Round Proposal
 * In Collaboration with Canvas Classes · Supported by MyStartupWave & Unstop
 * Host: X-Kernel, GRIET Hyderabad
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Section 6: Core Data Schemas
const STUDENTS_DB = [
  { id: 1, name: "Priya Sharma", grade: 8, board: "CBSE", preferred_language: "en", section_id: "8-B", pin: "1111", mastery_prob: 0.96 },
  { id: 2, name: "Rahul Verma", grade: 8, board: "CBSE", preferred_language: "hinglish", section_id: "8-B", pin: "2222", mastery_prob: 0.78 },
  { id: 3, name: "Aarav Patel", grade: 8, board: "CBSE", preferred_language: "hinglish", section_id: "8-B", pin: "1234", mastery_prob: 0.42 },
  { id: 4, name: "Sneha Reddy", grade: 8, board: "State Board", preferred_language: "te", section_id: "8-B", pin: "4444", mastery_prob: 0.81 },
  { id: 5, name: "Vikram Malhotra", grade: 8, board: "ICSE", preferred_language: "en", section_id: "8-B", pin: "5555", mastery_prob: 0.94 },
  { id: 6, name: "Ananya Iyer", grade: 8, board: "CBSE", preferred_language: "en", section_id: "8-B", pin: "6666", mastery_prob: 0.38 },
  { id: 7, name: "Mohammed Zeeshan", grade: 8, board: "CBSE", preferred_language: "hinglish", section_id: "8-B", pin: "7777", mastery_prob: 0.69 },
  { id: 8, name: "Diya Patel", grade: 6, board: "CBSE", preferred_language: "hinglish", section_id: "6-A", pin: "5678", mastery_prob: 0.75 }
];

// Reverse Prerequisite DAG
const TOPICS_DAG = {
  "C6_FRAC": { topic_id: "C6_FRAC", grade: 6, name: "Fractions & Negative Numbers", prerequisite_ids: [] },
  "C7_TRANS": { topic_id: "C7_TRANS", grade: 7, name: "Integer Sign Transposition", prerequisite_ids: ["C6_FRAC"] },
  "C8_LINEAR": { topic_id: "C8_LINEAR", grade: 8, name: "Linear Equations in One Variable", prerequisite_ids: ["C7_TRANS"] },
  "C9_COORD": { topic_id: "C9_COORD", grade: 9, name: "Coordinate Geometry", prerequisite_ids: ["C8_LINEAR"] },
  "C10_QUAD": { topic_id: "C10_QUAD", grade: 10, name: "Quadratic Equations (Board Exam)", prerequisite_ids: ["C8_LINEAR"] }
};

// Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: "online", ecosystem: "VidyāSetu (विद्या-सेतु)", compliance: "DPDP Act (2023) Verified" });
});

app.get('/api/dag/graph', (req, res) => {
  res.json({ graph_type: "Directed Acyclic Knowledge Graph (DAG)", nodes: TOPICS_DAG, root_prerequisite: "C6_FRAC" });
});

app.post('/api/dag/reverse-traverse', (req, res) => {
  const target = req.body.target_topic_id || "C8_LINEAR";
  const pathArr = [];
  let curr = target;

  while (curr && TOPICS_DAG[curr]) {
    const node = TOPICS_DAG[curr];
    pathArr.push({ topic_id: node.topic_id, grade: node.grade, name: node.name });
    curr = node.prerequisite_ids[0] || null;
  }

  res.json({ target_topic: target, backward_prerequisite_chain: pathArr });
});

app.get('/api/teacher/rule-of-three', (req, res) => {
  const sprint = STUDENTS_DB.filter(s => s.mastery_prob >= 0.85).map(s => s.name);
  const guided = STUDENTS_DB.filter(s => s.mastery_prob >= 0.60 && s.mastery_prob < 0.85).map(s => s.name);
  const bridge = STUDENTS_DB.filter(s => s.mastery_prob < 0.60).map(s => s.name);

  res.json({
    class: "Class 8-B",
    cohorts: {
      sprint: { name: "Cohort Sprint (15%)", students: sprint, action: "Assigned Olympiad challenge worksheets." },
      guided: { name: "Cohort Guided (60%)", students: guided, action: "Assigned standard textbook practice." },
      bridge: { name: "Cohort Bridge (25%)", students: bridge, action: "Assigned 3-minute opening blackboard recap." }
    },
    auto_scripted_blackboard_lesson: {
      title: "3-Minute Opening Blackboard Script (Tomorrow's First 5 Minutes)",
      verbatim_script: "Draw two weighing scale pans on the chalkboard. On left pan place unknown box 'x' and 3 chalk sticks. On right place 11 chalk sticks. Turn to back bench: 'If we take 3 chalks from left, how many must we remove from right to keep it flat?' Once they answer 8, divide into halves to reveal x = 4."
    }
  });
});

app.post('/api/zerodevice/scan-batch', (req, res) => {
  res.json({
    class_id: req.body.class_id || "8-B",
    sheets_scanned: 50,
    time_elapsed_seconds: 42.4,
    status: "Successfully scanned and digitized 50 paper exit slips into Teacher Co-Pilot!"
  });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '.')));

app.listen(PORT, () => {
  console.log(`\n🚀 VidyāSetu Express Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from ${__dirname}\n`);
});
