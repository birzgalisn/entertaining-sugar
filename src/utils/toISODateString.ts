const toISODateString = (date: string): string => {
  return new Date(date).toISOString().slice(0, -5) + "Z";
};

export default toISODateString;
