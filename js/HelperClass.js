class HelperClass {
  static validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  static populateGroups = (groups, state) => {
    console.log(`Populating group of ${state}`);

    const groupSelectDropdown = document.querySelector("#group-select");
    groupSelectDropdown.innerHTML = ``;

    groups[state].forEach(({ name, url }) => {
      let options = `<option value="${url}"
      >${name}</option`;

      groupSelectDropdown.innerHTML += options;
    });
  };
}
