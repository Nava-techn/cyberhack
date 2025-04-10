export default class AttackCard {
    constructor(id, name, description, imageUrl, versoUrl, propositions = [], correctName) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = imageUrl;
      this.verso = versoUrl;
      this.propositions = propositions;
      this.correctName = correctName || name;
      this.secteur_cible = null; // sera défini plus tard
    }
  
    static fromApiData(data) {
      return new AttackCard(
        data.id,
        data.nom,
        data.description,
        data.imageUrl,
        data.versoUrl,
        data.propositions,
        data.correctName
      );
    }
  }