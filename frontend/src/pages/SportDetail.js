import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaCalendarAlt, FaUsers, FaClock, FaArrowRight } from 'react-icons/fa';
import { apiService } from '../services/api';

const SportDetail = () => {
  const { sportId } = useParams();
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSport = async () => {
      try {
        const response = await apiService.getSports();
        const foundSport = response.data.find(s => s.id === sportId);
        setSport(foundSport);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sport:', error);
        setLoading(false);
      }
    };

    fetchSport();
  }, [sportId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sport Not Found</h1>
          <Link to="/sports" className="btn-primary">
            Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="mb-8">
            <Link to="/sports" className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <FaArrowLeft />
              <span>Back to Sports</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                {sport.name}
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                {sport.description}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-400" />
                  <span>{sport.coaching_available ? 'Professional Coaching' : 'Self Practice'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-blue-400" />
                  <span>All Skill Levels</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={sport.image_url}
                alt={sport.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Available Facilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sport.facilities.map((facility, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FaCheckCircle className="text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {facility}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Professional grade equipment and facilities maintained to the highest standards.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {/* Booking Card */}
              <div className="card p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Book Your Session
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-primary-600" />
                    <span className="text-gray-600">Flexible Scheduling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-primary-600" />
                    <span className="text-gray-600">6 AM - 10 PM</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaUsers className="text-primary-600" />
                    <span className="text-gray-600">Group & Individual</span>
                  </div>
                </div>
                <Link to="/contact" className="btn-primary w-full mt-6">
                  Book Now
                </Link>
              </div>

              {/* Coaching Card */}
              {sport.coaching_available && (
                <div className="card p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Professional Coaching
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our certified coaches provide structured training programs for all skill levels.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Personalized training plans</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Progress tracking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Skill development</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>Competition preparation</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="btn-secondary w-full mt-6">
                    Enquire About Coaching
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Play {sport.name}?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our {sport.name.toLowerCase()} community and experience the thrill of the game with professional facilities and coaching.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Get Started</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SportDetail;