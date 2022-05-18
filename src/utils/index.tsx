export const currentTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
