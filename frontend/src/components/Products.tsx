import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeftMenu from "./LeftMeanu";
import MainTop from "./MainTop";

const apiUrl = process.env.REACT_APP_API_URL;

interface Category {
  _id: string;
  title: string;
}

interface Products {
  _id: string;
  name: string;
  status: number;
  prod_sku: string;
  description: string;
  selling_price: number;
  stock_qty: number;
  created_at: string;
  updated_at: string;
  categories: string | null; // Single category ID
  __v: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // State for categories

  const [showModal, setShowModal] = useState(false); // Modal state for adding product
  const [showEditModal, setShowEditModal] = useState(false); // Modal state for editing product
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null); // Selected category for editing
  const [formData, setFormData] = useState({
    name: "",
    status: 1,
    prod_sku: "",
    description: "",
    selling_price: 0,
    stock_qty: 0,
    categories: "", // Single category ID
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (selectedProduct) {
      const { name, value } = e.target;

      setSelectedProduct({
        ...selectedProduct,
        [name]: value,
      });
    }
  };

  /*
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
*/
  const handleEditClick = (prod: Products) => {
    setSelectedProduct(prod); // Set the selected category for editing
    setShowEditModal(true); // Show the modal
  };

  /*
const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (selectedProduct) {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  }
};*/

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${apiUrl}/api/products/edit/${selectedProduct._id}`,
          selectedProduct,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data) {
          setProducts(
            products.map((cat) =>
              cat._id === selectedProduct._id ? response.data : cat
            )
          ); // Update the category list
          setShowEditModal(false); // Close the modal
          setSelectedProduct(null); // Reset the selected category
        } else {
          console.error("Failed to update product:", response.data.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/api/products/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setProducts([...products, response.data]); // Add the new category to the list
        setShowModal(false); // Close the modal
        setFormData({
          name: "",
          status: 1,
          prod_sku: "",
          description: "",
          selling_price: 0,
          stock_qty: 0,
          categories: "",
        }); // Reset the form
      } else {
        console.error("Failed to add product:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/api/products/getproducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setProducts(response.data);
        } else {
          console.error("Failed to fetch products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
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
          setCategories(response.data);
        } else {
          console.error("Failed to fetch categories:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

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
                            Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Sku
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Price
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Stock
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
                        {products.map((prod, index) => (
                          <tr key={prod._id}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{index + 1}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {prod.name}
                              </p>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {prod.prod_sku}
                              </p>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {prod.selling_price}
                              </p>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {prod.stock_qty}
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span
                                className={`badge badge-sm ${
                                  prod.status === 1
                                    ? "bg-gradient-success"
                                    : "bg-gradient-danger"
                                }`}
                              >
                                {prod.status === 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {new Date(prod.created_at).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                {new Date(prod.updated_at).toLocaleDateString()}
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
                                onClick={() => handleEditClick(prod)}
                              >
                                <i className="material-icons">edit</i>
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                className="text-secondary font-weight-bold text-xs"
                                onClick={() => handleEditClick(prod)}
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

            {/* Modal for Editing Product */}
            <div
              className={`modal fade ${showEditModal ? "show" : ""}`}
              style={{ display: showEditModal ? "block" : "none" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Product</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEditModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleEditSubmit}>
                      <input
                        type="hidden"
                        className="form-control"
                        id="id"
                        name="id"
                        value={selectedProduct?._id || ""}
                        onChange={handleEditChange}
                        required
                      />
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={selectedProduct?.name || ""}
                          onChange={handleEditChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-control"
                          id="category"
                          name="category"
                          value={selectedProduct?.categories || ""}
                          onChange={handleEditChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option
                              className="form-control"
                              key={category._id}
                              value={category._id}
                            >
                              {category.title}
                            </option>
                          ))}
                        </select>
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
                          value={selectedProduct?.status || 1}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="selling_price" className="form-label">
                          Selling price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="selling_price"
                          name="selling_price"
                          value={selectedProduct?.selling_price || 0}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="selling_price" className="form-label">
                          Stock qty
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock_qty"
                          name="stock_qty"
                          value={selectedProduct?.stock_qty || 0}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="prod_sku" className="form-label">
                          Product sku
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="prod_sku"
                          name="prod_sku"
                          value={selectedProduct?.prod_sku || 1}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={selectedProduct?.description || ""}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Update Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal for Adding Category */}
            <div
              className={`modal fade ${showModal ? "show" : ""}`}
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Product</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-control"
                          id="category"
                          name="category"
                          value={selectedProduct?.categories || ""}
                          onChange={handleEditChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          {" "}
                          Status{" "}
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
                      <div className="mb-3">
                        <label htmlFor="selling_price" className="form-label">
                          {" "}
                          Selling price{" "}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="selling_price"
                          name="selling_price"
                          value={formData.selling_price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="stock_qty" className="form-label">
                          {" "}
                          Stock qty{" "}
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock_qty"
                          name="stock_qty"
                          value={formData.status}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="prod_sku" className="form-label">
                          {" "}
                          Product sku{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="prod_sku"
                          name="prod_sku"
                          value={formData.prod_sku}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          {" "}
                          Description{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Save Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
