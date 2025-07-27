import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { apiService } from '../services/api';

const About = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await apiService.getCoaches();
        setCoaches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coaches:', error);
        setLoading(false);
      }
    };

    fetchCoaches();
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
              About Us
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              A little about us - passionate sports enthusiasts who turned their love for athletics into a thriving community.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                We are just a group of 3 sports freaks who were tied by the shackles of Corporate Capitalism Greed. 
                So we decided in 2018 to start a weekly sports gathering for all the sports freak-IT professionals out there.
              </p>
              <p className="mb-6">
                What started as a simple weekend gathering developed into something we thought we could make a business out of it. 
                And after all these years, we still are those 3 boys who are passionate about sport.
              </p>
              <p>
                Our mission is to provide world-class sports facilities and coaching to help people reconnect with their 
                athletic side, regardless of their skill level or background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founders
            </h2>
            <p className="text-lg text-gray-600">
              The passionate individuals who made Relish Sports a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={coach.id} className="card text-center">
                <div className="p-6">
                  <img
                    src={coach.image_url}
                    alt={coach.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {coach.name}
                  </h3>
                  <p className="text-primary-600 font-semibold mb-3">
                    {coach.designation}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {coach.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {coach.sports.map((sport, sportIndex) => (
                      <span
                        key={sportIndex}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button className="text-gray-400 hover:text-primary-600 transition-colors">
                      <FaLinkedin size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-primary-600 transition-colors">
                      <FaTwitter size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do at Relish Sports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from facilities to coaching to customer service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Building a strong sports community where everyone feels welcome and supported.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Passion
              </h3>
              <p className="text-gray-600">
                Our love for sports drives us to create exceptional experiences for every athlete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Dedicated Staff
            </h2>
            <p className="text-lg text-gray-600">
              Behind every great sports facility is a team of dedicated professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <div className="p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Ground Staff"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Maintenance Team
                    </h3>
                    <p className="text-gray-600">
                      Our cleaning and maintenance staff work 24/7 to keep all facilities in pristine condition. 
                      It is impossible to run Relish without their dedication and hard work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src="https://images.unsplash.com/photo-1594736797933-d0413ba7a7d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Support Staff"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Support Staff
                    </h3>
                    <p className="text-gray-600">
                      Our administrative and support team ensures smooth operations and exceptional customer service 
                      for all our members and visitors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Sports Community
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Become part of the Relish Sports family and discover your athletic potential with our passionate team.
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

export default About;