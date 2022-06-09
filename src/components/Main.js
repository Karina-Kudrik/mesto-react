import { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
   const [userName, setUserName] = useState('');
   const [userDescription, setUserDescription] = useState('');
   const [userAvatar, setUserAvatar] = useState('');
   const [cards, setCards] = useState([]);

   useEffect(() => {
      api.getUserInfo()
         .then((res) => (
            setUserName(res.name),
            setUserDescription(res.about),
            setUserAvatar(res.avatar)
         )).catch((err) => console.log(err));

      api.getInitialCards()
      .then((res) => {
         setCards(res)
      }).catch((err) => console.log(err));
   })

   return(
      <main className="content">
         <section className="profile">
            <div className="profile__image-container">
               <img onClick={props.onEditAvatar} className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} src={userAvatar} alt="Жак-Ив Кусто"/>
            </div>
         <div className="profile__info">
            <div className="profile__info-edit">
               <h1 className="profile__name">{userName}</h1>
               <button onClick={props.onEditProfile} className="profile__button profile__button_type_edit" type="button" aria-label="Редактировать профиль"></button>
            </div>
               <p className="profile__description">{userDescription}</p>
         </div>
            <button onClick={props.onAddPlace} className="profile__button profile__button_type_add" type="button" aria-label="Добавить"></button>
         </section>
         <section className="elements">
         <ul className="elements__container" id="container" name="container">
            {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
         ))}
         </ul>
         </section>
      </main>
   )
}

export default Main