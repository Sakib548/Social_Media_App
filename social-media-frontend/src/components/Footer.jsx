// src/components/Footer.js

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-auto">
      <div className="container mx-auto text-center text-white">
        © {new Date().getFullYear()} DevSocial. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
