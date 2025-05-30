const form = document.getElementById("registrationForm");
    const tableBody = document.getElementById("entriesTableBody");

    function getAge(dateString) {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    function loadEntries() {
      const entries = JSON.parse(localStorage.getItem("userEntries")) || [];
      tableBody.innerHTML = "";
      entries.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.acceptedTerms}</td>
        `;
        tableBody.appendChild(row);
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const dob = document.getElementById("dob").value;
      const acceptedTerms = document.getElementById("acceptTerms").checked;

      const age = getAge(dob);
      if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return;
      }

      const newEntry = { name, email, password, dob, acceptedTerms };
      const existingEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
      existingEntries.push(newEntry);
      localStorage.setItem("userEntries", JSON.stringify(existingEntries));
      loadEntries();
      form.reset();
    });

    window.addEventListener("load", loadEntries);
