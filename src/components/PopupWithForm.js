function PopupWithForm({name, title, children, isOpen, onClose}) {
   return (
      <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
         <div className="popup__container">
            <form className={`popup__form-admin popup__form-admin_type_${name}`} name={name} noValidate>
               <h2 className="popup__heading">{title}</h2>
                  {children}
               <button type="submit" className="popup__button popup__button_type_submit" aria-label="Сохранить">Сохранить</button>
               <button 
                  type="reset" 
                  className="popup__button popup__button_type_close" 
                  onClick={onClose} 
                  aria-label="Закрыть модальное окно">
               </button>
            </form>
         </div>
      </div>
   )
}

export default PopupWithForm