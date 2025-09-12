import React, { useRef, useState } from 'react';
import { sendForm } from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (form.current) {
      sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        .then((result) => {
            console.log(result.text);
            setIsSuccess(true);
            setError(null);
            form.current?.reset();
        }, (error) => {
            console.log(error.text);
            setError('An error occurred. Please try again.');
            setIsSuccess(false);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      {isSuccess && <div className="bg-green-500 text-white p-4 rounded-md mb-4">Message sent successfully!</div>}
      {error && <div className="bg-red-500 text-white p-4 rounded-md mb-4">{error}</div>}
      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <div>
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-300">Name</label>
          <input type="text" name="user_name" id="user_name" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-300">Email</label>
          <input type="email" name="user_email" id="user_email" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-green-500 focus:border-green-500" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea name="message" id="message" rows={4} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white focus:ring-green-500 focus:border-green-500"></textarea>
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:bg-gray-500">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
