// menu.js
document.addEventListener('DOMContentLoaded', function() {
  let menu = JSON.parse(localStorage.getItem('menu') || "[]");

  function renderMenu() {
    const table = document.getElementById('menuTable');
    table.innerHTML = '';
    menu.forEach((item, idx) => {
      table.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.category}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteMenu(${idx})">Delete</button></td>
        </tr>
      `;
    });
  }

  window.deleteMenu = function(idx) {
    menu.splice(idx, 1);
    localStorage.setItem('menu', JSON.stringify(menu));
    renderMenu();
  };

  document.getElementById('menuForm').onsubmit = function(e) {
    e.preventDefault();
    menu.push({
      name: document.getElementById('menuName').value,
      price: document.getElementById('menuPrice').value,
      category: document.getElementById('menuCategory').value,
    });
    localStorage.setItem('menu', JSON.stringify(menu));
    renderMenu();
    document.querySelector('.modal.show .btn-close').click();
    this.reset();
  };

  renderMenu();
});
