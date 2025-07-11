'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const SupportContext = createContext();

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
};

export const SupportProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load tickets from localStorage
    const savedTickets = localStorage.getItem('supportTickets');
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save tickets to localStorage
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = async (ticketData) => {
    try {
      const newTicket = {
        id: Date.now().toString(),
        ...ticketData,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: '1',
            content: ticketData.message,
            sender: 'user',
            timestamp: new Date().toISOString(),
          }
        ]
      };

      setTickets(prev => [newTicket, ...prev]);
      return { success: true, ticket: newTicket };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateTicketStatus = (ticketId, status) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  const addMessage = (ticketId, message, sender = 'user') => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      sender,
      timestamp: new Date().toISOString(),
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date().toISOString()
          }
        : ticket
    ));
  };

  const getTicketsByUser = (userId) => {
    return tickets.filter(ticket => ticket.userId === userId);
  };

  const value = {
    tickets,
    loading,
    createTicket,
    updateTicketStatus,
    addMessage,
    getTicketsByUser,
  };

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
};