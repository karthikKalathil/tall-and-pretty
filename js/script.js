function submitGrievance() {
  const title = document.getElementById('title').value;
  const message = document.getElementById('message').value;
  const mood = document.getElementById('mood').value;
  const severity = document.getElementById('severity').value;

  if (!title || !message) {
    alert('Please fill in the title and message.');
    return;
  }

  const grievance = {
    title,
    message,
    mood,
    severity,
    date: new Date().toLocaleString()
  };

  const grievances = JSON.parse(localStorage.getItem('grievances') || '[]');
  grievances.push(grievance);
  localStorage.setItem('grievances', JSON.stringify(grievances));

  const emailBody = \`Title: \${title}%0D%0A
Message: \${message}%0D%0A
Mood: \${mood}%0D%0A
Severity: \${severity}\`;
  window.location.href = \`mailto:ishan@example.com?subject=Grievance%20from%20Sehaj&body=\${emailBody}\`;

  document.getElementById('formPage').classList.add('hidden');
  document.getElementById('thankYouPage').classList.remove('hidden');
}

function goBack() {
  document.getElementById('formPage').classList.remove('hidden');
  document.getElementById('thankYouPage').classList.add('hidden');
  document.getElementById('title').value = '';
  document.getElementById('message').value = '';
}

function viewGrievances() {
  const listContainer = document.getElementById('grievanceList');
  const grievances = JSON.parse(localStorage.getItem('grievances') || '[]');
  listContainer.innerHTML = grievances.length === 0 ? '<p>No complaints yet!</p>' : '';
  grievances.reverse().forEach(item => {
    const div = document.createElement('div');
    div.className = 'grievance-item';
    div.innerHTML = \`<strong>\${item.title}</strong><br>\${item.message}<br><em>\${item.mood} | \${item.severity}</em><br><small>\${item.date}</small>\`;
    listContainer.appendChild(div);
  });
  document.getElementById('formPage').classList.add('hidden');
  document.getElementById('historyPage').classList.remove('hidden');
}

function goBackToForm() {
  document.getElementById('historyPage').classList.add('hidden');
  document.getElementById('formPage').classList.remove('hidden');
}