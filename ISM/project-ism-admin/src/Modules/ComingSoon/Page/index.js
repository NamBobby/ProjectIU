import '../bootstrap.scss';

import React, { useEffect } from 'react';
import ComingSoon from '@Modules/ComingSoon/Components/ComingSoon';

export const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="coming__page">
      <ComingSoon />
    </div>
  );
};

export default Contact;
