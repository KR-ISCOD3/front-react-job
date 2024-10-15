import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();


  const handleClick = () =>{
    // check token is exists or not
    const token = localStorage.getItem('token');
    const isExpired = localStorage.getItem('isExpired');

    if(token && isExpired){     
        // if token is existing then go to jobs page
        navigate('/jobs');      
    }
    else{
        // if token is not present back to login page
        navigate('/login');
    }
  }
  

  return (
    <div className="container-fluid p-0">
      <div className="w-50 m-auto d-block align-items-center py-5 text-center fredoka-font">
        <h1>Welcome to React Jobs</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          totam minima quae dignissimos quasi culpa itaque esse quia vel dicta,
          incidunt est porro libero amet accusamus error aperiam, vero
          recusandae.
        </p>
        <button className="btn btn-success fs-5" onClick={handleClick}>
            View all jobs
        </button>
      </div>
    </div>
  );
}

export default Home;
