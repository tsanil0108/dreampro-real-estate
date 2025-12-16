import React from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import './WorkCategories.css';

const WorkCategories = () => {
    
    // Contact numbers with names/identifiers
    const contactNumbers = [
        { 
            number: '7304603314', 
            label: 'Primary',
            type: 'whatsapp'
        },
        { 
            number: '8356962978', 
            label: 'Secondary',
            type: 'phone'
        }
    ];
    
    // 100+ Interior Work Categories (12 categories total)
    const workCategories = [{
            id: 'manicure-table',
            name: 'Manicure Table',
            description: 'Specialized manicure tables',
            images: [
                'https://images.unsplash.com/photo-1607779098929-a20c6406dd54?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1633106933056-40d0a1ce73ea?w=800&auto=format&fit=crop'
            ]
        },
        {
            id: 'pedicure-station',
            name: 'Pedicure Station',
            description: 'Comfortable pedicure stations',
            images: [
                'https://images.unsplash.com/photo-1633106933056-40d0a1ce73ea?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1607779098929-a20c6406dd54?w=800&auto=format&fit=crop'
            ]
        },
        {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },

          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },  {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },
          {
            id: 'waiting-lounge',
            name: 'Waiting Lounge',
            description: 'Comfortable client waiting areas',
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop'
            ]
        },

        {
            id: 'facial-room',
            name: 'Facial Room',
            description: 'Professional facial treatment rooms',
            images: [
                'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop'
            ]
        }
    ];

    const handleWhatsAppClick = (phoneNumber) => {
        const whatsappUrl = `https://wa.me/91${phoneNumber}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    const handlePhoneClick = (phoneNumber) => {
        const telUrl = `tel:+91${phoneNumber}`;
        
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            window.location.href = telUrl;
        } else {
            alert(`To call this number: +91 ${phoneNumber}\n\nOn mobile, this would open your phone dialer.`);
        }
    };

    return (
        <div className="work-categories-container">
            <div className="work-categories-wrapper"> 
                <div className="work-categories-header-container"> 
                    <h1 className="work-categories-main-title">100+ Interior & Exterior Work Categories</h1> 
                    <p className="work-categories-subtitle">Explore our comprehensive range of specialized interior, exterior, and custom work services</p> {/* Changed class */}
                    <div className="work-categories-count-badge"> 
                        <span className="work-count-badge">{workCategories.length}+ Work Categories</span> 
                    </div>
                </div>
                
                <div className="work-categories-list-grid"> 
                    {workCategories.map(category => (
                        <div 
                            key={category.id} 
                            className="work-category-item-card" 
                            
                        >
                          
                            <div className="category-work-image-gallery"> 
                                <div className="work-image-scroll-container"> 
                                    {category.images.map((img, index) => (
                                        <div key={index} className="work-scroll-image-item"> 
                                            <img src={img} alt={`${category.name} ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="work-image-overlay"> 
                                    <div className="work-image-count"> 
                                        <span>{category.images.length} Photos</span>
                                    </div>
                                </div>
                                <div className="work-scroll-indicator"> 
                                    <span>← Scroll →</span>
                                </div>
                            </div>
                            
                            <div className="work-category-content"> 
                                <h3 className="work-category-name">{category.name}</h3>
                                <p className="work-category-description">{category.description}</p> 
                                
                                <div className="work-contact-section-header"> 
                                    <h4 className="work-contact-title">Contact for Inquiry:</h4> 
                                </div>
                                
                                <div className="work-contact-icons-container"> 
                                    <div className="work-contact-icons-row"> 
                                        <div className="work-contact-icon-group"> 
                                            <span className="work-contact-label">Primary</span> 
                                            <div className="work-contact-icon-buttons"> 
                                                <button
                                                    className="work-contact-icon-btn work-whatsapp-btn" 
                                                    onClick={() => handleWhatsAppClick('7304603314')}
                                                    title="WhatsApp: 7304603314"
                                                >
                                                    <FaWhatsapp className="work-contact-icon" /> 
                                                </button>
                                                <button
                                                    className="work-contact-icon-btn work-phone-btn" 
                                                    onClick={() => handlePhoneClick('7304603314')}
                                                    title="Call: 7304603314"
                                                >
                                                    <FaPhone className="work-contact-icon" /> 
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="work-contact-icon-group"> 
                                            <span className="work-contact-label">Secondary</span> 
                                            <div className="work-contact-icon-buttons">
                                                <button
                                                    className="work-contact-icon-btn work-whatsapp-btn" 
                                                    onClick={() => handleWhatsAppClick('8356962978')}
                                                    title="WhatsApp: 8356962978"
                                                >
                                                    <FaWhatsapp className="work-contact-icon" /> 
                                                </button>
                                                <button
                                                    className="work-contact-icon-btn work-phone-btn" 
                                                    onClick={() => handlePhoneClick('8356962978')}
                                                    title="Call: 8356962978"
                                                >
                                                    <FaPhone className="work-contact-icon" /> 
                                                    
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkCategories;