import React from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <FaFutbol className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">RELISH</h3>
                <p className="text-sm text-gray-400">SPORTS</p>
              </div>
            </div>
            <p className="text-gray-400">
              Unleash the athlete in you with world-class sports facilities and professional coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/facilities" className="text-gray-400 hover:text-white transition-colors">Facilities</Link></li>
              <li><Link to="/sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1" />
                <div>
                  <p className="text-gray-400">Bangalore Branch</p>
                  <p className="text-sm text-gray-500">J.P.Nagar 4th block, Bangalore</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary-500" />
                <p className="text-gray-400">+41 97454 45321</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500" />
                <p className="text-gray-400">info@relishsports.com</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Relish Sports. All rights reserved. Built with passion for sports.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;