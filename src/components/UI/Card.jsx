

const Card = ({ className, title, image, timestamp, id, onRemoveItem, onClickCard}) => {



  return (
    <div className={`relative h-62 bg-white rounded-xl text-center ${className} max-w-lg cursor-pointer transition duration-150 ease-in hover:opacity-50`} onClick={() => onClickCard(title, image, timestamp, id)}>
      <div className="relative p-5 pt-10 z-0">
        <img src={image} className="w-40 h-40" alt="" />
      </div>
      
      <h1 className="pb-5 font-['Poppins']">{title}</h1>
    </div>
  )
}

export default Card