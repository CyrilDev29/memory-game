document.addEventListener("DOMContentLoaded", () => {       // Permet d'attendre que la page html soit complètement chargéé

  const plateau = document.querySelector("#game-board");   // je sélectionne le plateau dans lequel je vais mettre les cartes

  function initialiserJeu() { // la fonction permet de lancer ou relancer le hjeu

    const images = [    // j'ai créé une liste avec 6 images différentes
      "media/1.webp", "media/2.webp", "media/3.webp",
      "media/4.webp", "media/5.webp", "media/6.webp"
    ];
    
    const cartes = [...images, ...images]; // je duplique les 6 images pour en avoir 12 

    for (let i = 0; i < 100; i++) {   // j'échange 2 cartes au hasard 100 fois
      const a = Math.floor(Math.random() * cartes.length);
      const b = Math.floor(Math.random() * cartes.length);
      [cartes[a], cartes[b]] = [cartes[b], cartes[a]];
    }

    let premiereCarte = null;  // première carte cliquée
    let verrouillage = false; // bloquer les clics pour comparaison
    let pairesTrouvées = 0; // pour compter les paires trouvées

    plateau.innerHTML = "";  // pour vider le plateau
 
    cartes.forEach((src) => { // parcours chaque image dans le tableau mélangé 
      const carte = document.createElement("div"); // div pour représenter la carte
      carte.className = "carte";

      const image = document.createElement("img"); // création de la face visible et que je cache au départ
      image.src = src;
      image.style.display = "none";

      const dos = document.createElement("img"); // création du dos de la carte avec le "?""
      dos.src = "media/question.webp";
      dos.className = "dos";

      carte.appendChild(image); // ajoute les deux images à la carte 
      carte.appendChild(dos);
      plateau.appendChild(carte); // ajoute la carte au plateau

      carte.addEventListener("click", () => {
        if (verrouillage || image.style.display === "block") return; // si le jeu est vérouillé ou carté retourné , on ignore le clic

        image.style.display = "block"; // retourne la carte et affiche l'image
        dos.style.display = "none";  // cache le dos de l'image retournée

        if (!premiereCarte) {
          premiereCarte = { image, dos, src }; // enregistre la première carte pour la comparer avec la suivante
        } else {
          verrouillage = true; // bloque les clics pour comparer les deux cartes

          if (src === premiereCarte.src) { // si les deux cartes sont identiques
            setTimeout(() => {
              pairesTrouvées++;  // augmente le nombre de paires trouvée
              if (pairesTrouvées === 6) alert("Bravo tu as gagné !");
              premiereCarte = null;
              verrouillage = false;
            }, 600);
          } else {
            setTimeout(() => {  
              image.style.display = "none";
              dos.style.display = "block";
              premiereCarte.image.style.display = "none";
              premiereCarte.dos.style.display = "block";
              premiereCarte = null;
              verrouillage = false;
            }, 1000);
          }
        }
      });
    });
  }

  
  initialiserJeu(); // lance le jeu quand page chargée


  document.addEventListener("keydown", (e) => {  // redémarrage  avec la barre d'espace
    if (e.key === " ") {
      initialiserJeu();
    }
  });
});