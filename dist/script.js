const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

if (menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });
}

const requirementForm = document.querySelector('#requirement-form');

if (requirementForm) {
  requirementForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!requirementForm.reportValidity()) return;

    const formData = new FormData(requirementForm);
    const value = (name) => String(formData.get(name) || '').trim();
    const optional = (name) => value(name) || 'Not provided';
    const product = value('product').replace(/[\r\n]+/g, ' ').slice(0, 70);
    const subject = `Source Bridge | Sourcing requirement: ${product}`;
    const body = [
      'Hello Source Bridge,',
      '',
      'Please review this sourcing requirement and contact me about an initial benchmark.',
      '',
      'BUYER DETAILS',
      `Name: ${value('buyerName')}`,
      `Email: ${value('buyerEmail')}`,
      `Company: ${optional('company')}`,
      '',
      'PRODUCT REQUIREMENT',
      `Product / part name: ${value('product')}`,
      `Approximate quantity: ${value('quantity')}`,
      `Material / grade: ${optional('material')}`,
      `Size / standard: ${optional('standard')}`,
      `Delivery country: ${value('destination')}`,
      `Other details or drawing link: ${optional('details')}`,
      '',
      'I understand this is an initial enquiry. I will attach any drawing to this email before sending it.',
    ].join('\r\n');

    const provider = event.submitter?.value || 'gmail';
    const compose = provider === 'gmail'
      ? new URL('https://mail.google.com/mail/')
      : new URL(provider === 'microsoft365'
        ? 'https://outlook.office.com/mail/deeplink/compose'
        : 'https://outlook.live.com/mail/0/deeplink/compose');
    if (provider === 'gmail') {
      compose.searchParams.set('view', 'cm');
      compose.searchParams.set('fs', '1');
      compose.searchParams.set('su', subject);
    } else {
      compose.searchParams.set('subject', subject);
    }
    compose.searchParams.set('to', 'rfq@source-bridge.in');
    compose.searchParams.set('body', body);

    const opened = window.open(compose.toString(), '_blank');
    if (opened) opened.opener = null;
    else window.location.assign(compose.toString());
    requirementForm.querySelector('.form-status').hidden = false;
  });
}

const copyEmailButton = document.querySelector('.copy-email');

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('rfq@source-bridge.in');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select and copy the email address shown above.';
    }
    status.hidden = false;
  });
}
