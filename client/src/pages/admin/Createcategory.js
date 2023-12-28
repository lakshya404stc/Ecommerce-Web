import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "antd";

const Createcategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [updatedname, setUpdatedname] = useState("");
  const [selected, setSelected] = useState();
  const [name, setName] = useState("");

  const handelUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
        {
          name: updatedname,
        }
      );
      if (res.data.success === "true") {
        toast.success(res.data.messege);
        setVisible(false);
        setUpdatedname("");
      } else {
        toast.error(res.data.messege);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getcategory`
      );
      setCategories(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${item._id}`,
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      fetchData()
      if (res.data.success === "true") {
        toast.success(res.data.messege);
      } else {
        toast.error(res.data.messege);
      }
    } catch (error) {
      console.log(error);
      toast.error("error deleting the category");
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        },
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      fetchData()
      if (res?.data?.success === "true") {
        toast.success(res?.data?.messege);
      } else {
        toast.error(res?.data?.messege);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row m-0 p-0">
        <div className="col-md-4 m-3 p-3">
          <Adminmenu />
        </div>
        <div className="col-md-6 m-3 p-2">
          <div className="card">
            <div className="container p-3">
              <form>
                <div className="form-group p-4">
                  <h3 className="category-head">Create New Category</h3>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Category"
                  />
                  <button
                    type="submit"
                    onClick={handelSubmit}
                    className="m-3 btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <table className="table container-fluid table-bordered m-3 w-auto mt-0">
              <thead>
                <tr>
                  <th colSpan="2">
                    <h3 className="category-head">Manage Categories</h3>
                  </th>
                </tr>
                <tr>
                  <th scope="col">Categories</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((item) => (
                  <tr key={item._id}>
                    <td className="category-title">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-primary "
                        onClick={() => {
                          setVisible(true);
                          setSelected(item._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-3 "
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => {setVisible(false);setUpdatedname("")}}
            footer={null}
            open={visible}
          >
            <div className="container p-3">
              <form onSubmit={handelUpdate}>
                <div className="form-group p-4">
                  <h3 className="category-head">Update Category</h3>
                  <input
                    value={updatedname}
                    onChange={(e) => setUpdatedname(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Update category"
                  />
                  <button onClick={()=>setTimeout(fetchData, 1000)} type="submit" className="m-3 btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
