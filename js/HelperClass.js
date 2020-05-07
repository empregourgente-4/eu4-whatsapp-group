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

  static shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
}
