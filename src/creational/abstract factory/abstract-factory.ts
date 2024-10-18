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
 * - MastodonHatchbackCar
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

interface MastodonCar {
  useGPS(): void;
}

interface RhinoCar {
  useGPS(): void;
}

/** STEP 2 */

class MastodonSedanCar implements MastodonCar {
  useGPS() {
    console.log("[SEDAN] Mastodon GPS");
  }
}

class MastodonHatchbackCar implements MastodonCar {
  useGPS() {
    console.log("[HATCHBACK] Mastodon GPS");
  }
}

class RhinoSedanCar implements RhinoCar {
  useGPS() {
    console.log("[SEDAN] Rhino GPS");
  }
}

class RhinoHatchbackCar implements RhinoCar {
  useGPS() {
    console.log("[HATCHBACK] Rhino GPS");
  }
}

/** STEP 3 */

interface CarAbstractFactory {
    createMastodonCar(): MastodonCar;
    createRhinoCar(): RhinoCar;
}

/** STEP 4 */

class SedanCarFactory implements CarAbstractFactory {
    createMastodonCar(): MastodonCar {
        return new MastodonSedanCar();
    }

    createRhinoCar(): RhinoCar {
        return new RhinoSedanCar();
    }
}

class HatchbackCarFactory implements CarAbstractFactory {
    createMastodonCar(): MastodonCar {
        return new MastodonHatchbackCar();
    }

    createRhinoCar(): RhinoCar {
        return new RhinoHatchbackCar();
    }
}

function appCarFactory(factory: CarAbstractFactory) {
	const mastodon: MastodonCar = factory.createMastodonCar();
	const rhino: RhinoCar = factory.createRhinoCar();

	mastodon.useGPS();
	rhino.useGPS();
}

// appCarFactory(new HatchbackCarFactory());
// appCarFactory(new SedanCarFactory());

type FactoryType = "sedan" | "hatchback";
function createFactory(type: FactoryType) {
	const factories = {
		sedan: SedanCarFactory,
		hatchback: HatchbackCarFactory, 
	}

	const factory = factories[type];
	return new factory();
}

appCarFactory(createFactory("sedan"));
appCarFactory(createFactory("hatchback"));

export {};