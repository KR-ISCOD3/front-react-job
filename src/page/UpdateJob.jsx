import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom"; // Use this to get job ID from URL
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS for styling

function UpdateJob() {
  const { id } = useParams(); // Extract the job ID from the URL
  const navigate = useNavigate();
  
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time", // Default job type
    description: "",
    applyLink: "",
  });

  // Fetch job data by ID when the component mounts
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`https://express-mongo-8bam.onrender.com/job/${id}`);

          setJobData({
          title: response.data.job.title,
          company: response.data.job.company,
          location: response.data.job.location,
          salary: response.data.job.salary,
          type: response.data.job.type,
          description: response.data.job.description,
          applyLink: response.data.job.applyLink,
        }); // Populate the form with the fetched job data
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error("Failed to load job data. Please try again.");
      }
    };

    fetchJobData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      // Use axios.put to update the job
      const response = await axios.put(
        `https://express-mongo-8bam.onrender.com/admin/put/${id}`,
        jobData, // Data to update the job
        { headers }
      );
      console.log("Job updated successfully:", response.data);
     
      navigate(-1)
    } catch (error) {
      console.error("Error updating job:", error.response || error);
      toast.error("Failed to update job. Please try again.");
    }
  };
  
  // Handle input change for form fields
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid py-5">
      <ToastContainer />
      <div className="row m-0 justify-content-center">
        <div className="col-8 shadow p-5 fredoka-font rounded-2">
          <h1 className="my-3">Update Job</h1>
          <hr />
          <span className="fs-6 text-secondary">
            Please fill out the form below to update the job listing.
          </span>
          <form
            className="p-3 px-5 border rounded-3 mt-3"
            onSubmit={handleSubmit}
          >
            {/* Job Title */}
            <label htmlFor="title" className="form-label mt-3">
              Job title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              className="form-control shadow-none border border-1 my-1"
              onChange={handleChange}
              placeholder="Job Title..."
              required
            />

            {/* Company Name */}
            <label htmlFor="company" className="form-label mt-3">
              Company Name*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={jobData.company}
              className="form-control shadow-none border border-1 my-1"
              onChange={handleChange}
              placeholder="Company Name..."
              required
            />

            {/* Location */}
            <label htmlFor="location" className="form-label mt-3">
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={jobData.location}
              className="form-control shadow-none border border-1 my-1"
              onChange={handleChange}
              placeholder="Location..."
              required
            />

            <div className="d-flex justify-content-between">
              {/* Salary */}
              <div className="col-6 me-2">
                <label htmlFor="salary" className="form-label mt-3">
                  Salary*
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={jobData.salary}
                  className="form-control shadow-none border border-1 my-1"
                  onChange={handleChange}
                  placeholder="Salary..."
                  required
                />
              </div>

              {/* Job Type */}
              <div className="col-6">
                <label htmlFor="type" className="form-label mt-3">
                  Job Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={jobData.type}
                  className="form-select shadow-none border border-1 my-1"
                  onChange={handleChange}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <label htmlFor="description" className="form-label mt-3">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              className="form-control shadow-none border border-1 my-1"
              style={{ resize: "none" }}
              rows={5}
              onChange={handleChange}
              placeholder="Job Description"
              required
            ></textarea>

            {/* Apply Link */}
            <label htmlFor="link" className="form-label mt-3">
              Apply Link*
            </label>
            <input
              type="url"
              id="applyLink"
              name="applyLink"
              value={jobData.applyLink}
              className="form-control shadow-none border border-1 my-1"
              onChange={handleChange}
              placeholder="Link..."
              required
            />

            {/* Buttons */}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="my-3 mx-1 px-3 btn btn-success"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateJob;
