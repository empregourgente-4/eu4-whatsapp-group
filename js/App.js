document.addEventListener("DOMContentLoaded", () => {
  //Language configuration

  const languageStrings = {
    ptbr: {
      facebook: {
        meta: {
          title: "Grupos de WhatsApp - Vagas",
          description:
            "Acesse vagas exclusivas em todo estado, postadas diariamente",
        },
      },
      title: "Grupos de Whatsapp",
      headline: "Acesse grupos de emprego exclusivos",
      input: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "E-mail",
        emailPlaceholder: "Seu e-mail",
        position: "Vaga de interesse",
        positionPlaceholder: "Ex. Vendedor, Atendente",
        state: "Estado",
        group: "Grupo",
        purpose: "Objetivo",
        purposeJobSeeker: "Conseguir um emprego",
        purposeRecruiter: "Recrutar candidatos",
      },
      ctaButton: "Acessar",
      validation: {
        errorEmptyField:
          "Por favor, preencha todos os campos antes de prosseguir!",
        errorInvalidEmail: "Por favor, insira um email válido!",
      },
    },
    eng: {
      facebook: {
        meta: {
          title: "Whatsapp Group - Jobs",
          description: "Access exclusive job positions, posted daily",
        },
      },
      title: "Whatsapp Groups",
      headline: "Access our Job Groups",
      input: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "E-mail",
        emailPlaceholder: "Your e-mail",
        state: "State",
        position: "Position",
        positionPlaceholder: "Eg. Receptionist",
        group: "Group",
        purpose: "Purpose",
        purposeJobSeeker: "Get a Job",
        purposeRecruiter: "Recruit Candidates",
      },
      ctaButton: "Next",
      validation: {
        errorEmptyField:
          "Please, fill all of the fields below before proceeding!",
        errorInvalidEmail: "Please, insert a valid email!",
      },
    },
  };

  // Firebase initialization ========================================

  // Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAAl2MkjcXgFo-2ERPfywDccN61pEd57To",
    authDomain: "app-bo.firebaseapp.com",
    databaseURL: "https://app-bo.firebaseio.com",
    projectId: "app-bo",
    storageBucket: "app-bo.appspot.com",
    messagingSenderId: "948796332411",
    appId: "1:948796332411:web:4136f6ad50c6a1730245de",
    measurementId: "G-W0TFNRTQRZ",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const database = firebase.database();

  // Main logic ========================================

  console.log("content loaded");

  const urlParams = new URLSearchParams(window.location.search);

  let state = urlParams.get("state");
  let language = urlParams.get("language");

  console.log(state, language);

  let groups = {
    es: [
      // {
      //   name: "Emprego Urgente ES - #1",
      //   url: "https://chat.whatsapp.com/K3mKt9yREN8JUBfQUN6Y2r",
      // },
      // {
      //   name: "Emprego Urgente ES - #2",
      //   url: "https://chat.whatsapp.com/HJV3zqgoU0W1ZpEa6Rtdym",
      // },
      // {
      //   name: "Emprego Urgente ES - #3",
      //   url: "https://chat.whatsapp.com/E4dtl6wK6xw4uBfuJw7MNW"
      // },
      {
        name: "Emprego Urgente ES - #4",
        url: "https://chat.whatsapp.com/GIYWbj4hxr8JtkoI4XXSrE",
      },
      {
        name: "Emprego Urgente ES - #5",
        url: "https://chat.whatsapp.com/KlQy0bGSrcQJthT3AopDCM",
      },
    ],
    sp: [
      // {
      //   name: "Emprego Urgente SP - #1",
      //   url: "https://chat.whatsapp.com/DITRy3cquo38EBkdacf8DS",
      // },
      {
        name: "Emprego Urgente SP - #2",
        url: "https://chat.whatsapp.com/IpyZFwgaiDBAnGDTMLmV4i",
      },
      {
        name: "Emprego Urgente SP - #3",
        url: "https://chat.whatsapp.com/I5wVYy32fKDDKSZldDRa3U",
      },
      {
        name: "Emprego Urgente SP - #4",
        url: "https://chat.whatsapp.com/GnN84IIcvd15rJs09ukqP7",
      },
    ],
    rj: [
      {
        name: "EmpregoUrgente.com RJ #1",
        url: "https://chat.whatsapp.com/BWONdvqquihKnUqGVhMLb1",
      },
      {
        name: "EmpregoUrgente.com RJ #2",
        url: "https://chat.whatsapp.com/EdF7jAo0zTsHWubeiZ4CLv",
      },
      {
        name: "EmpregoUrgente.com RJ #3",
        url: "https://chat.whatsapp.com/BPMsLkCLY257otEW7NFE9u",
      },
    ],
    bh: [
      // {
      //   name: "Emprego Urgente BH - #1",
      //   url: "https://chat.whatsapp.com/GAyfZlKAfmk006WxsLw5Ds"
      // },
      {
        name: "Emprego Urgente BH - #2",
        url: "https://chat.whatsapp.com/CKcZNtHDQHSJSUgLUUt5cz",
      },
      {
        name: "Emprego Urgente BH - #3",
        url: "https://chat.whatsapp.com/GHipWCH8e45Dk2pDxhREsC",
      },
    ],
    vancouver: [
      // {
      //   name: "Jobs Vancouver #1",
      //   url: "https://chat.whatsapp.com/5zUjHMNZJylCqpyLL3GnX0"
      // },
      {
        name: "Jobs Vancouver #2",
        url: "https://chat.whatsapp.com/K2TKkbtxO8C7BmNDW7kTn4",
      },
      {
        name: "Jobs Vancouver #3",
        url: "https://chat.whatsapp.com/Hf3Z3LGBd4QFfBl86vLo7D",
      },
    ],
  };

  // shuffle all array groups, so we can better balance its filling
  for (const key of Object.keys(groups)) {
    groups[key] = HelperClass.shuffleArray(groups[key]);
  }

  if (!state) {
    state = "es";
    language = "ptbr";

    // add state dropdown

    document.querySelector("#state-dropdown-container").innerHTML = `
    <label for="state-select">${languageStrings[language].input.state}</label>
    <select id="state-select">
      <option value="es">ES</option>
      <option value="sp">SP</option>
      <option value="bh">MG</option>
      <option value="rj">RJ</option>
    </select>`;

    document.querySelector("#state-select").addEventListener("change", () => {
      state = document.querySelector("#state-select option:checked").value;
      HelperClass.populateGroups(groups, state);
    });
  }

  const strings = languageStrings[language];

  // set facebook meta

  document
    .querySelector("meta[property*='title']")
    .setAttribute("content", strings.facebook.meta.title);
  document
    .querySelector("meta[property*='description']")
    .setAttribute("content", strings.facebook.meta.description);

  // set translation strings

  // title
  document.querySelector(".header-title").innerText = strings.title;

  // headline
  // document.querySelector("#headline").innerText = strings.headline;

  // name
  document.querySelector("label[for='name']").innerText = strings.input.name;
  document.querySelector("#name").placeholder = strings.input.namePlaceholder;

  // email
  document.querySelector("label[for=email]").innerText = strings.input.email;
  document.querySelector("#email").placeholder = strings.input.emailPlaceholder;

  // position
  document.querySelector("label[for=position]").innerText =
    strings.input.position;
  document.querySelector("#position").placeholder =
    strings.input.positionPlaceholder;

  // group
  document.querySelector("label[for=group-select]").innerText =
    strings.input.group;

  // purpose
  document.querySelector("label[for=purpose]").innerText =
    strings.input.purpose;
  document.querySelector(".purpose-text-job-seeker").innerText =
    strings.input.purposeJobSeeker;
  document.querySelector(".purpose-text-recruiter").innerText =
    strings.input.purposeRecruiter;

  // cta button
  document.querySelector("#form-submit").value = strings.ctaButton;

  // create and inject options decorator

  HelperClass.populateGroups(groups, state);

  const leadForm = document.querySelector("#form-signup");

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submitting form data");

    const formData = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      position: document.querySelector("#position").value,
      group: document.querySelector("#group-select option:checked").value,
      purpose: document.querySelector("input[name=purpose]:checked").value,
    };

    //basic validation

    if (
      !formData.name ||
      !formData.email ||
      !formData.position ||
      !formData.group ||
      !formData.purpose
    ) {
      alert(strings.validation.errorEmptyField);
      return;
    }

    if (!HelperClass.validateEmail(formData.email)) {
      alert(strings.validation.errorInvalidEmail);
      return;
    }

    //submit to firebase

    database.ref(`/leads/${language}/${state}`).push(formData);

    console.log(formData);

    // redirect user to group link

    window.location.href = formData.group;
  });
});
