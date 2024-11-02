const validateRequest = (request: String): boolean => {
  try {
    return request ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { validateRequest };
