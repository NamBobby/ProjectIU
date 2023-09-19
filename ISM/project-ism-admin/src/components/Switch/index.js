import './index.scss';
import './responsive.scss';

import React, { useState, useEffect } from 'react';

/*Hooks*/
import { useDispatch, useSelector } from 'react-redux';

/*Actions*/
import * as actionsCommon from '@store/common/actions';

/*Selector*/
import { getLanguage } from '@store/common/selectors';

const Switch = () => {
  const lang = useSelector((state) => getLanguage(state));

  const [checked, setChecked] = useState('vi');

  useEffect(() => {
    setChecked(lang);
  }, [lang]);

  const dispatch = useDispatch();

  const onCheck = (e) => {
    const lang = e.target.checked ? 'en' : 'vi';
    dispatch(actionsCommon.setLanguage(lang));
  };

  return (
    <div className="toggleWrapper">
      <div className="toggle-switch b2" id="switch-btn">
        <input
          type="checkbox"
          checked={lang === 'vi' ? false : true}
          className="checkbox"
          onChange={onCheck}
        />
        <div className="knobs">
          <span>VIE</span>
        </div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default Switch;
