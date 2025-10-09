function editHero(id) {
  document.getElementById(`display-${id}`).style.display = "none";
  document.getElementById(`edit-${id}`).style.display = "block";
}

function cancelEdit(id) {
  document.getElementById(`display-${id}`).style.display = "block";
  document.getElementById(`edit-${id}`).style.display = "none";
}

async function updateHero(id) {
  const superName = document.getElementById(`superName-${id}`).value;
  const realName = document.getElementById(`realName-${id}`).value;
  const superpower = document.getElementById(`superpower-${id}`).value;
  const powerLevel = document.getElementById(`powerLevel-${id}`).value;
  const secretIdentity = document.getElementById(
    `secretIdentity-${id}`
  ).checked;

  if (!superName.trim() || !realName.trim() || !superpower.trim()) {
    alert("please fill in all required fields");
    return;
  }

  try {
    const response = await fetch(`/heroes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        superName,
        realName,
        superpower,
        powerLevel,
        secretIdentity,
      }),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("failed to update hero");
    }
  } catch (err) {
    console.error("error:", err);
    alert("failed to update hero");
  }
}

async function deleteHero(id) {
  if (!confirm("are you sure you want to delete this hero?")) {
    return;
  }

  try {
    const response = await fetch(`/heroes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.getElementById(`hero-${id}`).remove();

      const remaining = document.querySelectorAll(`[id^="hero-"]`);
      if (remaining.length === 0) {
        window.location.reload();
      }
    } else {
      alert("failed to delete hero try");
    }
  } catch (err) {
    console.error("error:", err);
    alert("failed to delete hero catch");
  }
}
