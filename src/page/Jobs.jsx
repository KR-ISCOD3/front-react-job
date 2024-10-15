import { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import { FaLocationDot } from "react-icons/fa6";
import { PiBagFill } from "react-icons/pi";
import { NavLink, useNavigate } from 'react-router-dom';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        // Make GET request to fetch jobs from the backend
        const response = await axios.get('https://express-mongo-8bam.onrender.com/get');
        setJobs(response.data.jobs);  // Set the jobs data
        setLoading(false);  // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err);  // Set error state
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading jobs: {error.message}</p>;
  }

  return (
    <div className="container-fluid mt-2 mt-lg-3">
      <button className="btn btn-secondary mx-3 my-3 fredoka-font" onClick={() => navigate(-1)}>
          Back
      </button>
      <div className="container p-0">
        <div className="row m-0">
          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4 my-2" key={job._id}>
              <div className="card p-4 fredoka-font">
                <div className="card-title">
                  <h2>{job.title}</h2>
                  <hr />
                </div>
                <div className="card-body p-0">
                  <div className="d-flex align-items-center text-secondary">
                    <FaLocationDot />
                    <span className="mx-1 align-middle">{job.location}</span>
                  </div>
                  <p className="text-limit">
                    {job.description}
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <PiBagFill className="fs-3 text-success m-0" />
                    <NavLink to={`/job/${job._id}`} className="btn bg-success text-light ">
                      View job
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}

export default Jobs;
