
import { defineStore } from 'pinia';
import apiClient, { isAxiosError } from '../api/axios.js';

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    contacts: [],
    errorMessage: null,
  }),

  actions: {
    async fetchContacts() {
      try {
        const response = await apiClient.get('/contacts');
        this.contacts = response.data;
      } catch (error) {
        this.handleError(error, 'Failed to fetch contacts.');
      }
    },

    async fetchContact(id) {
      try {
        const response = await apiClient.get(`/contacts/${id}`);
        return response.data;
      } catch (error) {
        this.handleError(error, 'Failed to fetch contact.');
        return undefined;
      }
    },

    async addContact(contact) {
      try {
        this.errorMessage = null;
        const response = await apiClient.post('/contacts', contact);
        this.contacts.push(response.data);
      } catch (error) {
        this.handleError(error, 'Failed to add contact.');
      }
    },

    async updateContact(id, updatedContact) {
      try {
        this.errorMessage = null;
        await apiClient.put(`/contacts/${id}`, updatedContact);
        const index = this.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
          this.contacts[index] = { ...this.contacts[index], ...updatedContact };
        }
      } catch (error) {
        this.handleError(error, 'Failed to update contact.');
      }
    },

    async deleteContact(id) {
      try {
        this.errorMessage = null;
        await apiClient.delete(`/contacts/${id}`);
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      } catch (error) {
        this.handleError(error, 'Failed to delete contact.');
      }
    },

    handleError(error, fallbackMessage) {
      if (isAxiosError(error) && error.response) {
        this.errorMessage = error.response.data.message || fallbackMessage;
      } else {
        this.errorMessage = fallbackMessage;
      }
    },
  },
});
