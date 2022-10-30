import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const DialogWrapper = ({ children, isMobile, theme }) => (isMobile ? createPortal(
  <div className={`${(theme == 'light') ? 'react-google-flight-datepicker' : 'react-google-flight-datepicker-dark'}`}>
    {children}
  </div>,
  document.querySelector('body'),
) : (<>{children}</>));

DialogWrapper.propTypes = {
  children: PropTypes.node,
  isMobile: PropTypes.string,
  theme: PropTypes.string,
};

DialogWrapper.defaultProps = {
  children: null,
  isMobile: false,
  theme: 'light',
};

export default DialogWrapper;
