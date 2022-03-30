import { useState } from "react";
import "./Create.css";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const { documents } = useCollection("users");
  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useNavigate();
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignUsers, setAssignUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Please select a category");
      return;
    }
    if (assignUsers.length < 1) {
      setFormError("please assign the project to atleast one user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      history("/");
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name: </span>
          <input
            required
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <label>
          <span>Project Details: </span>
          <textarea
            required
            type="text"
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            value={details}
          />
        </label>
        <label>
          <span>Set Due Date: </span>
          <input
            required
            type="date"
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category: </span>
          <Select
            onChange={(option) => {
              setCategory(option);
            }}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to: </span>
          <Select
            onChange={(option) => {
              setAssignUsers(option);
            }}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
