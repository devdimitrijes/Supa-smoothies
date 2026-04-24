import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";

//komponente
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null); //ukoliko dodje do greske prilikom fetch-ovanja
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((sm) => sm.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase //pozivanje supabase client-a i fetch-ovanje podataka od njega
        .from("smoothies") //naziv tabele iz koje uzimamo podatke
        .select() //.select bez argumenata, vraca sve podatke iz tabele
        .order(orderBy, {ascending: false})

      if (error) {
        setFetchError("Could not fetch the smoothies!");
        setSmoothies(null); //resetovanje vrednosti na null, ukoliko smo imali neku vrednost u smoothies prethodno
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]); //svaki put kad se promeni vrednost za order by, data ce se refetch-ovati

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">

          <div className="order-by">
          <p>Order by:</p>
          <button onClick={() => setOrderBy('created_at')}>Time Created</button>
          <button onClick={() => setOrderBy('title')}>Title</button>
          <button onClick={() => setOrderBy('rating')}>Rating</button>
          {orderBy}
          </div>

          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              ></SmoothieCard> //mora da ima key!
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;
