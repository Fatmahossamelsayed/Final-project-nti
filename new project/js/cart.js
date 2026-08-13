document.addEventListener('DOMContentLoaded', () => {
  // العناصر اللي هنكتب فيها الجدول والأرقام
  var tableBody = document.getElementById('cart-table-body');
  var subtotalEl = document.getElementById('summary-subtotal');
  var deliveryEl = document.getElementById('delivery-charge');
  var grandTotalEl = document.getElementById('grand-total');
  var FIXED_DELIVERY = 10.00; // رسوم التوصيل الثابتة

  function loadCart() {
    // بجيب السلة من الـ localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    // لو منتج جاي من غير كمية أو كميته غلط، خليها 1 كحد أدنى
    cart.forEach(item => { if (!item.quantity || item.quantity < 1) item.quantity = 1; });

    // لو السلة فاضية أظهر رسالة بدل الجدول ووقف هنا
    if (cart.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: #777;">Your cart is empty. Add some products!</td></tr>`;
      subtotalEl.innerText = deliveryEl.innerText = grandTotalEl.innerText = '$0.00';
      return;
    }

    var html = '', subtotal = 0;

    // بعدي على كل منتج في السلة وأبني له صف في الجدول
    cart.forEach((item, index) => {
      var title = item.title || 'Product';
      var imgSrc = item.imgSrc || '';
      // بشيل أي رمز أو حرف من السعر (زي $) وسيب الرقم بس
      var numericPrice = parseFloat(String(item.price || '$0.00').replace(/[^0-9.]/g, '')) || 0;
      var itemTotal = numericPrice * item.quantity;
      subtotal += itemTotal;

      // بكتب صف كامل بالمنتج ده كـ HTML وأضيفه للنص الكلي
      html += `
        <tr>
          <td>
            <div class="product-cell">
              <img src="${imgSrc}" alt="${title}">
              <span class="product-name">${title}</span>
            </div>
          </td>
          <td class="price-text">$${numericPrice.toFixed(2)}</td>
          <td>
            <div class="quantity-box">
              <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
          </td>
          <td class="subtotal-text">$${itemTotal.toFixed(2)}</td>
          <td><button class="remove-icon-btn" onclick="removeItem(${index})" title="Remove"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
      `;
    });

    // بحط كل الصفوف اللي بنيناها جوه الجدول مرة واحدة
    tableBody.innerHTML = html;
    // وبحدث الأرقام تحت (subtotal + توصيل ثابت + الإجمالي الكلي)
    subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    deliveryEl.innerText = `$${FIXED_DELIVERY.toFixed(2)}`;
    grandTotalEl.innerText = `$${(subtotal + FIXED_DELIVERY).toFixed(2)}`;
  }

  // زيادة ونقصان كمية منتج معين في السلة (باستخدام ال index بتاعه)
  window.updateQty = function(index, change) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index]) return;
    // Math.max بتضمن إن الكمية متنزلش تحت 1 خالص
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    // بعد أي تعديل نرسم الجدول تاني بالأرقام الجديدة
    loadCart();
  };

  // حذف منتج من السلة نهائي
  window.removeItem = function(index) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  };

  // أول ما الصفحة تفتح، ارسم الجدول من الأول
  loadCart();
});