const modal = () => {
    const modalBtn = document.querySelector('.modal__button');
const modal = document.querySelector('.modal');

// Создаём крестик и добавляем его в модальное окно
const createCloseButton = () => {
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'modal__close';
    closeButton.innerHTML = '&times;'; // HTML-символ "×"
    closeButton.style.cssText = `
      position: absolute;
      top: 15px;
      right: 15px;
      width: 30px;
      height: 30px;
      background: transparent;
      border: none;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
      opacity: 0.7;
      z-index: 10;
      line-height: 1;
      padding: 0;
    `;
    closeButton.setAttribute('aria-label', 'Закрыть модальное окно');
  
    // Добавляем крестик в .modal__inner или в .modal
    const modalInner = modal.querySelector('.modal__inner') || modal;
    modalInner.appendChild(closeButton);
  
    // Закрываем модальное окно по клику на крестик
    closeButton.addEventListener('click', () => {
      modal.style.display = '';
    });
};

// Инициализация: создаём крестик при загрузке
if (modal) {
    createCloseButton();
}

modalBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

modal.addEventListener('click', (e) => {
    const modalContent = e.target.closest('.modal__inner');
    if (!modalContent) {
        modal.style.display = ''
    }
    
    // if (e.target.classList.contains('modal')) {
    //     modal.style.display = 'none'
    // }
})
}

modal()