const checkboxes = document.querySelectorAll('#achievements input[type="checkbox"]');

function toggleAchievements(checked) {
 checkboxes.forEach(cb => cb.checked = checked);
}