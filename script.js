// 1. Navbar shadow when page is scrolled
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// 2. Mobile menu open / close
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after a link is tapped
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// 3. Scroll reveal (adds "visible" class when an element enters the screen)
var revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(function (item) { observer.observe(item); });
} else {
  revealItems.forEach(function (item) { item.classList.add('visible'); });
}

// 4. Enquiry form validation (no backend - shows a success message only)
var form = document.getElementById('enquiryForm');

function showError(fieldId, errorId, message) {
  var field = document.getElementById(fieldId);
  document.getElementById(errorId).textContent = message;
  field.parentElement.classList.toggle('invalid', message !== '');
  return message === '';
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var name = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.replace(/[\s-]/g, '');
  var course = document.getElementById('course').value;

  var nameOk = showError('name', 'nameError', name.length < 2 ? 'Please enter your name.' : '');
  var phoneOk = showError('phone', 'phoneError', /^[6-9]\d{9}$/.test(phone) ? '' : 'Please enter a valid 10-digit mobile number.');
  var courseOk = showError('course', 'courseError', course === '' ? 'Please select a course.' : '');

  if (nameOk && phoneOk && courseOk) {
    form.reset();
    document.getElementById('formSuccess').hidden = false;
  } else {
    document.getElementById('formSuccess').hidden = true;
  }
});