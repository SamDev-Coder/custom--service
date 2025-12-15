// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAVWGW_xTBdwDRI3YiXwpLWg0px48r4jJg",
  authDomain: "custom-service-c3357.firebaseapp.com",
  projectId: "custom-service-c3357",
  storageBucket: "custom-service-c3357.firebasestorage.app",
  messagingSenderId: "244899834712",
  appId: "1:244899834712:web:f3294b8f40b1d29e50932d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== STATES DROPDOWN =====
const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
  "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT - Abuja"
];
const stateSelect = document.getElementById("state");
states.forEach(s => {
  const opt = document.createElement("option");
  opt.value = s;
  opt.textContent = s;
  stateSelect.appendChild(opt);
});

// ===== FORM SUBMISSION =====
const form = document.getElementById("regForm");
form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    fullname: document.getElementById("fullname").value,
    replacementNo: document.getElementById("passportNo").value,
    nin: document.getElementById("nin").value,
    state: document.getElementById("state").value,
    lga: document.getElementById("lga").value,
    nextOfKin: document.getElementById("nok").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    qualification: document.getElementById("qualification").value,
    maritalStatus: document.getElementById("marital").value,
    status: "Pending",
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "customs_applications"), data);

    // Show success popup
    const popup = document.getElementById("successPopup");
    popup.style.display = "block";
    setTimeout(() => popup.style.display = "none", 3000);

    form.reset();
  } catch (error) {
    alert("Error submitting application: " + error.message);
  }
});
