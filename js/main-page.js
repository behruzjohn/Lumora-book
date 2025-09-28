async function mainPage() {
  const load = document.getElementById('load');
  const books_nav = document.getElementById('books_nav');
  let backendUrl = 'https://bookzone-backend.onrender.com/api';

  try {
    load.style.display = 'flex';
    const res = await fetch(backendUrl + '/books/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    const dataId = data.payload.docs;
    console.log(dataId);

    dataId.map((item) => {
      console.log(item);

      books_nav.innerHTML += `<div class="books_box">
                    <img src="/images/default-book.png" alt="" />
                    <h4>${item.title}</h4>
                    <p><strong>Description:</strong>${item.description}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Views:</strong>${item.views}</p>
                  </div>`;
    });
    if (data.success) {
      load.style.display = 'none';
    }
  } catch (err) {
    console.log('Xatolik:', err);
    load.style.display = 'none';
  }
}

mainPage();
