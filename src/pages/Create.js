import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate() //metoda za navigaciju do druge stranice

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault() //preventDefault metoda

    if(!title || !method || !rating) { //Ukoliko nije uneta vrednost korektno
      setFormError('You need to fill in all the fields correctly')
      return
    }
    // console.log(title, method, rating)

    const {data, error} = await supabase
    .from('smoothies')
    .insert([{title, method, rating}])       //insert za dodavanje novih podataka. Svaki objekat {} predstavlja red tabele
    .select()

    if (error) {
      console.log(error)
      setFormError('You need to fill in all the fields correctly')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }

  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button className="buttonCreateRecipe">Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}

      </form>
    </div>
  )
}

export default Create