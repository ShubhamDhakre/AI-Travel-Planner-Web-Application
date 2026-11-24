export const formatCurrency = (amount, currency = 'USD') => {
  const num = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currency} ${num.toLocaleString()}`;
  }
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const calculateDaysCount = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.abs(end - start);
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  return isNaN(days) ? 1 : Math.max(1, days);
};
