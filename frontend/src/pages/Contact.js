import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { apiService } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await apiService.submitContactForm(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Get in touch with us for bookings, inquiries, or to learn more about our facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <FaCheckCircle className="text-green-600" />
                  <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <span className="text-red-800">Sorry, there was an error sending your message. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Facility Booking">Facility Booking</option>
                      <option value="Coaching Programs">Coaching Programs</option>
                      <option value="Membership">Membership</option>
                      <option value="Event Hosting">Event Hosting</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your inquiry, preferred dates, or any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Locations
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Relish Bangalore (Main Branch)</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <FaMapMarkerAlt className="text-primary-600 mt-1" />
                        <span className="text-gray-600">
                          28-1-7/4, J.P.Nagar 4th block, Besides Prestige Towers, Bangalore, Karnataka, India
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaPhone className="text-primary-600" />
                        <span className="text-gray-600">+41 97454 45321</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Relish Vizag</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <FaMapMarkerAlt className="text-primary-600 mt-1" />
                        <span className="text-gray-600">
                          39-39-7/1, Muralinagar, Near Masjid-e-Nabwi, Visakhapatnam, India
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaPhone className="text-primary-600" />
                        <span className="text-gray-600">+1 3(467)5 4986</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Additional Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-primary-600" />
                    <span className="text-gray-600">info@relishsports.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-primary-600" />
                    <span className="text-gray-600">+23 4(367)9 4986</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Operating Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span className="text-gray-900 font-semibold">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span className="text-gray-900 font-semibold">6:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span className="text-gray-900 font-semibold">7:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our facilities and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I book a facility?
                </h3>
                <p className="text-gray-600">
                  You can book facilities by calling us directly or filling out the contact form. We'll get back to you within 2 hours.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you provide coaching for beginners?
                </h3>
                <p className="text-gray-600">
                  Yes! Our certified coaches provide training for all skill levels, from complete beginners to advanced athletes.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What equipment do I need to bring?
                </h3>
                <p className="text-gray-600">
                  We provide all necessary equipment. You only need to bring comfortable sports attire and a water bottle.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are there membership packages available?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer various membership packages with discounted rates. Contact us for detailed pricing information.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I host events at your facilities?
                </h3>
                <p className="text-gray-600">
                  Absolutely! We rent our spaces for tournaments, corporate events, and private parties. Contact us for availability.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer group discounts?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer special rates for groups of 5 or more. Perfect for corporate teams or friend groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;