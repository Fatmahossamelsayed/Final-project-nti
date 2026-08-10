// فتح وإغلاق القوائم الجانبية
function toggleFilter(headerElement) {
  const filterGroup = headerElement.parentElement;
  filterGroup.classList.toggle('active');
}

// منطق فلترة المنتجات عند تحديد Checkboxes
document.addEventListener('DOMContentLoaded', () => {
  const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
  const productCards = document.querySelectorAll('.product-card');
  const visibleCountSpan = document.getElementById('visible-count');

  function filterProducts() {
    // تجميع القيم المحددة (men, women, kids)
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    let visibleCount = 0;

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      // لو مفيش أي اختيار محدد، بيظهر كلو
      if (selectedCategories.length === 0 || selectedCategories.includes(cardCategory)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // تحديث عدد المنتجات الظاهرة في الصفحة
    if (visibleCountSpan) {
      visibleCountSpan.textContent = visibleCount;
    }
  }

  // الاستماع للتغيير في الـ checkboxes
  categoryCheckboxes.forEach(cb => {
    cb.addEventListener('change', filterProducts);
  });
});