import './index.scss';
import './responsive.scss';

import React, { useEffect, useState } from 'react';

import { Collapse } from 'reactstrap';

import { SubIcon, PlusIcon } from '@src/assets/svg';

const CollapsePage = ({ title, visible, setVisible, className, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(visible);
  }, [visible]);

  const onOpen = () => {
    setIsOpen(!isOpen);
    if (typeof setIsOpen === 'function') {
      setVisible(!isOpen);
    }
  };

  return (
    <div className={`collapse__page ${className ? className : ''}`}>
      <div className="collapse__header" onClick={onOpen}>
        <div className="collapse__title">{title}</div>
        <div className="collapse__icon">
          {isOpen ? <SubIcon /> : <PlusIcon />}
        </div>
      </div>

      <Collapse isOpen={isOpen}>{children}</Collapse>
    </div>
  );
};

export default CollapsePage;
