// Script to auto-generate "Ver más" buttons for frameworks without one
// Extracted from inline script in como_funciona.html

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.frameworks-section .card-body').forEach(function(body) {
    if (!body.querySelector('.btn-outline-primary')) {
      var title = body.querySelector('.card-title').textContent.trim();
      var url = 'https://www.google.com/search?q=' + encodeURIComponent(title);
      var btn = document.createElement('a');
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.className = 'btn btn-outline-primary btn-sm mt-2 d-inline-flex align-items-center gap-1';
      btn.innerHTML = '<i class="bi bi-search me-1"></i>Ver más';
      body.appendChild(btn);
    }
  });
});
