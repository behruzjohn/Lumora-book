let backendUrl = 'https://bookzone-backend.onrender.com/api';
const load = document.getElementById('load');
async function login() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  try {
    load.style.display = 'flex';
    const res = await fetch(backendUrl + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await res.json();
    console.log('Server JSON:', data);

    if (data.success) {
      load.style.display = 'none';
      localStorage.setItem('token', data.token);
      location.assign('/html/main-page.html');
    }
  } catch (err) {
    console.log('Xatolik:', err);
    load.style.display = 'none';
  }
}
