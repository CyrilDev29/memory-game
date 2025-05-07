document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-inscription");
  const message = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // on empêche le rechargement de la page

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const mdp = document.getElementById("mdp").value;
    const mdp2 = document.getElementById("mdp2").value;

    // 1. Vérifier le nom (3 caractères mini)
    if (nom.length < 3) {
      message.textContent = "Le nom doit contenir au moins 3 caractères.";
      return;
    }

    // 2. Vérifier l'email avec une expression régulière
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      message.textContent = "L'adresse email n'est pas valide.";
      return;
    }

    // 3. Vérifier le mot de passe (6+ caractères, 1 lettre, 1 chiffre, 1 symbole)
    const regexMdp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!regexMdp.test(mdp)) {
      message.textContent = "Le mot de passe doit faire au moins 6 caractères et contenir une lettre, un chiffre et un symbole.";
      return;
    }

    // 4. Vérifier que les deux mots de passe sont identiques
    if (mdp !== mdp2) {
      message.textContent = "Les mots de passe ne correspondent pas.";
      return;
    }

    // Si toutes les vérifications sont bonnes
    message.classList.remove("text-danger");
    message.classList.add("text-success");
    message.textContent = "Inscription réussie ! 🎉";

    form.reset(); // on vide les champs
  });
});