/* ============================================================
   Caffè Toninho — Invio form via EmailJS
   ------------------------------------------------------------
   CONFIGURAZIONE: sostituisci i 4 valori "INSERISCI_QUI..." con
   quelli della dashboard https://dashboard.emailjs.com
   (Account > Public Key, Email Services > Service ID,
   Email Templates > Template ID).
   ============================================================ */
(function () {
  'use strict';

  var CONFIG = {
    PUBLIC_KEY: 'B-RFbUCvg35xgMBGI',
    SERVICE_ID: 'service_jhvafhe',
    TEMPLATE_RICHIESTE: 'template_oxus2xx',
    TEMPLATE_NEWSLETTER: 'template_dqvm2uu',
    DESTINATARIO: 'caffe.toninho.monterotondo@gmail.com'
  };

  var SDK_URL = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

  function nonConfigurato(v) { return String(v).indexOf('INSERISCI') !== -1; }

  var sdkPromise = null;
  function loadSdk() {
    if (window.emailjs) return Promise.resolve();
    if (!sdkPromise) {
      sdkPromise = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = SDK_URL;
        s.async = true;
        s.onload = function () {
          try {
            window.emailjs.init({ publicKey: CONFIG.PUBLIC_KEY });
            resolve();
          } catch (e) { sdkPromise = null; reject(e); }
        };
        s.onerror = function () { sdkPromise = null; reject(new Error('Impossibile caricare il SDK EmailJS')); };
        document.head.appendChild(s);
      });
    }
    return sdkPromise;
  }

  function val(form, names) {
    for (var i = 0; i < names.length; i++) {
      var el = form.elements[names[i]];
      if (el && typeof el.value === 'string' && el.value.trim()) return el.value.trim();
    }
    return '';
  }

  function buildParams(form, tipo) {
    var nome = val(form, ['nome', 'First-Name']);
    var cognome = val(form, ['Last-Name']);
    if (cognome) nome = nome ? nome + ' ' + cognome : cognome;
    var email = val(form, ['email', 'Email', 'Subscribe-Email']);
    if (tipo === 'newsletter' && email) nome = email;
    var prodotto = val(form, ['prodotto']);
    var titolo;
    if (tipo === 'newsletter') {
      titolo = 'Iscrizione newsletter';
    } else if (tipo === 'contatti') {
      titolo = 'Messaggio dal form contatti';
      prodotto = prodotto || 'Form di contatto';
    } else {
      titolo = 'Richiesta di ritiro in negozio' + (prodotto ? ' \u2014 ' + prodotto : '');
      prodotto = prodotto || '\u2014';
    }
    return {
      to_email: CONFIG.DESTINATARIO,
      titolo: titolo,
      nome: nome || '\u2014',
      email: email || '\u2014',
      telefono: val(form, ['telefono', 'Phone']) || '\u2014',
      prodotto: prodotto,
      messaggio: val(form, ['messaggio', 'Message']) || '\u2014',
      pagina: window.location.href,
      data: new Date().toLocaleString('it-IT')
    };
  }

  function setStatus(form, ok, msg) {
    var st = form.querySelector('.ritira-form-status');
    if (!st) return;
    st.style.display = 'block';
    st.style.background = ok ? '#e8f5ee' : '#fdecea';
    st.style.color = ok ? '#14532d' : '#b3261e';
    st.style.border = ok ? '1px solid #bfe3cd' : '1px solid #f5c6c0';
    st.textContent = msg;
  }

  function setSending(form, sending) {
    var btn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!btn) return;
    if (sending) {
      btn.disabled = true;
      btn.dataset.label = btn.tagName === 'INPUT' ? btn.value : btn.textContent;
      if (btn.tagName === 'INPUT') { btn.value = 'Invio\u2026'; } else { btn.textContent = 'Invio\u2026'; }
    } else {
      btn.disabled = false;
      if (btn.tagName === 'INPUT') { btn.value = btn.dataset.label || 'Invia'; } else { btn.textContent = btn.dataset.label || 'Invia'; }
    }
  }

  function showSuccess(form) {
    var wrap = form.closest('.w-form');
    if (wrap) {
      form.style.display = 'none';
      var done = wrap.querySelector('.w-form-done');
      if (done) done.style.display = 'block';
    } else {
      for (var i = 0; i < form.children.length; i++) {
        var c = form.children[i];
        if (!c.className || String(c.className).indexOf('ritira-form-status') === -1) c.style.display = 'none';
      }
      setStatus(form, true, 'Richiesta inviata con successo! Ti contatteremo al pi\u00f9 presto.');
    }
  }

  function showError(form) {
    var wrap = form.closest('.w-form');
    if (wrap) {
      var fail = wrap.querySelector('.w-form-fail');
      if (fail) fail.style.display = 'block';
    } else {
      setStatus(form, false, 'Si \u00e8 verificato un errore durante l\u2019invio. Riprova tra qualche minuto oppure chiamaci allo 06 640 02074.');
    }
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.matches || !form.matches('form[data-emailjs]')) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (form.dataset.sending === '1') return;

    var bot = form.elements['_bot'];
    if (bot && bot.value) { showSuccess(form); return; }

    var tipo = form.getAttribute('data-emailjs');
    var tmpl = tipo === 'newsletter' ? CONFIG.TEMPLATE_NEWSLETTER : CONFIG.TEMPLATE_RICHIESTE;

    if (nonConfigurato(CONFIG.PUBLIC_KEY) || nonConfigurato(CONFIG.SERVICE_ID) || nonConfigurato(tmpl)) {
      setStatus(form, false, 'Modulo non ancora configurato: inserisci le chiavi EmailJS nel file js/emailjs-forms.js.');
      return;
    }

    var params = buildParams(form, tipo);
    form.dataset.sending = '1';
    setSending(form, true);

    var wrap = form.closest('.w-form');
    if (wrap) {
      var fail = wrap.querySelector('.w-form-fail');
      if (fail) fail.style.display = 'none';
    }

    loadSdk()
      .then(function () { return window.emailjs.send(CONFIG.SERVICE_ID, tmpl, params); })
      .then(function () { showSuccess(form); })
      .catch(function (err) {
        if (window.console) console.error('[Caffe Toninho] Invio EmailJS fallito:', err);
        showError(form);
        form.dataset.sending = '';
        setSending(form, false);
      });
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[data-emailjs]');
    for (var i = 0; i < forms.length; i++) {
      (function (form) {
        if (form.elements['_bot']) return;
        var h = document.createElement('input');
        h.type = 'text';
        h.name = '_bot';
        h.tabIndex = -1;
        h.setAttribute('autocomplete', 'off');
        h.setAttribute('aria-hidden', 'true');
        h.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
        form.appendChild(h);
      })(forms[i]);
    }
  });
})();
