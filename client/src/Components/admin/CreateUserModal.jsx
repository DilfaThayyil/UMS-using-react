import React, { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './UserDetailsModal.css'; // Custom CSS for styling
const url = `http://localhost:3000`;

const CreateUserModal = ({ show, handleClose, onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');


  useEffect(() => {
    if (!show) {
      setMessage('');
      setColor('');
    }
  }, [show]);
  const handleCreate = async () => {
    try {
      // Email domain validation
      const allowedDomains = ['gmail.com', 'apple.com', 'yahoo.com', 'outlook.com'];
      const emailDomain = email.split('@')[1];
      if (!allowedDomains.includes(emailDomain)) {
        setMessage('Email domain must be Gmail, Apple, Yahoo, or Outlook.');
        setColor('red');
        return;
      }

      if (name.length < 3) {
        setMessage('name must be at least 3 characters long.');
        setColor('red');
        return;
      }
  
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters long.');
        setColor('red');
        return;
      }
  
      if (/\s/.test(email)) {
        setMessage('Email address cannot contain spaces.');
        setColor('red');
        return;
      }
  
      const response = await axios.post(`${url}/api/signup`, { name, email, password });
      console.log(response.data);
      if (response.data.error) {
        setMessage(response.data.error);
        setColor('red');
      } else {
        setMessage(response.data.message);
        setEmail('');
        setName('');
        setPassword('');
        setColor('green');
        onUserCreated();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: color }}>{message}</p>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control-stylish"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control-stylish"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control-stylish"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
