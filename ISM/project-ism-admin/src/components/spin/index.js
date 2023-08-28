import './index.scss';

const Spin = ({ children, spinning }) => {
  return spinning ? (
    <div className="fallback-spinner">
      <div className="bg-spin" />
      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
      {children}
    </div>
  ) : (
    children
  );
};

export default Spin;
