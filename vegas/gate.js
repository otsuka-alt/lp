(function () {
  var CORRECT_CODE = "40000000";
  var STORAGE_KEY = "vegas-gate-ok";

  var overlay = document.getElementById("gate-overlay");
  var form = document.getElementById("gate-form");
  var input = document.getElementById("gate-code");
  var error = document.getElementById("gate-error");

  if (!overlay || !form || !input || !error) {
    return;
  }

  function unlock() {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gate-locked");
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  function showError() {
    error.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
  }

  function clearError() {
    error.hidden = true;
    input.removeAttribute("aria-invalid");
  }

  if (sessionStorage.getItem(STORAGE_KEY) === "1") {
    unlock();
    return;
  }

  input.focus();

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) {
      e.preventDefault();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value.trim();

    if (value === CORRECT_CODE) {
      clearError();
      unlock();
      return;
    }

    showError();
  });
})();
