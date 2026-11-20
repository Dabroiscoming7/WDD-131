const form = document.querySelector('#event-form');
const participantType = document.querySelector('#participant-type');
const participantInfo = document.querySelector('#participant-info');
const participantLabel = document.querySelector('#participant-label');
const participantValue = document.querySelector('#participant-value');
const eventDate = document.querySelector('#event-date');
const errorContainer = document.querySelector('#form-errors');
const ticket = document.querySelector('#ticket');
const ticketName = document.querySelector('#ticket-name');
const ticketType = document.querySelector('#ticket-type');
const ticketDate = document.querySelector('#ticket-date');

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

eventDate.min = getLocalDateString(new Date());

participantType.addEventListener('change', () => {
    participantValue.value = '';
    errorContainer.textContent = '';

    if (participantType.value === 'student') {
        participantInfo.hidden = false;
        participantLabel.textContent = 'Student I#';
        participantValue.placeholder = '9-digit I number';
        participantValue.maxLength = 9;
        participantValue.inputMode = 'numeric';
    } else if (participantType.value === 'guest') {
        participantInfo.hidden = false;
        participantLabel.textContent = 'Access Code';
        participantValue.placeholder = 'Enter access code';
        participantValue.removeAttribute('maxlength');
        participantValue.inputMode = 'text';
    } else {
        participantInfo.hidden = true;
        participantLabel.textContent = '';
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const date = eventDate.value;
    const type = participantType.value;
    const identification = participantValue.value.trim();
    const today = getLocalDateString(new Date());
    const errors = [];

    if (!firstName) {
        errors.push('Please enter your first name.');
    }

    if (!lastName) {
        errors.push('Please enter your last name.');
    }

    if (!email) {
        errors.push('Please enter your email.');
    } else if (!email.includes('@')) {
        errors.push('Please enter a valid email.');
    }

    if (!date) {
        errors.push('Please choose an event date.');
    } else if (date <= today) {
        errors.push('The event date must be later than today.');
    }

    if (!type) {
        errors.push('Please choose whether you are a student or a guest.');
    } else if (type === 'student' && !/^\d{9}$/.test(identification)) {
        errors.push('Student I# must be 9 digits');
    } else if (type === 'guest' && identification !== 'EVENT131') {
        errors.push('Access code must be EVENT131');
    }

    if (errors.length > 0) {
        ticket.hidden = true;
        errorContainer.innerHTML = `<ul>${errors.map((error) => `<li>${error}</li>`).join('')}</ul>`;
        return;
    }

    errorContainer.textContent = '';
    ticketName.textContent = `${firstName} ${lastName}`;
    ticketType.textContent = type;
    ticketDate.textContent = date;
    ticket.hidden = false;
});
