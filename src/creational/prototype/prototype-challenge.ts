/**
 * How to implement Prototype?
 * 
 * 1. Declare a base class / interface that contains
 * cone methods
 * 2. Create concrete products who inherits / implements from
 * prototype class
 */

type AvailableColors = "red" | "black" | "blue" | "default";
type EditionsType = "CVT" | "Signature" | "default";
type CarConstructorParams = {
  edition: EditionsType,
  model: string,
  airBags: number, 
  color: AvailableColors
}
abstract class Car {
  private _edition: EditionsType;
  private _model: string;
  private _airBags: number;
  private _color: AvailableColors;

  constructor({ 
    edition, 
    model, 
    airBags, 
    color 
  }: CarConstructorParams) {
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
    return this._airBags;
  }

  get color() {
    return this._color;
  }

  get model() {
    return this._model;
  }

  get edition() {
    return this._edition;
  }

  /**STEP 1 */
  abstract clone(): Car;
}

/** STEP 2 */
class MastodonCar extends Car {
  constructor(carToClone?: MastodonCar);
  constructor(carToClone: Car) {
    super({
      edition: carToClone?.edition,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  clone(): MastodonCar {
    return new MastodonCar(this);
  }
}

class RhinoCar extends Car {
  constructor(carToClone?: RhinoCar);
  constructor(carToClone: Car) {
    super({
      edition: carToClone?.edition,
      model: carToClone?.model,
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  clone(): RhinoCar {
    return new RhinoCar(this);
  }
}
interface CarProductionLine {
  setAirBags(airbagsNumber: number): CarProductionLine;

  setColor(color: AvailableColors): CarProductionLine;

  setEdition(edition: EditionsType): CarProductionLine;

  resetProductionLine(): void
}


type CarCatalog = "mastodon" | "rhino";
type ConstructorParams = { model: CarCatalog };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: Car;
  private internalModel!: CarCatalog;

  constructor({ model }: ConstructorParams) {  
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirBags(airBagsNumber: number): SedanProductionLine{
    this.sedanCar.airBags = airBagsNumber;
    return this;
  }

  setColor(color: AvailableColors): SedanProductionLine{
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition: EditionsType): SedanProductionLine {
    this.sedanCar.edition = edition;
    return this;
  }

  setInternalModel(model: CarCatalog): void {
    this.internalModel = model;
  }

	setModel(): void {
		this.sedanCar.model = "sedan";
	}

  resetProductionLine(): void {
    this.sedanCar =
      this.internalModel === "mastodon" 
        ? new MastodonCar() 
        : new RhinoCar();
  }

  build(): Car {
		this.setModel();
    const sedanCar = this.sedanCar;
    this.resetProductionLine();
    return sedanCar;
  }
}

class Director {
  private productionLine: CarProductionLine | undefined;

	setProductionLine(productionLine: CarProductionLine) {
		this.productionLine = productionLine;
	}

	constructCvtEdition() {
    if(this.productionLine) {
      this.productionLine
      .setAirBags(4)
      .setColor("blue")
      .setEdition("CVT");
    } else {
      throw new Error("Production line hasn't been set")
    }
    
  }
  
	constructSignatureEdition() {
    if(this.productionLine) {
      this.productionLine
      .setAirBags(8)
      .setColor("red")
      .setEdition("Signature");
    } else {
      throw new Error("Production line hasn't been set")
    }
	}
}
function appBuilder(director: Director) {
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

export {};