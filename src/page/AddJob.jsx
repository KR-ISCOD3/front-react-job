import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddJob() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time", // Default job type
    description: "",
    applyLink: "",
  });

  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add Authorization header if token exists
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post("https://express-mongo-8bam.onrender.com/admin/post", jobData, { headers });
      console.log("Job data submitted:", response.data);
      toast.success("Job added successfully!");

      // Clear form fields
      setJobData({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "Full-time",
        description: "",
        applyLink: "",
      });
    } catch (error) {
      if (error.response) {
          console.error("Error submitting job:", error.response.data);
          toast.error(`Failed to add job: ${error.response.data.message || "Please try again."}`);
      } else {
          console.error("Error submitting job:", error);
          toast.error("Failed to add job. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid py-5">
      <ToastContainer />
      <div className="row m-0 justify-content-center">
        <div className="col-8 shadow p-5 fredoka-font rounded-2">
          <h1 className="my-3">Form Add Job</h1>
          <hr />
          <span className="fs-6 text-secondary">
            Please fill out the form below to add a new job listing. Make sure
            to provide accurate and complete information, as this will help
            ensure that your job posting reaches the right candidates.
          </span>
          <form className="p-3 px-5 border rounded-3 mt-3" onSubmit={handleSubmit}>
            {/* Job Title */}
            <label htmlFor="title" className="form-label mt-3">Job title*</label>
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
            <label htmlFor="company" className="form-label mt-3">Company Name*</label>
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
            <label htmlFor="location" className="form-label mt-3">Location*</label>
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
                <label htmlFor="salary" className="form-label mt-3">Salary*</label>
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
                <label htmlFor="jobtype" className="form-label mt-3">Job Type*</label>
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
            <label htmlFor="description" className="form-label mt-3">Description*</label>
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
            <label htmlFor="link" className="form-label mt-3">Apply Link*</label>
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
              <button type="submit" className="my-3 mx-1 px-3 btn btn-success">
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
