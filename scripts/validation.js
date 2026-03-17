document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearAllErrors();

        let isValid = true;

        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Введите ваше имя');
            isValid = false;
        } else {
            const words = fullnameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(fullname, 'Введите имя и фамилию (минимум 2 слова)');
                isValid = false;
            }
        }

        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (пример: name@domain.ru)');
            isValid = false;
        }

        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите минимум 10 цифр номера');
            isValid = false;
        }

        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        
        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(message, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }

        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            const agreementField = agreement.closest('.field');
            let helpBlock = agreementField.querySelector('.help.is-danger');
            if (!helpBlock) {
                helpBlock = document.createElement('p');
                helpBlock.classList.add('help', 'is-danger');
                agreementField.appendChild(helpBlock);
            }
            helpBlock.textContent = 'Необходимо согласие на обработку данных';
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                phone: phoneValue,
                topic: document.getElementById('topic').value || 'Не выбрано',
                message: messageValue || '(не заполнено)',
                agreement: agreement.checked
            };

            const validationEvent = new CustomEvent('formValid', { 
                detail: formData 
            });
            document.dispatchEvent(validationEvent);

            alert('✅ Форма успешно отправлена! Данные в консоли.');
            
        }
    });

    function showError(input, message) {
        input.classList.add('is-danger');
        
        const field = input.closest('.field');
        if (!field) return;
        
        const oldHelp = field.querySelector('.help.is-danger');
        if (oldHelp) oldHelp.remove();
        
        const helpBlock = document.createElement('p');
        helpBlock.classList.add('help', 'is-danger');
        helpBlock.textContent = message;
        
        const control = field.querySelector('.control');
        if (control) {
            control.after(helpBlock);
        } else {
            field.appendChild(helpBlock);
        }
    }

    function clearAllErrors() {
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
    }

    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field');
            const errorMsg = field.querySelector('.help.is-danger');
            if (errorMsg) errorMsg.remove();
        });
    });

    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            const field = this.closest('.field');
            const errorMsg = field.querySelector('.help.is-danger');
            if (errorMsg) errorMsg.remove();
        });
    }
});