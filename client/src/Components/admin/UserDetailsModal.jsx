/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './UserDetailsModal.css'; // Custom CSS for styling

const url = `http://localhost:3000`;

const UserDetailsModal = ({ show, handleClose, user }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  
  const handleEdit = async () => {
    try {
     
      if (name.length < 3) {
        setMessage('name must be at least 3 characters long.');
        setColor('red');
        return;
      }

      const allowedDomains = ['gmail.com', 'yahoo.com', 'apple.com', 'outlook.com'];
      const emailDomain = email.split('@')[1];
      if (!allowedDomains.includes(emailDomain)) {
        setMessage('Email address must belong to Gmail, Yahoo, Apple, or Outlook.');
        setColor('red');
        return;
      }

      if (!name.trim() || !email.trim()) {
        setMessage('Name and email cannot be empty.');
        setColor('red');
        return;
      }

      const userId = user ? user._id : '';
      const response = await axios.post(`${url}/admin/edituser`, { name, email, userId });
      if (response.data.aleady) {
        setMessage(response.data.aleady);
        setColor('red');
      } else {
        setMessage(response.data.message);
        user.email=email
        user.name=name

        console.log('from edit',user);
        setColor('green');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setMessage('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color }}>{message}</p>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(UserDetailsModal);
