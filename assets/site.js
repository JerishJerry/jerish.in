/**
 * Contact form delivery for a static host.
 *
 * The design exported the form bound to an editor-only `sendMail` handler, so
 * on a static host it had no action and submitting just reloaded the page.
 *
 * Two delivery modes, chosen at runtime:
 *   1. Web3Forms — used when the form carries a non-empty data-access-key.
 *      Real background POST, no page leave. Paste a key into index.html to
 *      switch this on (see README).
 *   2. mailto: — the default. Opens the visitor's mail client with the message
 *      prefilled. No third-party service, no account, nothing to leak.
 */
(function () {
  'use strict';

  var TO = 'jerishdavid23@gmail.com';
  var ENDPOINT = 'https://api.web3forms.com/submit';

  // Tagged on first lookup: matching on the note's text stops working as soon
  // as we overwrite that text with a status message.
  function findNote(form) {
    var tagged = form.querySelector('[data-status-note]');
    if (tagged) return tagged;
    var ps = form.querySelectorAll('p');
    for (var i = 0; i < ps.length; i++) {
      if (/Goes straight to/i.test(ps[i].textContent)) {
        ps[i].setAttribute('data-status-note', '');
        return ps[i];
      }
    }
    return null;
  }

  // Reuses the design's own muted-note styling so status text looks native.
  function status(form, msg, isError) {
    var note = findNote(form);
    if (!note) return;
    if (!note.dataset.original) note.dataset.original = note.textContent;
    note.textContent = msg;
    note.style.color = isError
      ? 'var(--color-accent-700)'
      : 'color-mix(in srgb, var(--color-text) 70%, transparent)';
  }

  function resetNote(form) {
    var note = findNote(form);
    if (note && note.dataset.original) {
      note.textContent = note.dataset.original;
      note.style.color = 'color-mix(in srgb, var(--color-text) 70%, transparent)';
    }
  }

  function busy(form, on, label) {
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    if (!btn.dataset.label) btn.dataset.label = btn.textContent.trim();
    btn.disabled = on;
    btn.textContent = on ? (label || 'Sending…') : btn.dataset.label;
  }

  function succeed(form, msg) {
    busy(form, false);
    form.reset();
    status(form, msg, false);
  }

  function viaMailto(form, data) {
    var body =
      'Name: ' + data.name + '\n' +
      'Email: ' + data.email + '\n\n' +
      data.message + '\n';
    var href = 'mailto:' + TO +
      '?subject=' + encodeURIComponent('Website enquiry from ' + data.name) +
      '&body=' + encodeURIComponent(body);

    status(form, 'Opening your email app with the message ready — press send there. ' +
      'If nothing opened, write to ' + TO + ' directly.', false);
    busy(form, false);
    // Assigned last: the handoff can pause script execution in some browsers.
    window.location.href = href;
  }

  function viaWeb3Forms(form, data, key) {
    busy(form, true);
    status(form, 'Sending…', false);
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: 'Website enquiry from ' + data.name,
        from_name: data.name,
        name: data.name,
        email: data.email,
        message: data.message
      })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && res.j.success !== false) {
          succeed(form, 'Message sent — thanks. I reply within a day or two.');
        } else {
          throw new Error(res.j.message || 'Send failed');
        }
      })
      .catch(function () {
        busy(form, false);
        status(form, 'That did not go through. Please email ' + TO + ' directly.', true);
      });
  }

  // Delegated: survives however late the markup lands in the DOM.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.querySelector('#jd-message')) return; // not the contact form

    e.preventDefault();

    var honeypot = form.querySelector('[name="botcheck"]');
    if (honeypot && honeypot.checked) return; // bot; drop silently

    if (!form.checkValidity()) { form.reportValidity(); return; }

    var data = {
      name: (form.querySelector('[name="name"]') || {}).value || '',
      email: (form.querySelector('[name="email"]') || {}).value || '',
      message: (form.querySelector('[name="message"]') || {}).value || ''
    };

    var key = (form.getAttribute('data-access-key') || '').trim();
    if (key) viaWeb3Forms(form, data, key);
    else viaMailto(form, data);
  });

  document.addEventListener('input', function (e) {
    var form = e.target && e.target.form;
    if (form && form.querySelector('#jd-message')) resetNote(form);
  });
})();
