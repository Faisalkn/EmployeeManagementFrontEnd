import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, styled } from '@mui/material';

const StyledForm = styled('form')({
  '& > *': {
    margin: '8px',
  },
});

export default function Employee() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSubmitDisabled = !firstName || !lastName || !email;

  const handleClick = (e) => {
    e.preventDefault();
    const newEmployee = { firstName, lastName, email };

    setLoading(true);

    fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee)
    })
      .then(() => {
        console.log("New Employee added");
        setFirstName('');
        setLastName('');
        setEmail('');
      })
      .catch(error => {
        console.error("Error adding employee:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then(res => res.json())
      .then(result => {
        setEmployees(result);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>Add Employee</h1>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic-first-name"
            label="Employee First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-basic-last-name"
            label="Employee Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ marginTop: '16px' }}
          />
          <TextField
            id="outlined-basic-last-name"
            label="Employee Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: '16px' }}
          />
        </form>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(employees) ? (
            employees.map((employee) => (
              <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={employee.id}>
                Id: {employee.id}<br />
                First Name: {employee.firstName}<br />
                Last Name: {employee.lastName}<br />
                Email: {employee.email}
              </Paper>
            ))
          ) : (
            <p>No employee data available</p>
          )
        )}
      </Paper>

      <Button variant="contained" onClick={handleClick} disabled={isSubmitDisabled || loading}>
        {loading ? "Adding Employee..." : "Add Employee"}
      </Button>
    </Container>
  );
}



