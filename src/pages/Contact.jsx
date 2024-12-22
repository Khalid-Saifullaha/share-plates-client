import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, email, message });
    alert("Your message has been sent!");
  };

  return (
    <div className="text-center py-32">
      <h1 className="text-5xl font-medium">Contact Us</h1>
      <form onSubmit={handleSubmit} className="my-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 m-2 w-1/2"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 m-2 w-1/2"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 m-2 w-1/2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
