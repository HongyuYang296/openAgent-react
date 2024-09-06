import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:8001/api/contacts';

interface ContactFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | undefined;
    additionalInfo?: string;
    time: string;
  }

// Function to get all contacts
export const getContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

// Function to add a contact
export const addContact = async (contactData: ContactFormValues) => {
  try {
    const response = await axios.post(API_URL, contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

// Function to update a contact's status
export const updateContactStatus = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`);
    return response.data;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
};

// Delete 
export const deleteContact = async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };
