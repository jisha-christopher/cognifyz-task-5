
function loadUsers() {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('userList');
      list.innerHTML = '';

      data.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${user.name}
          <button onclick="deleteUser(${user.id})">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}

function addUser() {
  const name = document.getElementById('username').value;

  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
  .then(() => {
    document.getElementById('username').value = '';
    loadUsers();
  });
}

function deleteUser(id) {
  fetch(`/api/users/${id}`, { method: 'DELETE' })
    .then(() => loadUsers());
}

// Load users on page load
loadUsers();
