document.addEventListener('DOMContentLoaded', () => {

  // دالة إضافة المنتج للسلة من صفحة التفاصيل نفسها (مش من كارت في الشوب)
  window.addToCartFromDetails = function() {
    var addToCartBtn = document.querySelector('.add-cart-btn');
    // بجيب اسم وسعر وصورة المنتج من صندوق التفاصيل بتاعه
    var titleEl = document.querySelector('.details-box .product-title');
    var priceEl = document.querySelector('.details-box .current-price');
    var imgEl = document.getElementById('mainProductImg');
    // بيجيب الكمية اللي المستخدم اختارها من الـ input
    var qtyInput = document.getElementById('quantity');

    var title = titleEl ? titleEl.innerText.trim() : 'Product';
    var price = priceEl ? priceEl.innerText.trim() : '$0.00';
    var imgSrc = imgEl ? imgEl.src : '';
    var quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    var product = { title, price, imgSrc, quantity };

    // بجيب السلة القديمة، لو المنتج موجود زود عليه الكمية اللي اختارها، غير كده ضيفه جديد
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var existingIndex = cart.findIndex(item => item.title === title);
    if (existingIndex > -1) cart[existingIndex].quantity += quantity;
    else cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    // الزرار يتغير شكله لـ "Added" ويتقفل شوية بعد ما تدوس عليه
    if (addToCartBtn) {
      var originalText = addToCartBtn.innerText;
      addToCartBtn.innerText = 'Added ✓';
      addToCartBtn.disabled = true;
      setTimeout(() => {
        addToCartBtn.innerText = originalText;
        addToCartBtn.disabled = false;
      }, 1200);
    }
  };

  // بتحدث الرقم اللي فوق أيقونة السلة في النافبار
  function updateCartBadge() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    var badge = document.getElementById("cart-count");
    if (badge) badge.innerText = totalItems;
  }
  // بننادي عليها أول ما الصفحة تفتح عشان الرقم يبان صح من الأول
  updateCartBadge();

  // زيادة ونقصان الكمية (+ / -) في صفحة التفاصيل
  window.updateQty = function(change) {
    var qtyInput = document.getElementById('quantity');
    if (!qtyInput) return;
    var currentQty = (parseInt(qtyInput.value) || 1) + change;
    // أقل كمية ممكنة تبقى 1
    if (currentQty >= 1) qtyInput.value = currentQty;
  };

  // تغيير الصورة الرئيسية لما تدوس على صورة مصغرة
  window.changeImage = function(element) {
    var mainImg = document.getElementById('mainProductImg');
    if (mainImg && element.src) mainImg.src = element.src;
    document.querySelectorAll('.thumb').forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
  };

  // كل أزرار التابات وكل محتوياتها
  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // أول حاجة نشيل active من كل الأزرار ونخفي كل المحتويات
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');
      // وبعدين نفعل الزرار اللي اتدوس عليه بس
      btn.classList.add('active');

      // نظهر المحتوى اللي مطابق للـ data-tab بتاع الزرار
      var targetId = btn.getAttribute('data-tab');
      if (targetId && document.getElementById(targetId)) document.getElementById(targetId).style.display = 'block';
      else if (tabContents[index]) tabContents[index].style.display = 'block';
    });
  });

});