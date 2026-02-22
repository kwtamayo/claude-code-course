import '../styles/index.css';

const ICONS = {
  warning: '⚠️',
  info: 'ℹ️',
};

const TITLES = {
  warning: 'Important',
  info: 'Note',
};

export default function Callout({ type = 'info', children }) {
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-title">
        {ICONS[type]} {TITLES[type]}
      </div>
      {children}
    </div>
  );
}
