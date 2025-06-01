import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Container for the footer content */}
      <div className="flex flex-col lg:flex-row bg-[#007FFF] justify-center lg:justify-between items-center py-6 lg:py-10 px-6 lg:px-16 xl:px-40">
        
        {/* Logo and QR download section */}
        <div className="logo flex flex-col items-center mb-4 lg:mb-0">
          <img src="/images/Logo.png" alt="ToyDazzle Logo" width="150" />

          {/* QR code and download section */}
          <div className="flex flex-col items-center mt-4">
            <p className="text-white text-lg font-medium mb-2">Scan to Download</p>
            <img
              src="/images/qrcode/qr.png"
              alt="QR Code"
              width="200"
              height="200"
              className="mb-4"
            />
            <a
              href="https://expo.dev/accounts/jepjep/projects/ToyDazzle/builds/06c791c7-66f7-4e1b-96e9-52d084b6e705"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#FA6A02] text-2xl font-semibold h-[55px] px-8 rounded-full fredoka text-white">
                Download App
              </button>
            </a>
          </div>
        </div>

        {/* About Us section */}
        <div className="about-us mb-4 lg:mb-0 flex flex-col items-center">
          <h1 className="text-3xl text-white fredoka font-semibold mb-2 lg:mb-4">
            About Us
          </h1>
          <ul className="text-lg text-white outfit flex flex-col gap-2 text-center">
            <li>About</li>
            <li>Policies</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Help section */}
        <div className="Help mb-4 lg:mb-0 flex flex-col items-center">
          <h1 className="text-3xl text-white fredoka font-semibold mb-2 lg:mb-4">
            Help
          </h1>
          <ul className="text-lg text-white outfit flex flex-col gap-2 text-center">
            <li>Help Center</li>
            <li>Privacy Settings</li>
          </ul>
        </div>

        {/* Contact Us section */}
        <div className="contact-us mb-4 lg:mb-0 flex flex-col items-center">
          <h1 className="text-3xl text-white fredoka font-semibold mb-2 lg:mb-4">
            Contact Us
          </h1>
          <div className="flex gap-4">
            <div className="flex items-center pl-20">
              <img src="/images/socials/fb.webp" alt="Facebook" width="30" loading="lazy" />
            </div>
            <div className="flex items-center ">
              <img src="/images/socials/ig.webp" alt="Instagram" width="30" loading="lazy" />
            </div>
            <div className="flex items-center ">
              <img src="/images/socials/twitter.webp" alt="Twitter" width="30" loading="lazy" />
            </div>
            <div className="flex items-center pr-7">
              <img src="/images/socials/pinterest.webp" alt="Pinterest" width="30" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      {/* Footer bottom section */}
      <div className="bg-[#FFD72D]">
        <h1 className="text-center text-[#007FFF] outfit text-xl py-4 font-bold">
          © Toydazzle 2024
        </h1>
      </div>
    </div>
  );
};

export default Footer;
