import React from 'react';

const LightSwitch = ({ isOn, toggle }) => {
  return (
    <div className="wrapper">
      <input 
        type="checkbox" 
        id="light-switch" 
        className="light-switch" 
        checked={isOn}
        onChange={toggle}
      />
      <label htmlFor="light-switch" className="light-switch-label">
        <div className="screw"></div>
        <div className="switch"></div>
        <div className="screw"></div>
      </label>
      <div className="background"></div>

      <style jsx>{`
        .wrapper {
          position: fixed;
          bottom: 10px;
          right: 10px;
          transform: scale(0.33);
          transform-origin: bottom right;
          z-index: 1000;
        }

        *, *:before, *:after {
          transition: .2s ease-in-out;
        }

        .light-switch {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          cursor: pointer;
        }

        .light-switch:checked ~ .background {
          background-color: #ebdbac;
        }

        .light-switch:checked ~ .light-switch-label {
          box-shadow: 0 2px 2px #d0b57b;
        }

        .light-switch:checked ~ .light-switch-label .switch {
          box-shadow: 0 10px 10px -5px rgba(233,219,176,1), 
                      0 0 0 1px rgba(0,0,0,.1), 
                      0 0 0 4px #fff4d3,
                      0 0 0 5px rgba(0,0,0,.1);
        }

        .light-switch:checked ~ .light-switch-label .switch:before {
          height: 75px;
          top: 0px;
          line-height: 75px;
          background: #fff4d3;
          color: #64bf60;
          text-shadow: 0 0 3px #38ff2e;
        }

        .light-switch:checked ~ .light-switch-label .switch:after {
          height: 70px;
          bottom: 5px;
          line-height: 70px;
          background: #fffaea;
          box-shadow: 0 5px 0 #d0b57b;
          color: #d7bf95;
          text-shadow: 0 0 0px transparent;
        }

        .light-switch-label {
          position: relative;
          display: block;
          height: 300px;
          width: 200px;
          z-index: 1;
          margin: 0 auto; /* Changed from margin: 100px auto 0 auto */
          background-color: #fff4d3;
          border-radius: 10px;
        }

        .switch {
          cursor: pointer;
          height: 150px;
          width: 100px;
          background: #fffaea;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -75px 0 0 -50px;
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0 10px 10px -5px rgba(233,219,176,0), 
                      0 0 0 1px rgba(0,0,0,.1), 
                      0 0 0 4px #fff4d3,
                      0 0 0 5px rgba(0,0,0,.1);
        }

        .switch:before {
          content: 'ON';
          display: block;
          position: absolute;
          height: 70px;
          text-align: center;
          line-height: 70px;
          width: 100px;
          top: 5px;
          left: 0;
          background: #efe0b1;
          color: #bfa371;
          border-radius: 5px 5px 0 0;
        }

        .switch:after {
          content: 'OFF';
          display: block;
          position: absolute;
          height: 75px;
          text-align: center;
          line-height: 75px;
          width: 100px;
          bottom: 0;
          left: 0;
          background: #fff4d3;
          color: #a4441a;
          text-shadow: 0 0 3px #ff4e00;
          border-radius: 0 0 5px 5px;
        }

        .screw {
          position: absolute;
          height: 16px;
          width: 16px;
          border-radius: 100%;
          left: 50%;
          margin-left: -8px;
          background: #e3d4a5;
          overflow: hidden;
          box-shadow: inset 0 2px 0 rgba(0,0,0,.15);
        }

        .screw:before {
          content: '';
          display: block;
          position: absolute;
          height: 100%;
          width: 2px;
          left: 50%;
          margin-left: -1px;
          background: rgba(0,0,0,.2);
        }

        .screw:first-of-type {
          top: 30px;
        }

        .screw:last-of-type {
          bottom: 30px;
        }

        .background {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          background-color: #132436;
        }

        /* Hide LightSwitch on mobile devices */
        @media (max-width: 768px) {
          .wrapper {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LightSwitch;
