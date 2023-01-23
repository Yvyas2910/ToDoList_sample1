exports.getFullDate = function () {
    const today = new Date();
    const options = {
        day: "numeric",
        weekday: "long",
        month: "short",
    year: "numeric",
  }
  return  today.toLocaleDateString("en-US", options);
};

exports.getDay = function () {
    const today = new Date();
    const options = {
        weekday: "long"
  }
  return today.toLocaleDateString("en-US", options);
};

exports.getDate = function () {
    const today = new Date();
    const options = {
        day: "numeric"
  }
  return  today.toLocaleDateString("en-US", options);
};

exports.getMonth = function () {
    const today = new Date();
    const options = {
        month: "long"
  }
  return  today.toLocaleDateString("en-US", options);
};

exports.getYear = function () {
    const today = new Date();
    const options = {
        year: "numeric"
  }
  return  today.toLocaleDateString("en-US", options);
};

