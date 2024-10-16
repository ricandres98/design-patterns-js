/*
* How to implement Singleton
*
* 1. Make the constructor private
* 2. Create a static method who calls the private
* constructor and save the instance in a static variable
*
*/

class Singleton {
    private static instance: Singleton;
    public version: string;

    private constructor(version: string) {
        this.version = version
    }

    static getInstance(version: string) {
        if(!Singleton.instance) {
            Singleton.instance = new Singleton(version);
        }

        return Singleton.instance;
    }
}

function appSingleton() {
    const singleton1 = Singleton.getInstance("Version-1");
    const singleton2 = Singleton.getInstance("Version-2");

    console.log(singleton1 === singleton2)
}

appSingleton();