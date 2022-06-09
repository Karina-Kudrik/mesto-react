function Card({card, onCardClick}) {
   
   const handleClick = () => {
      onCardClick(card);
   }

   return (
      <li className="elements__card">
         <img 
            className="elements__item" 
            src={card.link} 
            alt={card.name} 
            onClick={handleClick}
         />
            <div className="elements__figcaption">
               <h3 className="elements__card-heading">{card.name}</h3>
            <div className="elements__counter">
               <button className="elements__like"></button>
               <p className="elements__like-counter">{card.likes.length}</p>
            </div>
            <button className="elements__delete"></button>
         </div>
      </li>
   )
}

export default Card