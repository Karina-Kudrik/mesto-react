import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from 'react';
function AddPlacePopup({isOpen, onClose, onAddCard, isLoading}) {

   const place = useRef();
   const link = useRef();

   useEffect(() => {
      place.current.value = '';
      link.current.value = '';
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      onAddCard({
         name: place.current.value,
         link: link.current.value
      })
   }

   return (
      <PopupWithForm
         name='card-add'
         title='Новое место'
         isOpen={isOpen}
         onClose={onClose}
         onAddCard={onAddCard}
         onSubmit={handleSubmit}
         isLoading={isLoading}
         buttonText='Сохранить'
         loadingText='Сохранение...'
         >
         <input 
            type="text" 
            id="place" 
            name="name" 
            className="popup__input popup__input_type_place" 
            minLength="2" 
            maxLength="30" 
            placeholder="Название" 
            required
            ref={place}
         />

            <span className="popup__error" id="place-error"></span>

         <input 
            type="url" 
            id="link" 
            name="link" 
            className="popup__input popup__input_type_link" 
            placeholder="Ссылка на картинку" 
            required
            ref={link}
         />

            <span className="popup__error" id="link-error"></span>
      </PopupWithForm>
   )
}

export default AddPlacePopup