import { useState } from "react";
import Header from "./components/Header";
import Footer from "./Footer";
import EmployeeList from "./EmployeeList";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      department: "IT",
      position: "Software Developer",
      email: "rahul@gmail.com"
    },
    {
      id: 2,
      name: "Priya Das",
      department: "HR",
      position: "HR Manager",
      email: "priya@gmail.com"
    },
    {
      id: 3,
      name: "Amit Roy",
      department: "Finance",
      position: "Accountant",
      email: "amit@gmail.com"
    }
  ]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("IT");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !position || !email) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setEmployees(employees.map((emp) =>
        emp.id === editId
          ? { ...emp, name, department, position, email }
          : emp
      ));
      setEditId(null);
    } else {
      setEmployees([...employees, {
        id: Date.now(),
        name,
        department,
        position,
        email
      }]);
    }

    setName("");
    setDepartment("IT");
    setPosition("");
    setEmail("");
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (employee) => {
    setEditId(employee.id);
    setName(employee.name);
    setDepartment(employee.department);
    setPosition(employee.position);
    setEmail(employee.email);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment =
      filter === "All" || emp.department === filter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      <Header />

      <h2 className="page-title">Employee Management</h2>

      <div className="employee-count">
        Total Employees: {employees.length}
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>
        <h2>{editId ? "Edit Employee" : "Add Employee"}</h2>

        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div className="controls">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>
      </div>

      <EmployeeList
        employees={filteredEmployees}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <Footer />
    </div>
  );
}

export default App;
