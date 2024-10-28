/**
 * How to implement Prototype?
 * 
 * 1. Declare a base class / interface that contains
 * cone methods
 * 2. Create concrete products who inherits / implements from
 * prototype class
 */

class Car {
  constructor({ edition, model, airBags, color }) {
    this._edition = edition || "default";
    this._model = model || "";
    this._airBags = airBags || 2;
    this._color = color || "default";
  }

  set airBags(airbagsNumber) {
    this._airBags = airbagsNumber;
  }

  set color(color) {
    this._color = color;
  }

  set model(model) {
    this._model = model;
  }

  set edition(edition) {
    this._edition = edition;
  }

	get airBags() {
    return 	this._airBags;
  }

  get color() {
    return 	this._color;
  }

  get model() {
    return 	this._model;
  }

  get edition() {
    return 	this._edition;
  }

  /**STEP 1 */
  clone() {
    throw new Error("Method not implemented");
  }
}

class MastodonCar extends Car {
    constructor(carToClone) {
    	super({
				edition: carToClone?.edition,
        model: carToClone?.model,
        airBags: carToClone?.airBags,
        color: carToClone?.color,
        });
    }

		clone() {
			return new MastodonCar(this);
		}
}
class CarProductionLine {
  setAirbag(airbagsNumber) {
    throw new Error("Method not implemented");
  }

  setColor(color) {
    throw new Error("Method not implemented");
  }

  setEdition(edition) {
    throw new Error("Method not implemented");
  }

  resetProductionLine() {
    throw new Error("Method not implemented");
  }
}

/** STEP 2 */

class SedanProductionLine extends CarProductionLine {
  constructor({ model }) {
    super();
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(airBagsNumber) {
    this.sedanCar.airBags = airBagsNumber;
    return this;
  }

  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  setInternalModel(model) {
    this.internalModel = model;
  }

	setModel() {
		this.sedanCar.model = "sedan";
	}

  resetProductionLine() {
    this.sedanCar =
      this.internalModel === "mastodon" 
        ? new MastodonCar() 
        : new RhinoCar();
  }

  build() {
		this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

class Director {
	setProductionLine(productionLine) {
		this.productionLine = productionLine;
	}

	constructCvtEdition() {
		this.productionLine
			.setAirBags(4)
			.setColor("blue")
			.setEdition("CVT");
	}

	constructSignatureEdition() {
		this.productionLine
		.setAirBags(8)
		.setColor("red")
		.setEdition("Signature");
	}
}

function appBuilder(director) {
	const mastodonSedanProductionLine = new SedanProductionLine({
		model: "mastodon"
	});

	director.setProductionLine(mastodonSedanProductionLine);

	// director.constructCvtEdition();
	// const mastodonSedanCvt = mastodonSedanProductionLine.build();
	// console.log(mastodonSedanCvt);
	// const mastodonSedanCvtClone = mastodonSedanCvt.clone();
	// console.log("clone: ", mastodonSedanCvtClone);
	// mastodonSedanCvtClone.airBags =  1000;
	// console.table(mastodonSedanCvtClone);
	// console.table(mastodonSedanCvt);

	director.constructSignatureEdition();
	const mastodonSedanSignature = mastodonSedanProductionLine.build();
	console.log(mastodonSedanSignature);
	const mastodonSedanSignatureClone = mastodonSedanSignature.clone();
	console.log("clon: ", mastodonSedanSignatureClone);
}

appBuilder(new Director());