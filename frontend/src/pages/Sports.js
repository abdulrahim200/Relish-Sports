import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { apiService } from '../services/api';

const Sports = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await apiService.getSports();
        setSports(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Sports We Offer
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover your passion with our wide range of sports facilities and professional coaching programs.
            </p>
          </div>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((sport) => (
              <div key={sport.id} className="card group">
                <div className="relative overflow-hidden">
                  <img
                    src={sport.image_url}
                    alt={sport.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/sports/${sport.id}`}
                      className="btn-primary"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {sport.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {sport.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-sm text-gray-600">
                        {sport.coaching_available ? 'Professional Coaching Available' : 'Self Practice'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-sm text-gray-600">
                        {sport.facilities.length} Facilities Available
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {sport.facilities.slice(0, 3).map((facility, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {facility}
                      </span>
                    ))}
                    {sport.facilities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{sport.facilities.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/sports/${sport.id}`}
                    className="btn-primary w-full justify-center inline-flex items-center space-x-2"
                  >
                    <span>View Details</span>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Sports Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of sports enthusiasts who have chosen Relish Sports for their fitness and recreation needs.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Get Started Today</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sports;