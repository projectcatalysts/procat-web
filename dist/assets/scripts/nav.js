/*! nav.js — close the mobile sidebar when a link is clicked */
(function () {
	'use strict';

	var cb = document.getElementById('sidebar-toggle'); // the hidden checkbox
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


// Accordion: only one page open at a time
(function () {
	var groups = Array.from(document.querySelectorAll('.toc-group'));
	if (!groups.length) return;

	groups.forEach(function (g) {
		var summary = g.querySelector('summary');
		if (!summary) return;

		summary.addEventListener('click', function (e) {
			e.preventDefault();                 // stop the native open/close
			var willOpen = !g.open;             // decide new state ourselves

			// close all others
			groups.forEach(function (other) {
				if (other !== g) other.open = false;
			});

			// set this one
			g.open = willOpen;
		});
	});
})();