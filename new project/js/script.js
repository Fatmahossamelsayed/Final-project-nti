// فتح و قفل القوايم الفالجنب
function toggleFilter(headerElement) {
  headerElement.parentElement.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
  // كل الفلاتر البتحدد الاقسام 
  var categoryCheckboxes = document.querySelectorAll('.category-checkbox');
  // كل كروت المنتجات في الصفحة
  var productCards = document.querySelectorAll('.product-card');
  // الرقم اللي بيوضح عدد المنتجات فوق
  var visibleCountSpan = document.getElementById('visible-count');

  function filterProducts() {
    // بجيب بس الفلاتر اللي متعلمة و بتتأكد و اخد قيمتها
    var selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    var visibleCount = 0;

    productCards.forEach(card => {
      // لو مفيش فلتر متعلم أصلاً أظهر الكل، غير كده قارن القسم بتاع الكارت مع الفلاتر المختارة
      var match = selectedCategories.length === 0 || selectedCategories.includes(card.getAttribute('data-category'));
      card.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    if (visibleCountSpan) visibleCountSpan.textContent = visibleCount;
  }

  // كل م حد يعلم أو يشيل علامة من فلتر ينادي الفلترة تاني
  categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));

  // تحديث رقم السلة اول م الصفحة تفتح
  updateCartBadge();
});

// دالة الإضافة للسلة - بتشتغل من كارت المنتج في الشوب وكمان من صفحة تفاصيل المنتج
function addToCart(btn) {
// بيخلي الفانكشن "تعرف" هي شغالة مع أنهي منتج بالظبط، مش تتلخبط بين المنتجات.
  var card = btn ? btn.closest('.product-card') : null;
  var titleEl = card ? card.querySelector('.product-title') : document.querySelector('h1, h2, .product-title');
  var priceEl = card ? card.querySelector('.current-price') : document.querySelector('.current-price, .price');
  var imgEl = card ? card.querySelector('.product-img-box img, .product-image-box img') : document.querySelector('#mainProductImg, .product-img-box img');

  var title = titleEl ? titleEl.innerText.trim() : 'Product';
  var price = priceEl ? priceEl.innerText.trim() : '$0.00';
  var imgSrc = imgEl ? imgEl.src : '';
  var product = { title, price, imgSrc, quantity: 1 };

  // بجيب السلة القديمة من الـ localStorage، لو مفيش أعمل array فاضية
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

  // لو المنتج موجود بالفعل زود الكمية بس، غير كده ضيفه جديد
  var existingIndex = cart.findIndex(item => item.title === title);
  if (existingIndex > -1) cart[existingIndex].quantity += 1;
  else cart.push(product);

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  alert('Product added to cart successfully!');
}

// يتغيّر الرقم الأحمر اللي فوق أيقونة السلة
function updateCartBadge() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  // بجمع كل الكميات مع بعض عشان الرقم يبقى إجمالي القطع مش عدد المنتجات بس
  var totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  var badge = document.getElementById("cart-count");
  if (badge) badge.innerText = totalItems;
}