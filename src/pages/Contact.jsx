import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setIsSubmitted(true);
      alert("Thank you! Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="w-10/12 lg:w-9/12 mx-auto py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Contact Us</h1>
      {isSubmitted && (
        <p className="text-green-600 font-medium mb-6">
          Thank you! Your message has been received.
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6 border border-gray-200"
      >
        <div className="text-left">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="text-left">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Your Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email"
            required
          />
        </div>
        <div className="text-left">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Type your message here..."
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700  hover:bg-gray-600 text-white py-3 px-4 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
