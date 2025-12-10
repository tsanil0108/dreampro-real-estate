import React from 'react';

// Icon component as workaround
const Icon = ({ children, className, style }) => (
  <span className={className} style={style}>{children}</span>
);

const StatsCard = ({ title, value, change, icon, color }) => {
  // Determine if change is positive, negative, or zero
  const isPositive = change > 0;
  const isNegative = change < 0;
  const hasChange = change !== 0;

  // Format value if it's a currency string
  const formattedValue = typeof value === 'string' && value.startsWith('$') 
    ? value 
    : value.toLocaleString();

  return (
    <div style={styles.statsCard}>
      <div style={styles.cardContent}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>{title}</div>
          <div style={{ ...styles.cardIcon, color }}>
            {icon}
          </div>
        </div>
        
        <div style={styles.cardValue}>{formattedValue}</div>
        
        {hasChange && (
          <div style={styles.cardFooter}>
            <div style={styles.changeIndicator}>
              <Icon style={styles.changeIcon}>
                {isPositive ? '📈' : isNegative ? '📉' : '➡️'}
              </Icon>
              <span style={{
                ...styles.changeText,
                color: isPositive ? '#1cc88a' : isNegative ? '#e74a3b' : '#858796'
              }}>
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
            <div style={styles.changeLabel}>
              {isPositive ? 'Increase' : isNegative ? 'Decrease' : 'No change'} from last period
            </div>
          </div>
        )}
      </div>
      
      {/* Progress bar for visual representation */}
      <div style={styles.progressContainer}>
        <div 
          style={{
            ...styles.progressBar,
            width: `${Math.min(Math.abs(change) * 2, 100)}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

// Default props
StatsCard.defaultProps = {
  title: 'Statistic',
  value: 0,
  change: 0,
  icon: <Icon>📊</Icon>,
  color: '#4e73df'
};

// Styles
const styles = {
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 0.5rem 2rem 0 rgba(58, 59, 69, 0.25)'
    }
  },
  cardContent: {
    position: 'relative',
    zIndex: 1
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px'
  },
  cardTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#5a5c69',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  cardIcon: {
    fontSize: '1.5rem',
    opacity: 0.8
  },
  cardValue: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '15px'
  },
  cardFooter: {
    marginTop: '10px'
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '5px'
  },
  changeIcon: {
    fontSize: '0.9rem'
  },
  changeText: {
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  changeLabel: {
    fontSize: '0.75rem',
    color: '#858796'
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: '#f8f9fc'
  },
  progressBar: {
    height: '100%',
    borderRadius: '0 0 8px 8px',
    transition: 'width 0.3s ease'
  }
};

export default StatsCard;