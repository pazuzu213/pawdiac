const form = document.querySelector(".waitlist-form");
const note = document.querySelector("#form-note");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  note.className = "form-note";
  note.textContent = "Saving your spot...";

  const formData = new FormData(form);
  const payload = {
    email: formData.get("email"),
    dogName: formData.get("dogName"),
    dogBirthday: formData.get("dogBirthday"),
    source: "pawdiac-landing"
  };

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    form.reset();
    note.className = "form-note success";
    note.textContent = "You're on the list. The stars will reach your dog soon.";
  } catch (error) {
    note.className = "form-note error";
    note.textContent = error.message || "Could not save that email yet.";
  }
});
