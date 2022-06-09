import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {useState} from 'react';

function App() {

   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [selectedCard, setSelectedCard] = useState(null);

   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   }

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   }
   
   function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
   }

   function handleCardClick(card) {
      setSelectedCard(card);
   }

   function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(null);
   }

   return (
      <>
         <div className="page">
            <Header/>
               <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
               />
            <Footer/>
         </div>

         <PopupWithForm
            name='profile-edit'
            title='Редактировать профиль'
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
         >
         <input 
            type="text" 
            id="name"  
            name="name" 
            className="popup__input popup__input_type_name" 
            minLength="2" 
            maxLength="40" 
            placeholder="Имя" 
            defaultValue="Жак-Ив Кусто" 
            required
         />

            <span className="popup__error" id="name-error"></span>

         <input 
            type="text" 
            id="about" 
            name="about" 
            className="popup__input popup__input_type_about" 
            minLength="2" 
            maxLength="200" 
            placeholder="О себе" 
            defaultValue="Исследователь океана" 
            required
         />

            <span className="popup__error" id="about-error"></span>

         </PopupWithForm>

         <PopupWithForm
            name='avatar-edit'
            title='Обновить аватар'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
         >
         <input 
            type="url" 
            id="avatar" 
            name="avatar" 
            className="popup__input popup__input_type_url" 
            placeholder="Ссылка на изображение" 
            required
         />

            <span className="popup__error" id="avatar-error"></span>

         </PopupWithForm>

         <PopupWithForm
            name='card-add'
            title='Новое место'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
         />

            <span className="popup__error" id="place-error"></span>

         <input 
            type="url" 
            id="link" 
            name="link" 
            className="popup__input popup__input_type_link" 
            placeholder="Ссылка на картинку" 
            required
         />

            <span className="popup__error" id="link-error"></span>

         </PopupWithForm>
         
         <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            onClose={closeAllPopups}
         >
         </PopupWithForm>

         <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
         />
      </>
   )
}

export default App;