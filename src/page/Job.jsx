import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"; // Import from react-bootstrap
import { useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

function Job() {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decode = jwtDecode(token);
        setIsAdmin(decode.role === "admin");
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }

    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://express-mongo-8bam.onrender.com/job/${id}`); // Make GET request with job ID
        setJob(response.data.job);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]); // Ensure the effect runs when the ID changes

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error loading job details: {error.message}</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  // Functions for update and delete buttons
  const handleUpdate = () => {
    navigate(`/admin/updatejob/${id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.delete(`https://express-mongo-8bam.onrender.com/admin/delete/${id}`, {
        headers,
      });
      navigate(-1); // Navigate back after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
    setShowModal(false); // Close the modal after deletion
  };
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-3 fredoka-font px-5">
      <button
        className="btn btn-secondary my-3 fredoka-font"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="row justify-content-between">
        <div className="col-7 p-3 p-lg-5 shadow">
          <h1>{job.title}</h1>
          <p className="m-0">
            {job.location} / ${job.salary} / {job.location}
          </p>
          <p>
            Job type: <span className="text-success">{job.type}</span>
          </p>
          <h5>Company</h5>
          <div className="ps-3 w-75">
            <p>- {job.company}</p>
          </div>
          <h5>Job Description*</h5>
          <div className="ps-3">
            <p>{job.description}</p>
          </div>

          {isAdmin && (
            <div className="mt-4">
              <button className="btn btn-warning me-2" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-danger" onClick={handleShowModal}>
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="col-4 p-3 p-lg-5 shadow" style={{ height: "200px" }}>
          <h1>Link for submit!</h1>
          <a href={job.applyLink}>{job.applyLink}</a>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Job;
