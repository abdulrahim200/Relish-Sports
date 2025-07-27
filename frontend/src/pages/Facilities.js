import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';
import { apiService } from '../services/api';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facilitiesResponse, branchesResponse] = await Promise.all([
          apiService.getFacilities(),
          apiService.getBranches()
        ]);
        setFacilities(facilitiesResponse.data);
        setBranches(branchesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
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
              Our Facilities
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              World-class sports facilities designed to enhance your athletic performance and enjoyment.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Branches
            </h2>
            <p className="text-lg text-gray-600">
              At the moment, we have two branches serving sports enthusiasts across India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branches.map((branch, index) => (
              <div key={branch.id} className="card">
                <img
                  src={branch.image_url}
                  alt={branch.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {branch.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {branch.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2">
                      <FaMapMarkerAlt className="text-primary-600 mt-1" />
                      <span className="text-gray-600 text-sm">
                        {branch.contact_info.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-primary-600" />
                      <span className="text-gray-600 text-sm">
                        {branch.contact_info.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600">
              Experience excellence with our state-of-the-art facilities and professional services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <div key={facility.id} className="card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div>
                    <img
                      src={`https://images.unsplash.com/photo-${facility.name.includes('Coaching') ? '1571019613454-1cb2f99b2d8b' : '1544551763-46a013bb70d5'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                      alt={facility.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {facility.name}
                    </h3>
                    <p className="text-gray-600">
                      {facility.description}
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">Features:</p>
                      <ul className="space-y-1">
                        {facility.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-primary-600" />
                      <span className="text-sm text-gray-600">{facility.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Relish Sports?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Professional Grade Equipment
              </h3>
              <p className="text-gray-600">
                All our facilities use the best-in-industry equipment and materials for optimal performance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Certified Coaches
              </h3>
              <p className="text-gray-600">
                Our coaches are graduates of Sports Ministry's A++ certification programs with extensive experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clean & Organized
              </h3>
              <p className="text-gray-600">
                We maintain the highest standards of cleanliness and organization across all facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Our Facilities?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Visit any of our branches and discover why thousands of athletes choose Relish Sports for their training.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Visit Us Today</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;