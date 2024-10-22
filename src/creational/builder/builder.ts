/**
 * How to implement Builder
 *
 * 1. Declare Builder base class/interface who will define
 * the general steps for build products, each build must
 * implement these steps.
 *
 * CarProductionLine
 *  setAirbag
 *  setColor
 *  setEdition
 *  resetProductionLine
 *
 * 2. Implement concrete builders subclasses that offer different
 * versions of the build steps. These builders could create
 * concrete products, not abstract ones
 *
 * SedanProductionLine: build() -> Car
 * HatchbackProductionLine: build() -> Car
 *
 * 3. Implement Product classes, these ones could not belong
 * to the same interface or base class.
 *
 * 	class Car
 * 	class MastodonCar
 * 	class RhinoCar
 * 
 * 4. Implement the director class, this one will know the build
 * process for each product, so we can  create specific 
 * configurations for the products
 * 
 * 	Build Processes
 * 		constructCvtEdition
 * 		constructSignatureEdition
 */

/** STEP 1 */

interface CarProductionLine {
  setAirbag(airbagsNumber: number): CarProductionLine;
  setColor(color: string): CarProductionLine;
  setEdition(edition: string): CarProductionLine;
  resetProductionLine(): void;
}

/** STEP 2 */
type CarCatalog = "mastodon" | "rhino";
type ConstructorParams = { model: CarCatalog };
class SedanProductionLine implements CarProductionLine {
  private sedanCar!: Car;
  private internalModel!: CarCatalog;

  constructor({ model }: ConstructorParams) {  
    this.setInternalModel(model);
    this.resetProductionLine();
  }

  setAirbag(airBagsNumber: number): SedanProductionLine{
    this.sedanCar.airBags = airBagsNumber;
    return this;
  }

  setColor(color: AvailableColors): SedanProductionLine{
    this.sedanCar.color = color;
    return this;
  }

  setEdition(edition: string): SedanProductionLine {
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

/** STEP 3 */
type AvailableColors = "red" | "black" |"gray" | "blue";

class Car {
  private _edition: string ="";
  private _model: string = "";
  private _airBags: number = 2;
  private _color: AvailableColors = "black";

	set airBags(airbagsNumber: number) {
		this._airBags = airbagsNumber;
	}

	set color(color: AvailableColors) {
		this._color = color;
	}

	set model(model: string) {
		this._model = model;
	}

	set edition(edition: string) { 
		this._edition = edition;
	}
}

class MastodonCar extends Car {
	constructor() {
		super();
	}
}

class RhinoCar extends Car {
	constructor() {
		super();
	}
}

/** STEP 4 */

class Director {
  private productionLine: CarProductionLine | undefined;

	setProductionLine(productionLine: CarProductionLine) {
		this.productionLine = productionLine;
	}

	constructCvtEdition() {
    if(this.productionLine) {
      this.productionLine
      .setAirbag(4)
      .setColor("blue")
      .setEdition("CVT");
    } else {
      throw new Error("Production line hasn't been set")
    }
    
  }
  
	constructSignatureEdition() {
    if(this.productionLine) {
      this.productionLine
      .setAirbag(8)
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

	director.constructCvtEdition();
	const mastodonSedanCvt = mastodonSedanProductionLine.build();
	console.log(mastodonSedanCvt);

	director.constructSignatureEdition();
	const mastodonSedanSignature = mastodonSedanProductionLine.build();
	console.log(mastodonSedanSignature);
}

appBuilder(new Director());

export {};