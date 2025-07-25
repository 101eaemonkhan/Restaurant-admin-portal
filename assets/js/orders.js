// orders.js
document.addEventListener('DOMContentLoaded', function() {
  let orders = JSON.parse(localStorage.getItem('orders') || "[]");

  function renderOrders() {
    const table = document.getElementById('ordersTable');
    table.innerHTML = '';
    orders.forEach((order, idx) => {
      table.innerHTML += `
        <tr>
          <td>${order.id}</td>
          <td>${order.item}</td>
          <td>${order.qty}</td>
          <td>${order.customer}</td>
          <td>${order.status}</td>
          <td>${order.date}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${idx})">Delete</button></td>
        </tr>
      `;
    });
  }

  window.deleteOrder = function(idx) {
    orders.splice(idx, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
  };

  document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault();
    orders.push({
      id: Date.now(),
      item: document.getElementById('orderItem').value,
      qty: document.getElementById('orderQty').value,
      customer: document.getElementById('orderCustomer').value,
      status: document.getElementById('orderStatus').value,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
    document.querySelector('.modal.show .btn-close').click();
    this.reset();
  };

  renderOrders();
});
