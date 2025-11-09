import React from 'react';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <SEO 
        title="About Us - WebHaze"
        description="Learn about WebHaze's mission to create exceptional digital experiences for businesses worldwide."
      />
      
      <div className="container-site py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            About
            <br />
            <span className="text-white/60">WebHaze</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We create digital experiences that transform businesses and connect people worldwide.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              WebHaze is dedicated to empowering businesses with cutting-edge web solutions. We believe that every business deserves a professional online presence that drives growth and success.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our platform combines innovative technology with user-friendly design to deliver websites that not only look great but perform exceptionally well.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To be the leading Website-as-a-Service platform that enables businesses worldwide to create exceptional digital experiences.
              </p>
            </div>
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <p className="text-gray-300">
                Innovation, reliability, and customer success drive everything we do. We're committed to delivering excellence in every project.
              </p>
            </div>
          </div>

          <div className="glass-morphism rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Why Choose WebHaze?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Expert Team</h4>
                <p className="text-gray-300 text-sm">
                  Our experienced developers and designers work together to create outstanding web solutions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">24/7 Support</h4>
                <p className="text-gray-300 text-sm">
                  We're always here to help you succeed with round-the-clock technical support.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cutting-edge Technology</h4>
                <p className="text-gray-300 text-sm">
                  We use the latest technologies to ensure your website is fast, secure, and scalable.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Proven Results</h4>
                <p className="text-gray-300 text-sm">
                  Our clients see real results with improved performance and increased conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;