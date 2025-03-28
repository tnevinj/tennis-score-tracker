'use client'
import { useState } from 'react';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';

const ContactPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
        }

        // Send form data to the server
        try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            alert('Message sent successfully');
            // Reset form fields
            setName('');
            setEmail('');
            setMessage('');
            closeModal()
            router.push('/matches');

        } else {
            alert('Failed to send message');
        }
        } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
        }

    };
    const handleBackClick = () => {
        router.push('/matches');
      };
    
    return (
        <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className='mb-4'>
                <label htmlFor="name" className="block mb-2 font-bold">Name:</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="message" className="block mb-2 font-bold">Message:</label>
                <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
                ></textarea>
            </div>
            <div className='space-x-8'>
                <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                    Send
                </button>
                <button
                    onClick={handleBackClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Go to Matches
                </button>
            </div>
            </form>
        </Modal>
        </div>
    );
};

export default ContactPage;