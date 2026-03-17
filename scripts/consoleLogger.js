document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        
        console.clear();
        
        console.log('%c📋 Данные отправленной формы', 'font-size: 16px; font-weight: bold; color: #00d1b2;');
        console.log('%c══════════════════════════════════', 'color: #00d1b2;');
        
        console.log('%c👤 ФИО:', 'font-weight: bold; color: #3273dc;', formData.fullname);
        console.log('%c📧 Email:', 'font-weight: bold; color: #3273dc;', formData.email);
        console.log('%c📞 Телефон:', 'font-weight: bold; color: #3273dc;', formData.phone);
        console.log('%c📌 Тема:', 'font-weight: bold; color: #3273dc;', formData.topic);
        console.log('%c💬 Сообщение:', 'font-weight: bold; color: #3273dc;', formData.message);
        console.log('%c✅ Согласие:', 'font-weight: bold; color: #3273dc;', formData.agreement ? 'Да' : 'Нет');
        
        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('%c⏱️ Время отправки:', 'font-weight: bold; color: #666;', timestamp);
        
        console.log('%c📦 Полные данные (объект):', 'font-weight: bold; color: #23d160;', formData);
        
        const filledFields = Object.values(formData).filter(val => val && val !== 'Не выбрано' && val !== '(не заполнено)').length;
        console.log(`%c📊 Статистика: заполнено ${filledFields} из 6 полей`, 'color: #ff3860;');
    });


    console.log('%c Страница контактов загружена. Ожидание отправки формы...', 'color: #666; font-style: italic;');
});