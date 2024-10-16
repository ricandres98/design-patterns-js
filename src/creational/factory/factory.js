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
class BaseCar {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }

  showCost() {
    throw new Error("Method not implemented");
  }
}

/** STEP 2 */
class MastodonCar extends BaseCar {
  constructor() {
    super("mastodon", 2024);
  }

  showCost() {
    console.log("Mastodon Car cost: 300,000 MXN");
  }
}

class RhinoCar extends BaseCar {
  constructor () {
    super("rhino", 2024);
  }

  showCost() {
    console.log("Rhino Car cost: 100,000 MXN");
  }
}

/** STEP 3 */
class CarFactory {
  makeCar() {
    throw new Error("Method not implemented");
  }
}

/** STEP 4 */
class MastodonCarFactory extends CarFactory {
  makeCar(name, year) {
    return new MastodonCar(name, year);
  }
}

class RhinoCarFactory extends CarFactory {
  makeCar(name, year) {
    return new RhinoCar(name, year);
  }
}

function appFactory(factory) {
  const car = factory.makeCar();
  car.showCost();
  console.log(car);
}

// appFactory(new MastodonCarFactory())
// appFactory(new RhinoCarFactory())

function createFactory(type) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory,
  };

  const Factory = factories[type];

  return new Factory();
}

appFactory(createFactory("mastodon"));
appFactory(createFactory("rhino"));
