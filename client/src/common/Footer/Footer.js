import React from 'react';
import './Footer.scss';
export const Footer = () => {
  return (
    <footer className="footer">
      Copyright &copy; {new Date().getFullYear()} Flyhigh
    </footer>
  );
};
