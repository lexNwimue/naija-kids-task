$(document).ready(() => {
  const form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const age = form.age.value;
    const gender = form.gender.value;
    const state = form.state.value;
    const email = form.email.value;
    const church = form.church.value;

    // Get error spans
    const firstNameErr = document.getElementById("firstName-err");
    const lastNameErr = document.getElementById("lastName-err");
    const stateErr = document.getElementById("state-err");

    // Validation
    // Check if names contain numbers
    const regex = /\d/;

    const validate = (element, err_span) => {
      if (regex.test(element)) {
        err_span.innerHTML = "Name must not contain numbers...";
        err_span.style.display = "block";
        console.log("Name must not contain numbers...");
        return false;
      } else {
        return true;
      }
    };

    if (
      validate(firstName, firstNameErr) &&
      validate(lastName, lastNameErr) &&
      validate(state, stateErr)
    ) {
      const data = {
        firstName,
        lastName,
        state,
        age,
        gender,
        email,
        church,
      };

      console.log(data);

      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  });
});
