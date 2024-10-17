/**
 * How to implement abstract factory?
 *
 * 1. Declare base product classes/interfaces for each product
 * in the catalog.
 *
 * Product interfaces:
 * - MastodonCar
 * - RhinoCar
 *
 * 2. Implement concrete product classes that inherits/implements
 * base products classes/interfaces, for each of the family types.
 *
 * Concrete Products:
 * - MastodonSedanCar
 * - MastodoHatchbackCar
 * - RhinoSedanCar
 * - RhinoHatchbackCar
 *
 * 3. Declare abstract factory class/interface that declare creation
 * methods for each base product.
 *
 * AbstractFactory:
 *  - CarFactory
 *      * createMastodonCar(): MastodonCar
 *      * createRhinoCar(): RhinoCar
 *
 * 4. Create concrete factories that implements all of the defined
 * creation methods in the abstract factory.
 *
 * Concrete Factories:
 *  - SedanCarFactory
 *  - HatchbackCarFactory
 *
 */

/** STEP 1 */

class MastodonCar {
  useGPS() {
    throw new Error("Method not implemented");
  }
}

class RhinoCar {
  useGPS() {
    throw new Error("Method not implemented");
  }
}

/** STEP 2 */

class MastodonSedanCar extends MastodonCar {
  useGPS() {
    console.log("[SEDAN] Mastodon GPS");
  }
}

class MastodonHatchbackCar extends MastodonCar {
  useGPS() {
    console.log("[HATCHBACK] Mastodon GPS");
  }
}

class RhinoSedanCar extends RhinoCar {
  useGPS() {
    console.log("[SEDAN] Rhino GPS");
  }
}

class RhinoHatchbackCar extends RhinoCar {
  useGPS() {
    console.log("[HATCHBACK] Rhino GPS");
  }
}

/** STEP 3 */

class CarFactory {
    createMastodonCar() {
        throw new Error("Method not implemented");       
    }

    createRhinoCar() {
        throw new Error("Method not implemented");
    }
}

/** STEP 4 */

class SedanCarFactory extends CarFactory {
    createMastodonCar() {
        return new MastodonSedanCar();
    }

    createRhinoCar() {
        return new RhinoSedanCar();
    }
}

class HatchbackCarFactory extends CarFactory {
    createMastodonCar() {
        return new MastodonHatchbackCar();
    }

    createRhinoCar() {
        return new RhinoHatchbackCar();
    }
}

function appCarFactory(factory) {
	const mastodon = factory.createMastodonCar();
	const rhino = factory.createRhinoCar();

	mastodon.useGPS();
	rhino.useGPS();
}

// appCarFactory(new HatchbackCarFactory());
// appCarFactory(new SedanCarFactory());

function createFactory(type) {
	const factories = {
		sedan: SedanCarFactory,
		hatchback: HatchbackCarFactory, 
	}

	const factory = factories[type];
	return new factory();
}

appCarFactory(createFactory("sedan"));
appCarFactory(createFactory("hatchback"));