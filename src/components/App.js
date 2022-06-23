import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import '../index.css';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatartPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import ImagePopup from './ImagePopup.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

function App() {

   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);

   const [cards, setCards] = useState([]);
   const [selectedCard, setSelectedCard] = useState(null);
   const [removeCard, setRemoveCard] = useState(null);

   const [currentUser, setCurrentUser] = useState({});

   const [isLoading, setIsLoading] = useState(false);

   useEffect (() => {
      api.getUserInfo()
         .then((res) => (
            setCurrentUser(res)
         ))
         .catch((err) => console.log(err));
   }, []);

   useEffect (() => {
      api.getInitialCards()
         .then((res) => {
            setCards(res)
         })
         .catch((err) => console.log(err));
   }, []);

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
   }

   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
   }

   function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true);
   }

   function handleConfirmDeleteClick(card) {
      setIsConfirmDeletePopupOpen(true);
      setRemoveCard(card);
   }

   function handleCardClick(card) {
      setSelectedCard(card);
   }

   function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      api.changeLikeCardStatus(card._id, !isLiked)
         .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
         .catch((err) => console.log(err))
   }

   function handleCardDelete(card) {
      setIsLoading(true);
         api.deleteCard(card._id)
            .then(() => {
               setCards((state) => state.filter((c) => c._id !== card._id && c));
               closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
   }

   function closeAllPopups() {
      setIsEditAvatarPopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setSelectedCard(null);
      setIsConfirmDeletePopupOpen(false);
   }

   function handleUpdateUser(data) {
      setIsLoading(true);
         api.setUserInfo(data)
            .then((res) => {
            setCurrentUser(res);
            closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
   }

   function handleUserAvatar(data) {
      setIsLoading(true);
         api.setUserAvatar(data)
         .then((res) => {
            setCurrentUser(res);
            closeAllPopups()
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }

   function handleAddCard(data) {
      setIsLoading(true);
         api.addCard(data)
         .then((res) => {
            setCards([res, ...cards]);
            closeAllPopups()
         })
         .catch((err) => console.log(err))
         .finally(() => setIsLoading(false));
   }


   return (
      <CurrentUserContext.Provider value={currentUser}>
         <div className="page">
            <Header/>
               <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteClick}
                  onClose={closeAllPopups}
                  cards={cards}
               />
            <Footer/>
         </div>

         <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
         /> 

         <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUserAvatar}
            isLoading={isLoading}
         /> 

         <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
            isLoading={isLoading}
         />

         <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onDeleteClick={handleCardDelete}
            card={removeCard}
            isLoading={isLoading}
         />

         <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
         />
         </CurrentUserContext.Provider>
   )
}

export default App