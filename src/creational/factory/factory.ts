/*
 * How to implement Factory?
 *
 * 1. Declare base product class/interface, this will be
 * returned by factory class and its sub classes
 * 2. Implement concrete products sub classes that
 * inherits/implements the base product class/interface
 * 3. Declare factory class/interface that returns objects
 * objects that match the base product, not the concrete products
 * 4. Implement concrete factories sub classes that
 * inherits/implements the base factory class/interface. These
 * classes will return concrete products in their factory method.
 */

/** STEP 1 */
(() => {
  
  interface BaseCar {
  showCost(): void;
  name: string;
  year: number;
}

/** STEP 2 */
class MastodonCar implements BaseCar {
  name = "mastodon";
  year = 2024;

  showCost() {
    console.log("Mastodon Car cost: 300,000 MXN");
  }
}

class RhinoCar implements BaseCar {
    name = "rhino";
    year = 2023;

  showCost() {
    console.log("Rhino Car cost: 100,000 MXN");
  }
}

/** STEP 3 */
interface CarFactory {
  makeCar(): BaseCar;
}

/** STEP 4 */
class MastodonCarFactory implements CarFactory {
  makeCar() {
    return new MastodonCar();
  }
}

class RhinoCarFactory implements CarFactory {
  makeCar() {
    return new RhinoCar();
  }
}

function appFactory(factory: CarFactory) {
  const car = factory.makeCar();
  car.showCost();
  console.log(car);
}

appFactory(new MastodonCarFactory());
appFactory(new RhinoCarFactory());


type FactoryType = "mastodon" | "rhino";

function createFactory(type: FactoryType) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const Factory = factories[type];

  return new Factory();
}

appFactory(createFactory("mastodon"));
appFactory(createFactory("rhino"));
})();
