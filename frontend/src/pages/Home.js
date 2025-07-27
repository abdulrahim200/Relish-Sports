import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { apiService } from '../services/api';

const Home = () => {
  const [sports, setSports] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sportsResponse, facilitiesResponse] = await Promise.all([
          apiService.getSports(),
          apiService.getFacilities()
        ]);
        setSports(sportsResponse.data.slice(0, 3)); // Show first 3 sports
        setFacilities(facilitiesResponse.data);
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                So, Which Sport do you want to play today?
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Do you have the passion? Do YOU have it in you?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
                Unleash the athlete in you.
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/sports" className="btn-secondary inline-flex items-center space-x-2">
                  <span>Explore Sports</span>
                  <FaArrowRight />
                </Link>
                <Link to="/facilities" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2">
                  <span>Our Facilities</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cristiano Ronaldo Free Kick"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-sm font-medium bg-black/50 rounded px-2 py-1">
                    Master Your Skills Like The Legends
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready Section */}
      <section className="bg-yellow-400 text-gray-900">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-700">
                Are you ready?
              </h2>
              <p className="text-2xl font-semibold">Come to RELISH.</p>
              <p className="text-2xl font-semibold">
                <span className="text-blue-600">RE</span>imagine how you play.
              </p>
              <p className="text-lg">
                With world class amenities, experience the thrill of Sport.
              </p>
              <Link to="/facilities" className="btn-primary inline-flex items-center space-x-2">
                <span>Explore our Facilities</span>
                <FaArrowRight />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1749&q=80"
                alt="Team Sports"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="bg-green-100">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sports We Offer
            </h2>
            <p className="text-lg text-gray-600">
              To all the Sports Freaks, We've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((sport) => (
              <div key={sport.id} className="card group">
                <div className="relative overflow-hidden">
                  <img
                    src={sport.image_url}
                    alt={sport.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold">{sport.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {sport.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500" />
                      <span className="text-sm text-gray-600">
                        {sport.coaching_available ? 'Coaching Available' : 'Self Practice'}
                      </span>
                    </div>
                    <span className="text-sm text-primary-600 font-medium">
                      {sport.facilities.length} Facilities
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/sports" className="btn-secondary inline-flex items-center space-x-2">
              <span>Explore All Sports</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Sharing Section */}
      <section className="bg-green-200">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sharing is caring.
            </h2>
            <p className="text-lg text-gray-600">
              Bring your friends along with you. It's MORE FUN.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1005&q=80"
                alt="Friends Playing Cricket"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Cricket with Friends</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Friends Playing Football"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Football with Friends</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Section */}
      <section className="bg-orange-500 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We also Rent spaces for the Weekend.
            </h2>
            <p className="text-xl mb-8">
              For ₹700/hr, You can rent our space so you can play anyway you want.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center space-x-2">
              <span>Book Now</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;