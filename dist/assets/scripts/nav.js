/*! nav.js — close the mobile sidebar when a link is clicked */
(function () {
  'use strict';

  var cb  = document.getElementById('sidebar-toggle'); // the hidden checkbox
  var nav = document.getElementById('sidebar');        // the sliding sidebar
  if (!cb || !nav) return;

  // Close when any sidebar link is clicked
  nav.addEventListener('click', function (e) {
    var a = e.target && e.target.closest('a[href]');
    if (!a) return;

    var href = a.getAttribute('href') || '';
    var samePageHash =
      href.startsWith('#') ||
      (a.origin === location.origin &&
       a.pathname === location.pathname &&
       !!a.hash);

    // Let browser jump to the anchor, then close
    if (samePageHash) {
      requestAnimationFrame(function () { cb.checked = false; });
    } else {
      // Navigating away — close immediately
      cb.checked = false;
    }
  });

  // Close if the URL fragment changes (e.g., user pastes a #link)
  window.addEventListener('hashchange', function () {
    cb.checked = false;
  });

  // Bonus: Esc to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cb.checked = false;
  });
})();
