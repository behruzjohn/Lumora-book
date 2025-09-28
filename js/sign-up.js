async function signUp() {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const phoneNumber = document.getElementById('phoneNumber');
  const email = document.getElementById('email');
  const password1 = document.getElementById('password1');
  const password2 = document.getElementById('password2');
  const birth = document.getElementById('birth');
  const select = document.getElementById('select');

  const isPasswordCorrect = checkPassword(password1, password2);
  const isNumber = checkPhone(phoneNumber);
  let backendUrl = 'https://bookzone-backend.onrender.com/api';
  const checkRole = document.querySelectorAll("input[name='role']");
  let role = null;
  for (const key of checkRole) {
    if (key.checked) {
      role = key.value;
      break;
    }
  }

  if (!role) {
    alert('Rolni tanlang');
    return;
  }

  function checkPassword(password, confirmPassword) {
    if (
      password.value === confirmPassword.value &&
      password.value.length >= 8
    ) {
      return true;
    } else {
      alert('Parol mos emas yoki juda qisqa!');
      return false;
    }
  }

  function checkPhone(phone) {
    if (phone.value.length >= 9 && phone.value.length <= 14) {
      return true;
    } else {
      alert('Telefon raqam notogri!');
      return false;
    }
  }

  if (isPasswordCorrect && isNumber) {
    class GetUser {
      constructor(firstName, lastName, email, phone, role, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.password = password;
      }
    }

    const user = new GetUser(
      firstName.value,
      lastName.value,
      email.value,
      phoneNumber.value,
      role,
      password1.value
    );

    load.style.display = 'flex';
    try {
      const res = await fetch(backendUrl + '/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, date_of_birth: birth.value }),
      });

      const data = await res.json();
      console.log('Server JSON:', data);

      if (data.success) {
        load.style.display = 'none';
        localStorage.setItem('token', data.token);
        alert(`Ro'yxatdan o'tdingiz✅`);
        location.assign('/html/sign-in.html');
      }
    } catch (err) {
      console.log('Xatolik:', err);
      load.style.display = 'none';
    }
  }
}
