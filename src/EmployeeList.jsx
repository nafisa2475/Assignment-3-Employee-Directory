function EmployeeList({ employees, onDelete, onEdit }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        employees.map((emp) => (
          <div
            key={emp.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{emp.name}</h3>
            <p>Department: {emp.department}</p>
            <p>Position: {emp.position}</p>
            <p>Email: {emp.email}</p>

            <button onClick={() => onEdit(emp)}>Edit</button>{" "}
            <button onClick={() => onDelete(emp.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default EmployeeList;
