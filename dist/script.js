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

    const mailLink = document.createElement('a');
    mailLink.href = `mailto:rfq@source-bridge.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    mailLink.hidden = true;
    document.body.append(mailLink);
    mailLink.click();
    mailLink.remove();
    requirementForm.querySelector('.form-status').hidden = false;
  });
}
