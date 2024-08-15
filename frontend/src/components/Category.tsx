import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftMenu from "./LeftMeanu";
import MainTop from "./MainTop";
import "bootstrap/dist/css/bootstrap.min.css";

const apiUrl = process.env.REACT_APP_API_URL;

interface Category {
  _id: string;
  title: string;
  status: number;
  created_at: string;
  updated_at: string;
  __v: number;
}

const Category: React.FC = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false); // Modal state for adding category
  const [showEditModal, setShowEditModal] = useState(false); // Modal state for editing category
  const [formData, setFormData] = useState({
    title: '',
    status: 1,
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // Selected category for editing

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiUrl}/api/categories/getcategorys`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setCategory(response.data);
        } else {
          console.error("Failed to fetch category:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleEditClick = (cat: Category) => {
    setSelectedCategory(cat); // Set the selected category for editing
    setShowEditModal(true); // Show the modal
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCategory) {
      setSelectedCategory({
        ...selectedCategory,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCategory) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${apiUrl}/api/categories/edit/${selectedCategory._id}`,
          selectedCategory,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setCategory(
            category.map((cat) =>
              cat._id === selectedCategory._id ? response.data : cat
            )
          ); // Update the category list
          setShowEditModal(false); // Close the modal
          setSelectedCategory(null); // Reset the selected category
        } else {
          console.error("Failed to update category:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/api/categories/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setCategory([...category, response.data]); // Add the new category to the list
        setShowModal(false); // Close the modal
        setFormData({ title: '', status: 1 }); // Reset the form
      } else {
        console.error("Failed to add category:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <LeftMenu />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <MainTop />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">
                      View Categories
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            S#No#
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Title
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Created
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Updated
                          </th>
                          <th className="text-secondary opacity-7">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.map((cat, index) => (
                          <tr key={cat._id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{index + 1}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {cat.title}
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span
                                className={`badge badge-sm ${
                                  cat.status === 1
                                    ? "bg-gradient-success"
                                    : "bg-gradient-danger"
                                }`}
                              >
                                {cat.status === 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {new Date(cat.created_at).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {new Date(cat.updated_at).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="align-middle">
                              <button
                                type="button"
                                className="text-secondary font-weight-bold text-xs"
                                onClick={() => setShowModal(true)}
                              >
                                <i className="material-icons">add</i>
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                className="text-secondary font-weight-bold text-xs"
                                onClick={() => handleEditClick(cat)}
                              >
                                <i className="material-icons">edit</i>
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                className="text-secondary font-weight-bold text-xs"
                                onClick={() => handleEditClick(cat)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Editing Category */}
        <div className={`modal fade ${showEditModal ? "show" : ""}`}
          style={{ display: showEditModal ? "block" : "none" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Category</h5>
                <button type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                <input
                      type="hidden"
                      className="form-control"
                      id="id"
                      name="id"
                      value={selectedCategory?._id || ""}
                      onChange={handleEditChange}
                      required/>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={selectedCategory?.title || ""}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="status"
                      name="status"
                      value={selectedCategory?.status || 1}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Adding Category */}
        <div className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Category;
