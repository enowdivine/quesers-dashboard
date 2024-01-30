import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import {
  getAllCategories,
  deleteHandler,
} from "../../../helpers/redux/categories";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";
import { toast } from "react-toastify";

const ListCategories = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [rsType, setRsType] = useState([]);
  const dispatch = useDispatch();
  const categoriesStates = useSelector((state) => state.categories.categories);

  const resourceTypes = async () => {
    await getAllCategories(dispatch, setLoading);
  };

  const handleDelete = async (item) => {
    var result = window.confirm(
      `Are you sure you want to delete ${item.title}?`
    );
    if (result) {
      const response = await deleteHandler(item, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        return;
      }
    } else {
      console.log("Logout canceled.");
      return;
    }
  };

  useEffect(() => {
    resourceTypes();
  }, [userId]);

  useEffect(() => {
    setRsType(categoriesStates);
  }, [categoriesStates]);

  return (
    <Layout>
      <ModalComponent
        action="categories"
        item={editItem}
        editShow={editCategory}
        editClose={setEditCategory}
      />
      <div className="CRTable">
        <table>
          <tr>
            <th>Name</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            rsType?.length > 0 &&
            rsType.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        setEditCategory(!editCategory);
                        setEditItem(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.actionBtnDecline}
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </table>
      </div>
    </Layout>
  );
};

export default ListCategories;
