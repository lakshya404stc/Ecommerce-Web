
import React,{useState, useEffect} from 'react'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
// import { useNavigate } from "react-router-dom";
import Adminmenu from '../../components/Layout/Adminmenu';
import Layout from '../../components/Layout/Layout';
const { Option } = Select;

const Createproduct = () => {

  // const navigate = useNavigate();

  const [categories,setCategories] = useState([])
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
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
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping",shipping)
      
      const {data} = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
        );
        console.log(data)
      if (data?.success === "true") {
        toast.success(data?.messege);
      } else {
        toast.error(data?.messege)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div className="row m-0 p-0">
        <div className="col-md-4 m-3 p-3">
          <Adminmenu />
        </div>
        <div className="col-md-6 m-3 p-2">
          <div className='card container p-3 form-group p-4'>
          <h1 className='category-head'>Create Product</h1>
          <div className="m-1">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
              
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleCreate}>
                Create product
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
  </Layout>
  )
}

export default Createproduct