/**
 * Products:
 *  - CPU
 *      * setSeries(string): void
 *  - Memory
 *      * setCapacityInGB(number): void
 *  - Display
 *      * setResolution(): void
 *
 * Families:
 *  - Phone
 *  - Laptop
 *  - Tablet
 */

/** Product interfaces */

interface CPU {
  setSeries(series: string): void;
}

interface Memory {
  setCapacityInGB(capacity: number): void;
}

interface Display {
	setResolution(): void;
}

/** Concrete product classes */

class CPUPhone implements CPU {
	setSeries(series: string): void {
		console.log("PHONE CPU series:" + series);	
	}
}

class CPULaptop implements CPU {
	setSeries(series: string): void {
		console.log("LAPTOP CPU series:" + series);	
	}
}

class CPUTablet implements CPU {
	setSeries(series: string): void {
		console.log("TABLET CPU series: " + series);	
	}
}

class MemoryPhone implements Memory {
	setCapacityInGB(capacity: number): void {
		console.log("PHONE MEMORY capacity: " + capacity + "GB");
	}
}

class MemoryLaptop implements Memory {
	setCapacityInGB(capacity: number): void {
		console.log("LAPTOP MEMORY capacity: " + capacity + "GB");
	}
}

class MemoryTablet implements Memory {
	setCapacityInGB(capacity: number): void {
		console.log("TABLET MEMORY capacity: " + capacity + "GB");
	}
}

class DisplayPhone implements Display {
	setResolution(): void {
		console.log("PHONE DISPLAY resolution has been set");
	}
}

class DisplayLaptop implements Display {
	setResolution(): void {
		console.log("LAPTOP DISPLAY resolution has been set");
	}
}

class DisplayTablet implements Display {
	setResolution(): void {
		console.log("TABLET DISPLAY resolution has been set");
	}
}

/** Abstract factory */

interface AbstractPiecesFactory {
	makeCPU(): CPU;
	makeMemory(): Memory;
	makeDisplay(): Display;
}

/** Concrete factories */

class PhonePiecesFactory implements AbstractPiecesFactory {
	makeCPU(): CPU {
		return new CPUPhone();
	}
	makeMemory(): Memory {
		return new MemoryPhone();
	}
	makeDisplay(): Display {
		return new DisplayPhone();
	}
}

class LaptopPiecesFactory implements AbstractPiecesFactory {
	makeCPU(): CPU {
		return new CPULaptop();
	}
	makeMemory(): Memory {
		return new MemoryLaptop();
	}
	makeDisplay(): Display {
		return new DisplayLaptop();
	}
}

class TabletPiecesFactory implements AbstractPiecesFactory {
	makeCPU(): CPU {
		return new CPUTablet();
	}
	makeMemory(): Memory {
		return new MemoryTablet();
	}
	makeDisplay(): Display {
		return new DisplayTablet();
	}
}

function appPiecesFactory(factory: AbstractPiecesFactory) {
	const cpu = factory.makeCPU();
	const memory = factory.makeMemory();
	const display = factory.makeDisplay();

	cpu.setSeries("i5");
	memory.setCapacityInGB(8);
	display.setResolution();
}

appPiecesFactory(new PhonePiecesFactory());
appPiecesFactory(new LaptopPiecesFactory());
appPiecesFactory(new TabletPiecesFactory());