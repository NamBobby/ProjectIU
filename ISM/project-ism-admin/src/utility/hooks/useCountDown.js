import React, { useRef, useState } from "react";

export const useCountDown = ({
  initValue = 480000,
  isStart = false,
  isRefresh = false,
}) => {
  const [firstTime, setFirstTime] = useState(true);
  const [countDown, setCountDown] = React.useState(initValue);
  const intervalIdRef = useRef();

  React.useEffect(() => {
    if (isStart)
      intervalIdRef.current = setInterval(() => {
        setCountDown((pre) => {
          if (pre - 1000 >= 0) {
            return pre - 1000;
          }
          clearInterval(intervalIdRef.current);
          return 0;
        });
      }, 1000);
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isStart]);
  React.useEffect(() => {
    if (firstTime && isStart) {
      setFirstTime(false);
      setCountDown(initValue);
    }
  }, [initValue, isStart]);
  React.useEffect(() => {
    if (!firstTime && isRefresh) {
      setCountDown(initValue);
      setFirstTime(false);
    }
  }, [isRefresh]);

  return countDown;
};
