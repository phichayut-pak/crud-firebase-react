import { useRef } from 'react'

const Form = ({ onSendValue }) => {
  const title = useRef("")
  const image = useRef("") 

  const onSubmitHandler = (e) => {
    e.preventDefault()
    onSendValue(title.current.value, image.current.value)
    title.current.value = ""
    image.current.value = ""
    
  }

  return (
    <div className="mt-40">
      <form className='px-5 py-2 bg-white rounded-xl' onSubmit={onSubmitHandler}>
        <input className="block my-2 bg-indigo-300 px-3 py-1 rounded-lg text-black placeholder:text-black font-['Poppins'] focus:outline-0" type="text" placeholder="Title" ref={title}/>
        <input className="block my-2 bg-indigo-300 px-3 py-1 rounded-lg text-black placeholder:text-black font-['Poppins'] focus:outline-0" type="text" placeholder="Image URL" ref={image}/>
        <input type="submit" hidden />
      </form>
    </div>
  )
}

export default Form